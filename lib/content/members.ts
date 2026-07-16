import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getChecklistItemRole as getStaticChecklistItemRole } from "@/lib/content/site-content";

/** "coach" is the teacher/instructor role (matches the existing user_roles check constraint). */
export type MemberRole = "member" | "coach" | "admin";

export interface MemberSession {
  user: User;
  role: MemberRole;
  displayName: string;
}

export interface MemberSummary {
  id: string;
  email: string;
  name: string;
}

export type ProgressMap = Record<string, boolean>;

export function displayNameFor(user: Pick<User, "email" | "user_metadata">): string {
  const meta = user.user_metadata ?? {};
  const fromMeta = (meta.full_name || meta.name || meta.display_name) as string | undefined;
  if (fromMeta) {
    return fromMeta;
  }
  const email = user.email ?? "";
  const localPart = email.split("@")[0] ?? "";
  return localPart ? localPart.charAt(0).toUpperCase() + localPart.slice(1) : "";
}

async function resolveRole(userId: string, email: string | undefined): Promise<MemberRole> {
  const adminAllowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (email && adminAllowlist.includes(email.toLowerCase())) {
    return "admin";
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return "member";
  }

  const { data } = await service
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .in("role", ["admin", "coach"]);

  const roles = (data ?? []).map((row) => row.role as string);
  if (roles.includes("admin")) {
    return "admin";
  }
  if (roles.includes("coach")) {
    return "coach";
  }
  return "member";
}

/** Returns the current authenticated member + resolved role, or null when signed out. */
export async function getMemberSession(): Promise<MemberSession | null> {
  // Without Supabase configured there can be no session — treat as signed out.
  if (!getSupabaseEnv().hasPublicEnv) {
    return null;
  }

  const client = await createSupabaseServerClient();
  const {
    data: { user }
  } = await client.auth.getUser();

  if (!user) {
    return null;
  }

  const role = await resolveRole(user.id, user.email ?? undefined);
  return { user, role, displayName: displayNameFor(user) };
}

export function isTeacher(role: MemberRole): boolean {
  return role === "coach" || role === "admin";
}

/**
 * Who may tick a checklist item — from the admin-editable `cms_exam_items` table when present,
 * otherwise the static default. Returns null for unknown items.
 */
export async function resolveChecklistItemRole(itemKey: string): Promise<"member" | "teacher" | null> {
  const service = createSupabaseServiceClient();
  if (service) {
    const { data } = await service
      .from("cms_exam_items")
      .select("checkable_by")
      .eq("item_key", itemKey)
      .maybeSingle();
    const value = data?.checkable_by as "member" | "teacher" | undefined;
    if (value) {
      return value;
    }
  }
  return getStaticChecklistItemRole(itemKey);
}

/** Checklist progress for a single member, keyed by item_key. */
export async function getProgressFor(userId: string): Promise<ProgressMap> {
  const service = createSupabaseServiceClient();
  if (!service) {
    return {};
  }

  const { data } = await service
    .from("member_progress")
    .select("item_key, checked")
    .eq("user_id", userId);

  const map: ProgressMap = {};
  for (const row of data ?? []) {
    map[row.item_key as string] = Boolean(row.checked);
  }
  return map;
}

/** Upsert a single checklist item's checked state. */
export async function setProgress(
  userId: string,
  itemKey: string,
  checked: boolean,
  actor: { id: string; role: MemberRole }
): Promise<boolean> {
  const service = createSupabaseServiceClient();
  if (!service) {
    return false;
  }

  const { error } = await service.from("member_progress").upsert(
    {
      user_id: userId,
      item_key: itemKey,
      checked,
      checked_by: actor.id,
      checked_by_role: actor.role,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,item_key" }
  );

  return !error;
}

/** List club members (for the coach's student picker). Requires the service role. */
export async function listMembers(): Promise<MemberSummary[]> {
  const service = createSupabaseServiceClient();
  if (!service) {
    return [];
  }

  const { data, error } = await service.auth.admin.listUsers();
  if (error || !data) {
    return [];
  }

  return data.users
    .map((user) => ({
      id: user.id,
      email: user.email ?? "",
      name: displayNameFor(user)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
