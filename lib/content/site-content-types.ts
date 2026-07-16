import type { PageKey } from "@/lib/types";

export interface Cta {
  label: string;
  target: PageKey;
}

export interface ValueCard {
  key: string;
  title: string;
  /** Short line shown on the card by default. */
  text: string;
  /** Extra line revealed on hover (desktop). */
  hover: string;
  /** Longer copy shown in the modal on click — one entry per paragraph. */
  modalBody: string[];
  /** The final card is a sage-coloured call to action linking to Start Here. */
  cta?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface HistoryEntry {
  year: string;
  text: string;
}

export interface Trainer {
  name: string;
  rank: string;
  bio: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface PricingTier {
  name: string;
  price: string;
  unit: string;
  note: string;
  highlight?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ExamRuleRow {
  level: string;
  requirements: string;
  practice: string;
}

export interface GlossaryRow {
  term: string;
  translation: string;
  meaning: string;
}

export interface DocumentLink {
  label: string;
  href?: string;
}

export interface InfoCard {
  title: string;
  lines: string[];
}

export interface MemberAnnouncement {
  text: string;
  tone: "ember" | "sage";
}

/** A single checkpoint on the path to a belt exam. */
export interface ExamItem {
  key: string;
  label: string;
  /** Who is allowed to tick this item off. */
  checkableBy: "member" | "teacher";
}

export interface ExamLevel {
  key: string;
  label: string;
  items: ExamItem[];
}

export interface SiteContent {
  announcement: string;
  announcementVisible?: boolean;
  nav: {
    home: string;
    about: string;
    start: string;
    students: string;
    contact: string;
    members: string;
    enrollCta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    photoNote: string;
  };
  values: {
    title: string;
    subtitle: string;
    cards: ValueCard[];
  };
  familyBand: {
    title: string;
    body: string;
    ctaLabel: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    club: { title: string; body: string };
    history: { title: string; entries: HistoryEntry[] };
    trainers: { title: string; items: Trainer[] };
  };
  startHere: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; items: Step[] };
    pricing: { title: string; tiers: PricingTier[] };
    faq: { title: string; items: Faq[] };
    formTitle: string;
  };
  students: {
    eyebrow: string;
    title: string;
    tabs: string[];
    examRules: { title: string; columns: [string, string, string]; rows: ExamRuleRow[] };
    glossary: { title: string; columns: [string, string, string]; rows: GlossaryRow[] };
    etiquette: { title: string; items: string[] };
    ethics: { title: string; items: string[] };
    documents: { title: string; items: DocumentLink[] };
  };
  contact: {
    eyebrow: string;
    title: string;
    cards: InfoCard[];
    mapEmbedUrl: string;
    mapLabel: string;
  };
  members: {
    eyebrow: string;
    welcomePrefix: string;
    subtitle: string;
    signOut: string;
    loginPrompt: { title: string; body: string; cta: string };
    announcements: { title: string; items: MemberAnnouncement[] };
    quickRef: {
      examTitle: string;
      examLines: string[];
      glossaryTitle: string;
      glossaryLines: string[];
    };
    documents: { title: string; items: DocumentLink[] };
    checklist: {
      title: string;
      intro: string;
      memberBadge: string;
      teacherBadge: string;
      lockedHint: string;
      levels: ExamLevel[];
    };
    teacher: {
      panelTitle: string;
      pickMember: string;
      noMembers: string;
      viewingLabel: string;
    };
  };
  footer: {
    tagline: string;
    navLabel: string;
    socialLabel: string;
    socials: DocumentLink[];
  };
}
