import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function getAuthenticatedUser() {
  if (!getSupabaseEnv().hasPublicEnv) {
    return null;
  }

  const client = await createSupabaseServerClient();
  const {
    data: { user }
  } = await client.auth.getUser();

  return user;
}

export async function isAdminUser(userId: string | undefined, email: string | undefined) {
  if (!userId) {
    return false;
  }

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (email && allowlist.includes(email.toLowerCase())) {
    return true;
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return false;
  }

  const { data, error } = await service
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return !error && Boolean(data);
}

export async function getFormSubmissions(limit = 200) {
  const service = createSupabaseServiceClient();

  if (!service) {
    return [];
  }

  const { data } = await service
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
