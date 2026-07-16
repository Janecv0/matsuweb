import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";

/**
 * The admin top bar (Overview / Content / Submissions / Members + sign out).
 * Used by the admin layout and shown on the members area for admins.
 */
export function AdminNav() {
  return (
    <header className="border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Karate Klub Matsu</p>
          <h1 className="text-xl">Admin</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
          <Link href="/admin" className="focus-ring rounded-md px-2.5 py-1.5 text-sm hover:bg-black/5">
            Overview
          </Link>
          <Link href="/admin/content" className="focus-ring rounded-md px-2.5 py-1.5 text-sm hover:bg-black/5">
            Content
          </Link>
          <Link href="/admin/submissions" className="focus-ring rounded-md px-2.5 py-1.5 text-sm hover:bg-black/5">
            Submissions
          </Link>
          <Link href="/members" className="focus-ring rounded-md px-2.5 py-1.5 text-sm hover:bg-black/5">
            Members
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="focus-ring rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-paper"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
