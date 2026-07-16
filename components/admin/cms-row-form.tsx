"use client";

import { useRef } from "react";
import { cmsSave } from "@/app/admin/content/actions";
import type { CmsTableSchema } from "@/lib/content/cms-schema";
import { cn } from "@/lib/utils";

interface CmsRowFormProps {
  schema: CmsTableSchema;
  record?: Record<string, unknown> | null;
  submitLabel: string;
  /** Clear the form after a successful create (used by the "add new" form). */
  resetOnSubmit?: boolean;
}

export function CmsRowForm({ schema, record, submitLabel, resetOnSubmit }: CmsRowFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const id = record?.id ? String(record.id) : "";

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await cmsSave(formData);
        if (resetOnSubmit) {
          formRef.current?.reset();
        }
      }}
      className="grid gap-3 sm:grid-cols-2"
    >
      <input type="hidden" name="table" value={schema.table} />
      <input type="hidden" name="id" value={id} />

      {schema.fields.map((field) => {
        const value = record?.[field.name];
        const labelEl = (
          <span className="mb-1 block text-xs font-semibold text-muted">{field.label}</span>
        );

        if (field.type === "bool") {
          return (
            <label
              key={field.name}
              className="flex items-center gap-2 self-end rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name={field.name}
                value="true"
                defaultChecked={Boolean(value)}
                className="h-4 w-4"
              />
              <span className="font-semibold">{field.label}</span>
            </label>
          );
        }

        return (
          <label key={field.name} className={cn("block text-sm", field.full && "sm:col-span-2")}>
            {labelEl}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                defaultValue={value != null ? String(value) : ""}
                rows={2}
                className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                defaultValue={value != null ? String(value) : field.options?.[0]?.value ?? ""}
                className="focus-ring w-full rounded-lg border border-black/15 bg-white px-3 py-2"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                name={field.name}
                defaultValue={value != null ? String(value) : ""}
                className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
              />
            )}
          </label>
        );
      })}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="focus-ring rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
