import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/admin/content" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Content</h2>
        <p className="mt-2 text-sm text-muted">
          Edit the announcement bar, exam requirements, pricing, documents, trainers, and members
          announcements.
        </p>
      </Link>

      <Link href="/admin/submissions" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Form Submissions</h2>
        <p className="mt-2 text-sm text-muted">Read contact and beginner inquiry submissions.</p>
      </Link>

      <Link href="/members" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Members Area</h2>
        <p className="mt-2 text-sm text-muted">Manage students&apos; exam readiness (coach view).</p>
      </Link>
    </div>
  );
}
