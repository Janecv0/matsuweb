export type CmsFieldType = "text" | "textarea" | "bool" | "select" | "number";

export interface CmsFieldOption {
  value: string;
  label: string;
}

export interface CmsField {
  name: string;
  label: string;
  type: CmsFieldType;
  options?: CmsFieldOption[];
  /** Render across the full width of the two-column form grid. */
  full?: boolean;
}

export interface CmsTableSchema {
  table: string;
  title: string;
  description?: string;
  fields: CmsField[];
  /** Single-row config table (cms_site) — no add / delete. */
  singleton?: boolean;
  /** Has an order_index column (enables up/down reordering). */
  orderable?: boolean;
  /** Field shown as the row heading in the list view. */
  labelField?: string;
}

const CHECKABLE_BY: CmsFieldOption[] = [
  { value: "member", label: "Student ticks" },
  { value: "teacher", label: "Coach confirms" }
];

export const cmsTables: Record<string, CmsTableSchema> = {
  cms_site: {
    table: "cms_site",
    title: "Header & contact",
    description: "Announcement bar and contact details.",
    singleton: true,
    fields: [
      { name: "announcement_cs", label: "Announcement (CZ)", type: "text", full: true },
      { name: "announcement_en", label: "Announcement (EN)", type: "text", full: true },
      { name: "announcement_visible", label: "Show announcement bar", type: "bool" },
      { name: "contact_venue_cs", label: "Venue name (CZ)", type: "text" },
      { name: "contact_venue_en", label: "Venue name (EN)", type: "text" },
      { name: "contact_address_cs", label: "Address (CZ)", type: "text" },
      { name: "contact_address_en", label: "Address (EN)", type: "text" },
      { name: "contact_email", label: "Email", type: "text" },
      { name: "contact_phone", label: "Phone", type: "text" },
      { name: "contact_social_cs", label: "Socials line (CZ)", type: "text" },
      { name: "contact_social_en", label: "Socials line (EN)", type: "text" },
      { name: "contact_map_url", label: "Map embed URL", type: "text", full: true }
    ]
  },
  cms_exam_levels: {
    table: "cms_exam_levels",
    title: "Exam belt levels",
    description: "The belts students grade through.",
    orderable: true,
    labelField: "label_cs",
    fields: [
      { name: "level_key", label: "Key (e.g. 6kyu)", type: "text" },
      { name: "label_cs", label: "Label (CZ)", type: "text" },
      { name: "label_en", label: "Label (EN)", type: "text" }
    ]
  },
  cms_exam_items: {
    table: "cms_exam_items",
    title: "Exam requirements",
    description: "What each level must complete before the exam. Set who ticks each item off.",
    orderable: true,
    labelField: "label_cs",
    fields: [
      { name: "item_key", label: "Key (e.g. 6kyu.kata)", type: "text" },
      { name: "level_key", label: "Belt level key", type: "text" },
      { name: "label_cs", label: "Requirement (CZ)", type: "text", full: true },
      { name: "label_en", label: "Requirement (EN)", type: "text", full: true },
      { name: "checkable_by", label: "Checked by", type: "select", options: CHECKABLE_BY }
    ]
  },
  cms_member_announcements: {
    table: "cms_member_announcements",
    title: "Members announcements",
    description: "News feed shown in the members area.",
    orderable: true,
    labelField: "text_cs",
    fields: [
      { name: "text_cs", label: "Text (CZ)", type: "textarea", full: true },
      { name: "text_en", label: "Text (EN)", type: "textarea", full: true },
      {
        name: "tone",
        label: "Accent",
        type: "select",
        options: [
          { value: "ember", label: "Terracotta" },
          { value: "sage", label: "Sage" }
        ]
      },
      { name: "visible", label: "Visible", type: "bool" }
    ]
  },
  cms_documents: {
    table: "cms_documents",
    title: "Documents / PDFs",
    description: "Downloadable files on the Students page and in the members area.",
    orderable: true,
    labelField: "label_cs",
    fields: [
      {
        name: "scope",
        label: "Where",
        type: "select",
        options: [
          { value: "students", label: "Students page" },
          { value: "members", label: "Members area" }
        ]
      },
      { name: "label_cs", label: "Title (CZ)", type: "text" },
      { name: "label_en", label: "Title (EN)", type: "text" },
      { name: "url", label: "File URL", type: "text", full: true }
    ]
  },
  cms_pricing: {
    table: "cms_pricing",
    title: "Pricing tiers",
    description: "The Start Here price cards.",
    orderable: true,
    labelField: "name_cs",
    fields: [
      { name: "name_cs", label: "Name (CZ)", type: "text" },
      { name: "name_en", label: "Name (EN)", type: "text" },
      { name: "price", label: "Price", type: "text" },
      { name: "unit_cs", label: "Unit (CZ)", type: "text" },
      { name: "unit_en", label: "Unit (EN)", type: "text" },
      { name: "note_cs", label: "Note (CZ)", type: "text" },
      { name: "note_en", label: "Note (EN)", type: "text" },
      { name: "highlight", label: "Highlighted card", type: "bool" }
    ]
  },
  cms_trainers: {
    table: "cms_trainers",
    title: "Trainers",
    description: "The coach roster on the About page.",
    orderable: true,
    labelField: "name",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "rank_cs", label: "Rank (CZ)", type: "text" },
      { name: "rank_en", label: "Rank (EN)", type: "text" },
      { name: "bio_cs", label: "Bio (CZ)", type: "textarea", full: true },
      { name: "bio_en", label: "Bio (EN)", type: "textarea", full: true }
    ]
  }
};

export function getCmsSchema(table: string): CmsTableSchema | undefined {
  return cmsTables[table];
}

/** Coerce a submitted form value to the type declared in the schema. */
export function coerceCmsValue(field: CmsField, raw: FormDataEntryValue | null): string | number | boolean {
  const value = typeof raw === "string" ? raw : "";
  if (field.type === "bool") {
    return value === "true" || value === "on";
  }
  if (field.type === "number") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return value.trim();
}
