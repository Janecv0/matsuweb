"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOutAction(formData?: FormData) {
  const client = await createSupabaseServerClient();
  await client.auth.signOut();

  // Return to the home page (optionally the caller's locale), never back to login.
  // Default straight to a locale home to avoid a redirect-to-a-redirect through "/".
  const requested = formData?.get("redirectTo");
  const target =
    typeof requested === "string" && requested.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/cs";
  redirect(target);
}
