import { cache } from "react";
import type { Locale } from "@/lib/types";
import type {
  SiteContent,
  Trainer,
  PricingTier,
  DocumentLink,
  MemberAnnouncement,
  ExamLevel,
  InfoCard
} from "@/lib/content/site-content-types";
import { getSiteContent } from "@/lib/content/site-content";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

interface SiteRow {
  announcement_cs: string;
  announcement_en: string;
  announcement_visible: boolean;
  contact_venue_cs: string;
  contact_venue_en: string;
  contact_address_cs: string;
  contact_address_en: string;
  contact_email: string;
  contact_phone: string;
  contact_social_cs: string;
  contact_social_en: string;
  contact_map_url: string;
}

interface LevelRow {
  level_key: string;
  label_cs: string;
  label_en: string;
  order_index: number;
}

interface ItemRow {
  item_key: string;
  level_key: string;
  label_cs: string;
  label_en: string;
  checkable_by: "member" | "teacher";
  order_index: number;
}

interface AnnouncementRow {
  text_cs: string;
  text_en: string;
  tone: "ember" | "sage";
  visible: boolean;
  order_index: number;
}

interface DocumentRow {
  scope: "students" | "members";
  label_cs: string;
  label_en: string;
  url: string;
  order_index: number;
}

interface PricingRow {
  name_cs: string;
  name_en: string;
  price: string;
  unit_cs: string;
  unit_en: string;
  note_cs: string;
  note_en: string;
  highlight: boolean;
  order_index: number;
}

interface TrainerRow {
  name: string;
  rank_cs: string;
  rank_en: string;
  bio_cs: string;
  bio_en: string;
  order_index: number;
}

interface CmsData {
  site: SiteRow | null;
  levels: LevelRow[];
  items: ItemRow[];
  announcements: AnnouncementRow[];
  documents: DocumentRow[];
  pricing: PricingRow[];
  trainers: TrainerRow[];
}

const byOrder = <T extends { order_index: number }>(a: T, b: T) => a.order_index - b.order_index;

async function fetchCmsData(): Promise<CmsData | null> {
  const service = createSupabaseServiceClient();
  if (!service) {
    return null;
  }

  const [site, levels, items, announcements, documents, pricing, trainers] = await Promise.all([
    service.from("cms_site").select("*").eq("id", 1).maybeSingle(),
    service.from("cms_exam_levels").select("*"),
    service.from("cms_exam_items").select("*"),
    service.from("cms_member_announcements").select("*"),
    service.from("cms_documents").select("*"),
    service.from("cms_pricing").select("*"),
    service.from("cms_trainers").select("*")
  ]);

  return {
    site: (site.data as SiteRow | null) ?? null,
    levels: (levels.data as LevelRow[] | null) ?? [],
    items: (items.data as ItemRow[] | null) ?? [],
    announcements: (announcements.data as AnnouncementRow[] | null) ?? [],
    documents: (documents.data as DocumentRow[] | null) ?? [],
    pricing: (pricing.data as PricingRow[] | null) ?? [],
    trainers: (trainers.data as TrainerRow[] | null) ?? []
  };
}

// Per-request dedupe so the header and the page share one fetch. Cross-request freshness comes
// from the admin actions calling revalidatePath after every write.
const getCmsData = cache(fetchCmsData);

/**
 * Returns the site content for a locale with admin-editable sections overridden by DB values.
 * Falls back to the static defaults per-section when Supabase is unconfigured or a table is empty.
 */
export async function getEditableContent(locale: Locale): Promise<SiteContent> {
  const base = getSiteContent(locale);
  let data: CmsData | null = null;
  try {
    data = await getCmsData();
  } catch {
    data = null;
  }

  if (!data) {
    return base;
  }

  const cs = locale === "cs";
  const site = data.site;

  const trainers: Trainer[] = [...data.trainers].sort(byOrder).map((row) => ({
    name: row.name,
    rank: cs ? row.rank_cs : row.rank_en,
    bio: cs ? row.bio_cs : row.bio_en
  }));

  const pricing: PricingTier[] = [...data.pricing].sort(byOrder).map((row) => ({
    name: cs ? row.name_cs : row.name_en,
    price: row.price,
    unit: cs ? row.unit_cs : row.unit_en,
    note: cs ? row.note_cs : row.note_en,
    highlight: row.highlight
  }));

  const docs = (scope: "students" | "members"): DocumentLink[] =>
    data!.documents
      .filter((row) => row.scope === scope)
      .sort(byOrder)
      .map((row) => ({ label: cs ? row.label_cs : row.label_en, href: row.url || undefined }));

  const memberAnnouncements: MemberAnnouncement[] = [...data.announcements]
    .filter((row) => row.visible)
    .sort(byOrder)
    .map((row) => ({ text: cs ? row.text_cs : row.text_en, tone: row.tone }));

  const checklistLevels: ExamLevel[] = [...data.levels].sort(byOrder).map((level) => ({
    key: level.level_key,
    label: cs ? level.label_cs : level.label_en,
    items: data!.items
      .filter((item) => item.level_key === level.level_key)
      .sort(byOrder)
      .map((item) => ({
        key: item.item_key,
        label: cs ? item.label_cs : item.label_en,
        checkableBy: item.checkable_by
      }))
  }));

  const contactCards: InfoCard[] = site
    ? [
        {
          title: cs ? site.contact_venue_cs : site.contact_venue_en,
          lines: [cs ? site.contact_address_cs : site.contact_address_en].filter(Boolean)
        },
        {
          title: base.contact.cards[1]?.title ?? "",
          lines: [site.contact_email, site.contact_phone].filter(Boolean)
        },
        {
          title: base.contact.cards[2]?.title ?? "",
          lines: [cs ? site.contact_social_cs : site.contact_social_en].filter(Boolean)
        }
      ]
    : base.contact.cards;

  return {
    ...base,
    announcement: site ? (cs ? site.announcement_cs : site.announcement_en) : base.announcement,
    announcementVisible: site ? site.announcement_visible : true,
    about: {
      ...base.about,
      trainers: trainers.length ? { ...base.about.trainers, items: trainers } : base.about.trainers
    },
    startHere: {
      ...base.startHere,
      pricing: pricing.length ? { ...base.startHere.pricing, tiers: pricing } : base.startHere.pricing
    },
    students: {
      ...base.students,
      documents: docs("students").length
        ? { ...base.students.documents, items: docs("students") }
        : base.students.documents
    },
    contact: {
      ...base.contact,
      cards: contactCards,
      mapEmbedUrl: site ? site.contact_map_url : base.contact.mapEmbedUrl
    },
    members: {
      ...base.members,
      announcements: memberAnnouncements.length
        ? { ...base.members.announcements, items: memberAnnouncements }
        : base.members.announcements,
      documents: docs("members").length
        ? { ...base.members.documents, items: docs("members") }
        : base.members.documents,
      checklist: checklistLevels.length
        ? { ...base.members.checklist, levels: checklistLevels }
        : base.members.checklist
    }
  };
}
