import { getFallbackContent } from "@/lib/data/fallback-content";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { cache } from "react";
import {
  EventItem,
  Locale,
  PageContent,
  PageKey,
  PublicContentBundle,
  SiteSetting
} from "@/lib/types";

function byOrderIndex<T extends { order_index?: number }>(a: T, b: T) {
  return (a.order_index ?? 0) - (b.order_index ?? 0);
}

function byDate(a: EventItem, b: EventItem) {
  return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
}

function getSettingValue(settings: SiteSetting[], key: string) {
  return settings.find((item) => item.setting_key === key)?.setting_value ?? "";
}

async function getPublicContentUncached(locale: Locale): Promise<PublicContentBundle> {
  const fallback = getFallbackContent(locale);
  const client = createSupabaseServiceClient();

  if (!client) {
    return fallback;
  }

  try {
    const [
      announcements,
      navigation,
      heroSlides,
      valueCards,
      coaches,
      testimonials,
      locations,
      events,
      pageContent,
      faqs,
      pricing,
      schedule,
      glossary,
      documents,
      footerLinks,
      socialLinks,
      settings
    ] = await Promise.all([
      client.from("announcements").select("*").eq("locale", locale),
      client.from("navigation_items").select("*").eq("locale", locale),
      client.from("hero_slides").select("*").eq("locale", locale),
      client.from("value_cards").select("*").eq("locale", locale),
      client.from("coaches").select("*").eq("locale", locale),
      client.from("testimonials").select("*").eq("locale", locale),
      client.from("locations").select("*").eq("locale", locale),
      client.from("events").select("*").eq("locale", locale),
      client.from("pages").select("*").eq("locale", locale),
      client.from("faq_items").select("*").eq("locale", locale),
      client.from("pricing_items").select("*").eq("locale", locale),
      client.from("schedule_entries").select("*").eq("locale", locale),
      client.from("glossary_terms").select("*").eq("locale", locale),
      client.from("documents").select("*").eq("locale", locale),
      client.from("footer_links").select("*").eq("locale", locale),
      client.from("social_links").select("*"),
      client.from("site_settings").select("*").or(`locale.eq.${locale},locale.is.null`)
    ]);

    if (
      announcements.error ||
      navigation.error ||
      heroSlides.error ||
      valueCards.error ||
      coaches.error ||
      testimonials.error ||
      locations.error ||
      events.error ||
      pageContent.error ||
      faqs.error ||
      pricing.error ||
      schedule.error ||
      glossary.error ||
      documents.error ||
      footerLinks.error ||
      socialLinks.error ||
      settings.error
    ) {
      return fallback;
    }

    const bundle: PublicContentBundle = {
      announcements: (announcements.data as PublicContentBundle["announcements"])?.length
        ? (announcements.data as PublicContentBundle["announcements"])
        : fallback.announcements,
      navigation: (navigation.data as PublicContentBundle["navigation"])?.length
        ? (navigation.data as PublicContentBundle["navigation"]).sort(byOrderIndex)
        : fallback.navigation,
      heroSlides: (heroSlides.data as PublicContentBundle["heroSlides"])?.length
        ? (heroSlides.data as PublicContentBundle["heroSlides"]).sort(byOrderIndex)
        : fallback.heroSlides,
      valueCards: (valueCards.data as PublicContentBundle["valueCards"])?.length
        ? (valueCards.data as PublicContentBundle["valueCards"]).sort(byOrderIndex)
        : fallback.valueCards,
      coaches: (coaches.data as PublicContentBundle["coaches"])?.length
        ? (coaches.data as PublicContentBundle["coaches"]).sort(byOrderIndex)
        : fallback.coaches,
      testimonials: (testimonials.data as PublicContentBundle["testimonials"])?.length
        ? (testimonials.data as PublicContentBundle["testimonials"]).sort(byOrderIndex)
        : fallback.testimonials,
      locations: (locations.data as PublicContentBundle["locations"])?.length
        ? (locations.data as PublicContentBundle["locations"])
        : fallback.locations,
      events: (events.data as PublicContentBundle["events"])?.length
        ? (events.data as PublicContentBundle["events"]).sort(byDate)
        : fallback.events,
      pageContent: (pageContent.data as PublicContentBundle["pageContent"])?.length
        ? (pageContent.data as PublicContentBundle["pageContent"])
        : fallback.pageContent,
      faqs: (faqs.data as PublicContentBundle["faqs"])?.length
        ? (faqs.data as PublicContentBundle["faqs"]).sort(byOrderIndex)
        : fallback.faqs,
      pricing: (pricing.data as PublicContentBundle["pricing"])?.length
        ? (pricing.data as PublicContentBundle["pricing"]).sort(byOrderIndex)
        : fallback.pricing,
      schedule: (schedule.data as PublicContentBundle["schedule"])?.length
        ? (schedule.data as PublicContentBundle["schedule"]).sort(byOrderIndex)
        : fallback.schedule,
      glossary: (glossary.data as PublicContentBundle["glossary"])?.length
        ? (glossary.data as PublicContentBundle["glossary"]).sort(byOrderIndex)
        : fallback.glossary,
      documents: (documents.data as PublicContentBundle["documents"])?.length
        ? (documents.data as PublicContentBundle["documents"])
        : fallback.documents,
      footerLinks: (footerLinks.data as PublicContentBundle["footerLinks"])?.length
        ? (footerLinks.data as PublicContentBundle["footerLinks"]).sort(byOrderIndex)
        : fallback.footerLinks,
      socialLinks: (socialLinks.data as PublicContentBundle["socialLinks"])?.length
        ? (socialLinks.data as PublicContentBundle["socialLinks"]).sort(byOrderIndex)
        : fallback.socialLinks,
      settings: (settings.data as PublicContentBundle["settings"])?.length
        ? (settings.data as PublicContentBundle["settings"]).sort((a, b) => {
            const aPriority = a.locale === locale ? 0 : 1;
            const bPriority = b.locale === locale ? 0 : 1;
            return aPriority - bPriority;
          })
        : fallback.settings
    };

    return bundle;
  } catch {
    return fallback;
  }
}

export const getPublicContent = cache(getPublicContentUncached);

export function getPageContentByKey(
  content: PublicContentBundle,
  pageKey: PageKey
): PageContent | undefined {
  return content.pageContent.find((item) => item.page_key === pageKey);
}

export function getSetting(content: PublicContentBundle, key: string) {
  return getSettingValue(content.settings, key);
}
