import { getFormSubmissions } from "@/lib/content/admin-content";

export default async function AdminSubmissionsPage() {
  const submissions = await getFormSubmissions(300);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Form Submissions</h1>
      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/10 text-sm">
            <thead className="bg-black/[0.03] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Locale</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-white/75">
              {submissions.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{item.form_type}</td>
                  <td className="px-4 py-3">{item.locale}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3 max-w-sm whitespace-pre-wrap text-xs text-muted">{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
