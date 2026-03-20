export type Locale = "cs" | "en";

export type PageKey =
  | "home"
  | "about"
  | "about-club"
  | "about-history"
  | "about-coaches"
  | "start-here"
  | "students"
  | "students-examination-rules"
  | "students-vocabulary"
  | "students-etiquette"
  | "students-ethics"
  | "contact";

export type StripType = "recruitment" | "info";

export type StripVariant = "info" | "warning" | "alert";

export interface Announcement {
  id: string;
  locale: Locale;
  strip_type: StripType;
  text: string;
  is_visible: boolean;
  variant: StripVariant;
  icon_name: string | null;
}

export interface NavigationItem {
  id: string;
  locale: Locale;
  label: string;
  href: string;
  order_index: number;
  is_cta: boolean;
}

export interface HeroSlide {
  id: string;
  locale: Locale;
  title: string;
  subtitle: string;
  image_url: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  order_index: number;
  is_active: boolean;
}

export interface ValueCard {
  id: string;
  locale: Locale;
  card_key: string;
  title: string;
  excerpt: string;
  hover_text: string | null;
  image_url: string;
  href: string | null;
  action_type: "link" | "modal";
  modal_title: string | null;
  modal_body: string | null;
  modal_image_url: string | null;
  modal_image_url_secondary: string | null;
  order_index: number;
}

export interface Coach {
  id: string;
  locale: Locale;
  slug: string;
  name: string;
  rank_title: string | null;
  short_bio: string;
  long_bio: string | null;
  image_url: string;
  order_index: number;
}

export interface Testimonial {
  id: string;
  locale: Locale;
  quote: string;
  author_name: string;
  author_role: string | null;
  order_index: number;
}

export interface LocationItem {
  id: string;
  locale: Locale;
  name: string;
  address: string;
  city: string;
  map_embed_url: string | null;
  notes: string | null;
  is_primary: boolean;
}

export interface EventItem {
  id: string;
  locale: Locale;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  summary: string | null;
  href: string | null;
  order_index: number;
}

export interface PageContent {
  id: string;
  locale: Locale;
  page_key: PageKey;
  title: string;
  subtitle: string | null;
  intro: string | null;
  body_markdown: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_member_only: boolean;
}

export interface FaqItem {
  id: string;
  locale: Locale;
  page_key: PageKey;
  question: string;
  answer: string;
  order_index: number;
}

export interface PricingItem {
  id: string;
  locale: Locale;
  page_key: PageKey;
  label: string;
  price_text: string;
  notes: string | null;
  order_index: number;
}

export interface ScheduleEntry {
  id: string;
  locale: Locale;
  page_key: PageKey;
  day_of_week: number;
  start_time: string;
  end_time: string;
  group_name: string;
  location_name: string;
  notes: string | null;
  order_index: number;
}

export interface GlossaryTerm {
  id: string;
  locale: Locale;
  page_key: PageKey;
  term: string;
  translation: string;
  description: string | null;
  category: string | null;
  order_index: number;
}

export interface DocumentItem {
  id: string;
  locale: Locale;
  page_key: PageKey;
  title: string;
  description: string | null;
  file_url: string;
}

export interface SiteSetting {
  id: string;
  locale: Locale | null;
  setting_key: string;
  setting_value: string;
}

export interface FooterLink {
  id: string;
  locale: Locale;
  label: string;
  href: string;
  order_index: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  order_index: number;
}

export interface FormSubmission {
  id: string;
  locale: Locale;
  form_type: "contact" | "beginner";
  name: string;
  email: string;
  phone: string | null;
  age_group: string | null;
  message: string;
  metadata: Record<string, string | number | boolean | null>;
  created_at: string;
}

export interface PublicContentBundle {
  announcements: Announcement[];
  navigation: NavigationItem[];
  heroSlides: HeroSlide[];
  valueCards: ValueCard[];
  coaches: Coach[];
  testimonials: Testimonial[];
  locations: LocationItem[];
  events: EventItem[];
  pageContent: PageContent[];
  faqs: FaqItem[];
  pricing: PricingItem[];
  schedule: ScheduleEntry[];
  glossary: GlossaryTerm[];
  documents: DocumentItem[];
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
  settings: SiteSetting[];
}
