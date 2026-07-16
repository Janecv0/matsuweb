import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { cmsTables } from "@/lib/content/cms-schema";
import { CmsSection } from "@/components/admin/cms-section";

export const dynamic = "force-dynamic";

// Display order of the editable sections.
const SECTION_ORDER = [
  "cms_site",
  "cms_exam_levels",
  "cms_exam_items",
  "cms_pricing",
  "cms_documents",
  "cms_member_announcements",
  "cms_trainers"
];

export default async function AdminContentPage() {
  const service = createSupabaseServiceClient();

  if (!service) {
    return (
      <div className="surface p-6">
        <h1 className="text-3xl">Content</h1>
        <p className="mt-2 text-sm text-muted">
          Supabase is not configured, so editable content cannot be loaded. Set the Supabase
          environment variables and apply the migrations.
        </p>
      </div>
    );
  }

  const sections = await Promise.all(
    SECTION_ORDER.map(async (table) => {
      const schema = cmsTables[table];
      let query = service.from(table).select("*");
      if (schema.singleton) {
        query = query.eq("id", 1);
      } else if (table === "cms_exam_items") {
        query = query.order("level_key", { ascending: true }).order("order_index", { ascending: true });
      } else if (schema.orderable) {
        query = query.order("order_index", { ascending: true });
      }
      const { data } = await query;
      return { table, rows: (data ?? []) as Record<string, unknown>[] };
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Content</h1>
        <p className="mt-1 text-sm text-muted">
          Edit the announcement bar, exam requirements, and the other editable sections. Evergreen
          page copy stays static in the codebase (<code>lib/content/site-content.ts</code>).
        </p>
      </div>

      {sections.map(({ table, rows }) => (
        <CmsSection key={table} schema={cmsTables[table]} rows={rows} />
      ))}
    </div>
  );
}
