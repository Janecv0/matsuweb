import { cmsDelete, cmsReorder } from "@/app/admin/content/actions";
import { CmsRowForm } from "@/components/admin/cms-row-form";
import type { CmsTableSchema } from "@/lib/content/cms-schema";

interface CmsSectionProps {
  schema: CmsTableSchema;
  rows: Record<string, unknown>[];
}

function SectionHeader({ schema }: { schema: CmsTableSchema }) {
  return (
    <header>
      <h2 className="text-2xl">{schema.title}</h2>
      {schema.description ? <p className="mt-1 text-sm text-muted">{schema.description}</p> : null}
    </header>
  );
}

function ReorderButton({
  table,
  id,
  direction,
  disabled
}: {
  table: string;
  id: string;
  direction: "up" | "down";
  disabled: boolean;
}) {
  return (
    <form action={cmsReorder}>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        disabled={disabled}
        aria-label={direction === "up" ? "Move up" : "Move down"}
        className="focus-ring rounded-md border border-black/15 px-2 py-1 text-sm font-semibold disabled:opacity-30"
      >
        {direction === "up" ? "↑" : "↓"}
      </button>
    </form>
  );
}

export function CmsSection({ schema, rows }: CmsSectionProps) {
  if (schema.singleton) {
    return (
      <section className="surface p-6">
        <SectionHeader schema={schema} />
        <div className="mt-4">
          <CmsRowForm schema={schema} record={rows[0] ?? null} submitLabel="Save" />
        </div>
      </section>
    );
  }

  const labelField = schema.labelField ?? "id";

  return (
    <section className="surface p-6">
      <SectionHeader schema={schema} />

      <div className="mt-4 space-y-2">
        {rows.length === 0 ? <p className="text-sm text-muted">No entries yet.</p> : null}
        {rows.map((row, index) => {
          const id = String(row.id);
          return (
            <details key={id} className="rounded-xl border border-black/10 bg-white/70">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {String(row[labelField] ?? "—")}
              </summary>
              <div className="space-y-3 border-t border-black/10 p-4">
                <CmsRowForm schema={schema} record={row} submitLabel="Save changes" />
                <div className="flex items-center gap-2 border-t border-black/10 pt-3">
                  {schema.orderable ? (
                    <>
                      <ReorderButton table={schema.table} id={id} direction="up" disabled={index === 0} />
                      <ReorderButton
                        table={schema.table}
                        id={id}
                        direction="down"
                        disabled={index === rows.length - 1}
                      />
                    </>
                  ) : null}
                  <form action={cmsDelete} className="ml-auto">
                    <input type="hidden" name="table" value={schema.table} />
                    <input type="hidden" name="id" value={id} />
                    <button
                      type="submit"
                      className="focus-ring rounded-md border border-red-300 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <details className="mt-3 rounded-xl border border-dashed border-black/20">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ember">+ Add new</summary>
        <div className="border-t border-black/10 p-4">
          <CmsRowForm schema={schema} record={null} submitLabel="Add" resetOnSubmit />
        </div>
      </details>
    </section>
  );
}
