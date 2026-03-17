import { deleteRecordAction, saveRecordAction } from "@/app/admin/actions";

export type EditorField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "datetime-local" | "select" | "hidden";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

interface RecordEditorProps {
  title: string;
  table: string;
  returnPath: string;
  fields: EditorField[];
  record: Record<string, string | number | boolean | null | undefined>;
  compact?: boolean;
}

function valueToString(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return String(value);
}

export function RecordEditor({ title, table, returnPath, fields, record, compact = false }: RecordEditorProps) {
  const id = valueToString(record.id);

  return (
    <div className="surface p-4 sm:p-5">
      <h3 className="mb-4 text-lg">{title}</h3>
      <form action={saveRecordAction} className="space-y-3">
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="returnPath" value={returnPath} />

        {fields.map((field) => {
          const value = valueToString(record[field.name]);

          if (field.type === "hidden") {
            return <input key={field.name} type="hidden" name={field.name} defaultValue={value} />;
          }

          if (field.type === "textarea") {
            return (
              <label key={field.name} className="block text-sm">
                <span className="mb-1 block font-semibold">{field.label}</span>
                <textarea
                  name={field.name}
                  defaultValue={value}
                  required={field.required}
                  rows={compact ? 3 : 5}
                  placeholder={field.placeholder}
                  className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
                />
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <label key={field.name} className="block text-sm">
                <span className="mb-1 block font-semibold">{field.label}</span>
                <select
                  name={field.name}
                  defaultValue={value}
                  required={field.required}
                  className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          return (
            <label key={field.name} className="block text-sm">
              <span className="mb-1 block font-semibold">{field.label}</span>
              <input
                name={field.name}
                type={field.type ?? "text"}
                defaultValue={value}
                required={field.required}
                placeholder={field.placeholder}
                className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
              />
            </label>
          );
        })}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="submit"
            className="focus-ring rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-paper"
          >
            Save
          </button>
        </div>
      </form>

      {id ? (
        <form action={deleteRecordAction} className="mt-2">
          <input type="hidden" name="table" value={table} />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="returnPath" value={returnPath} />
          <button
            type="submit"
            className="focus-ring rounded-md border border-red-400 px-3 py-1.5 text-sm text-red-700"
          >
            Delete
          </button>
        </form>
      ) : null}
    </div>
  );
}
