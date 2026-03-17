import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/admin/content" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Content Editing</h2>
        <p className="mt-2 text-sm text-muted">Update bilingual pages, homepage sections and navigation.</p>
      </Link>

      <Link href="/admin/submissions" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Form Submissions</h2>
        <p className="mt-2 text-sm text-muted">Read contact and beginner inquiry submissions.</p>
      </Link>

      <Link href="/admin/media" className="surface p-6 hover:bg-white">
        <h2 className="text-2xl">Media Uploads</h2>
        <p className="mt-2 text-sm text-muted">Upload images to Supabase Storage and reuse URLs in content.</p>
      </Link>
    </div>
  );
}
