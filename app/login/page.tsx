import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login | Karate Klub Matsu"
};

export default function LoginPage() {
  return (
    <main className="section-shell flex min-h-screen items-center py-16">
      <Suspense
        fallback={
          <div className="surface mx-auto w-full max-w-md space-y-3 p-7">
            <h1 className="text-3xl">Admin Login</h1>
            <p className="text-sm text-muted">Loading form…</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
