"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { getAuthenticatedUser, isAdminUser } from "@/lib/content/admin-content";

const booleanFields = new Set([
  "is_visible",
  "is_active",
  "is_cta",
  "is_primary",
  "is_member_only"
]);

const numberFields = new Set(["order_index", "day_of_week"]);

function normalizeValue(key: string, value: FormDataEntryValue) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  if (booleanFields.has(key)) {
    return trimmed === "true" || trimmed === "on";
  }

  if (numberFields.has(key)) {
    if (!trimmed) {
      return 0;
    }
    return Number(trimmed);
  }

  if (!trimmed) {
    return null;
  }

  return trimmed;
}

async function requireAdmin() {
  const user = await getAuthenticatedUser();
  const allowed = await isAdminUser(user?.id, user?.email);

  if (!allowed) {
    redirect("/login?next=/admin");
  }

  return user;
}

export async function saveRecordAction(formData: FormData) {
  await requireAdmin();

  const service = createSupabaseServiceClient();
  if (!service) {
    return;
  }

  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const returnPath = String(formData.get("returnPath") ?? "/admin");

  if (!table) {
    return;
  }

  const payload: Record<string, string | number | boolean | null | FormDataEntryValue> = {};

  for (const [key, value] of formData.entries()) {
    if (key === "table" || key === "id" || key === "returnPath") {
      continue;
    }
    payload[key] = normalizeValue(key, value);
  }

  if (id) {
    await service.from(table).update(payload).eq("id", id);
  } else {
    await service.from(table).insert(payload);
  }

  revalidatePath(returnPath);
}

export async function deleteRecordAction(formData: FormData) {
  await requireAdmin();

  const service = createSupabaseServiceClient();
  if (!service) {
    return;
  }

  const table = String(formData.get("table") ?? "");
  const id = String(formData.get("id") ?? "");
  const returnPath = String(formData.get("returnPath") ?? "/admin");

  if (!table || !id) {
    return;
  }

  await service.from(table).delete().eq("id", id);

  revalidatePath(returnPath);
}

export async function signOutAction() {
  const client = await createSupabaseServerClient();
  await client.auth.signOut();
  redirect("/login");
}
