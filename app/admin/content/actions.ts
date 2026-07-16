"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedUser, isAdminUser } from "@/lib/content/admin-content";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { coerceCmsValue, getCmsSchema } from "@/lib/content/cms-schema";

async function requireAdmin() {
  const user = await getAuthenticatedUser();
  const allowed = await isAdminUser(user?.id, user?.email ?? undefined);
  if (!allowed) {
    redirect("/login?next=/admin/content");
  }
}

function refresh() {
  // Editable content appears in the header on every page — purge all routes so ISR pages
  // re-render with the new values on the next request.
  revalidatePath("/", "layout");
}

async function nextOrderIndex(table: string): Promise<number> {
  const service = createSupabaseServiceClient();
  if (!service) {
    return 0;
  }
  const { data } = await service
    .from(table)
    .select("order_index")
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();
  return ((data?.order_index as number | undefined) ?? 0) + 1;
}

export async function cmsSave(formData: FormData) {
  await requireAdmin();

  const table = String(formData.get("table") ?? "");
  const schema = getCmsSchema(table);
  if (!schema) {
    return;
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return;
  }

  const id = String(formData.get("id") ?? "").trim();
  const payload: Record<string, string | number | boolean> = {};
  for (const field of schema.fields) {
    payload[field.name] = coerceCmsValue(field, formData.get(field.name));
  }

  if (schema.singleton) {
    await service.from(table).upsert({ id: 1, ...payload });
  } else if (id) {
    await service.from(table).update(payload).eq("id", id);
  } else {
    if (schema.orderable) {
      payload.order_index = await nextOrderIndex(table);
    }
    await service.from(table).insert(payload);
  }

  refresh();
}

export async function cmsDelete(formData: FormData) {
  await requireAdmin();

  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const schema = getCmsSchema(table);
  if (!schema || schema.singleton || !id) {
    return;
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return;
  }

  await service.from(table).delete().eq("id", id);
  refresh();
}

export async function cmsReorder(formData: FormData) {
  await requireAdmin();

  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const direction = String(formData.get("direction") ?? "");
  const schema = getCmsSchema(table);
  if (!schema || !schema.orderable || !id || (direction !== "up" && direction !== "down")) {
    return;
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return;
  }

  const { data } = await service
    .from(table)
    .select("id, order_index")
    .order("order_index", { ascending: true });

  const rows = (data as { id: string; order_index: number }[] | null) ?? [];
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) {
    return;
  }
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= rows.length) {
    return;
  }

  const a = rows[index];
  const b = rows[swapWith];
  await Promise.all([
    service.from(table).update({ order_index: b.order_index }).eq("id", a.id),
    service.from(table).update({ order_index: a.order_index }).eq("id", b.id)
  ]);

  refresh();
}
