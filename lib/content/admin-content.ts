import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { Locale, PublicContentBundle } from "@/lib/types";

export async function getAuthenticatedUser() {
  const client = await createSupabaseServerClient();
  const {
    data: { user }
  } = await client.auth.getUser();

  return user;
}

export async function isAdminUser(userId: string | undefined, email: string | undefined) {
  if (!userId) {
    return false;
  }

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (email && allowlist.includes(email.toLowerCase())) {
    return true;
  }

  const service = createSupabaseServiceClient();
  if (!service) {
    return false;
  }

  const { data, error } = await service
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return !error && Boolean(data);
}

export async function getAdminContent(locale: Locale): Promise<Partial<PublicContentBundle>> {
  const service = createSupabaseServiceClient();

  if (!service) {
    return {};
  }

  const [
    announcements,
    navigation,
    heroSlides,
    valueCards,
    coaches,
    testimonials,
    locations,
    events,
    pages,
    faqs,
    pricing,
    schedule,
    glossary,
    documents,
    footerLinks,
    socialLinks,
    settings
  ] = await Promise.all([
    service.from("announcements").select("*").eq("locale", locale),
    service.from("navigation_items").select("*").eq("locale", locale),
    service.from("hero_slides").select("*").eq("locale", locale),
    service.from("value_cards").select("*").eq("locale", locale),
    service.from("coaches").select("*").eq("locale", locale),
    service.from("testimonials").select("*").eq("locale", locale),
    service.from("locations").select("*").eq("locale", locale),
    service.from("events").select("*").eq("locale", locale),
    service.from("pages").select("*").eq("locale", locale),
    service.from("faq_items").select("*").eq("locale", locale),
    service.from("pricing_items").select("*").eq("locale", locale),
    service.from("schedule_entries").select("*").eq("locale", locale),
    service.from("glossary_terms").select("*").eq("locale", locale),
    service.from("documents").select("*").eq("locale", locale),
    service.from("footer_links").select("*").eq("locale", locale),
    service.from("social_links").select("*"),
    service.from("site_settings").select("*").or(`locale.eq.${locale},locale.is.null`)
  ]);

  return {
    announcements: announcements.data ?? [],
    navigation: navigation.data ?? [],
    heroSlides: heroSlides.data ?? [],
    valueCards: valueCards.data ?? [],
    coaches: coaches.data ?? [],
    testimonials: testimonials.data ?? [],
    locations: locations.data ?? [],
    events: events.data ?? [],
    pageContent: pages.data ?? [],
    faqs: faqs.data ?? [],
    pricing: pricing.data ?? [],
    schedule: schedule.data ?? [],
    glossary: glossary.data ?? [],
    documents: documents.data ?? [],
    footerLinks: footerLinks.data ?? [],
    socialLinks: socialLinks.data ?? [],
    settings: settings.data ?? []
  };
}

export async function getFormSubmissions(limit = 200) {
  const service = createSupabaseServiceClient();

  if (!service) {
    return [];
  }

  const { data } = await service
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
