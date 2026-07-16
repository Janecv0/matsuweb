import { redirect } from "next/navigation";
import { getAuthenticatedUser, isAdminUser } from "@/lib/content/admin-content";
import { AdminNav } from "@/components/admin/admin-nav";

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
      <AdminNav />
      <main className="section-shell py-8">{children}</main>
    </div>
  );
}
