import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login | Karate Klub Matsu"
};

export default function LoginPage() {
  return (
    <main className="section-shell flex min-h-screen items-center py-16">
      <LoginForm />
    </main>
  );
}
