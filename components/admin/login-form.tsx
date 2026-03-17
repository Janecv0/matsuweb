"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="surface mx-auto w-full max-w-md space-y-4 p-7">
      <h1 className="text-3xl">Admin Login</h1>
      <p className="text-sm text-muted">Sign in with Supabase Auth credentials.</p>

      <label className="block space-y-1 text-sm">
        <span className="font-semibold">Email</span>
        <input
          type="email"
          name="email"
          required
          className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-semibold">Password</span>
        <input
          type="password"
          name="password"
          required
          className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="focus-ring rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
