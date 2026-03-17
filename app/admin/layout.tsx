import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/admin/actions";
import { getAuthenticatedUser, isAdminUser } from "@/lib/content/admin-content";

export const metadata = {
  title: "Admin | Karate Klub Matsu"
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  const allowed = await isAdminUser(user.id, user.email);
  if (!allowed) {
    redirect("/login?next=/admin");
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Karate Klub Matsu</p>
            <h1 className="text-xl">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="focus-ring rounded-md px-3 py-1.5 text-sm hover:bg-black/5">
              Overview
            </Link>
            <Link href="/admin/content" className="focus-ring rounded-md px-3 py-1.5 text-sm hover:bg-black/5">
              Content
            </Link>
            <Link href="/admin/submissions" className="focus-ring rounded-md px-3 py-1.5 text-sm hover:bg-black/5">
              Submissions
            </Link>
            <Link href="/admin/media" className="focus-ring rounded-md px-3 py-1.5 text-sm hover:bg-black/5">
              Media
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="focus-ring rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-paper">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="section-shell py-8">{children}</main>
    </div>
  );
}
