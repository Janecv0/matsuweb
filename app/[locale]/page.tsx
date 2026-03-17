import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoachesPreview } from "@/components/public/coaches-preview";
import { EventsSection } from "@/components/public/events-section";
import { HeroCarousel } from "@/components/public/hero-carousel";
import { LocationSection } from "@/components/public/location-section";
import { PublicShell } from "@/components/public/public-shell";
import { TestimonialsGrid } from "@/components/public/testimonials-grid";
import { ValueCardsGrid } from "@/components/public/value-cards-grid";
import { getPageContentByKey, getPublicContent, getSetting } from "@/lib/content/public-content";
import { isLocale, getPathForPage, uiDictionary } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 120;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getPublicContent(locale);
  const page = getPageContentByKey(content, "home");

  return {
    title: page?.seo_title ?? "Karate Klub Matsu",
    description: page?.seo_description ?? "Karate Klub Matsu",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        cs: "/cs",
        en: "/en"
      }
    }
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getPublicContent(locale);
  const home = getPageContentByKey(content, "home");
  const about = getPageContentByKey(content, "about");
  const calendarUrl = getSetting(content, "google_calendar_embed_url").trim();

  return (
    <PublicShell locale={locale} content={content}>
      <HeroCarousel slides={content.heroSlides} />
      <ValueCardsGrid cards={content.valueCards} />

      <section className="section-shell mt-20 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="surface p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">{about?.subtitle ?? "About"}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">{about?.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{about?.intro}</p>
          <Link
            href={getPathForPage(locale, "about")}
            className="focus-ring mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
          >
            {locale === "cs" ? "Více o klubu" : "More about the club"}
          </Link>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-black/10">
          <Image
            src={
              content.heroSlides[0]?.image_url ??
              "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=80"
            }
            alt={locale === "cs" ? "Trénink v dojo" : "Training in dojo"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </section>

      <CoachesPreview locale={locale} coaches={content.coaches} title={uiDictionary[locale].coachesTitle} />
      <TestimonialsGrid title={uiDictionary[locale].testimonialsTitle} testimonials={content.testimonials} />
      <LocationSection locale={locale} locations={content.locations} />
      <EventsSection locale={locale} events={content.events} calendarEmbedUrl={calendarUrl} />

      <section className="section-shell mt-20">
        <div className="surface bg-ink p-8 text-paper sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">{home?.subtitle}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            {locale === "cs"
              ? "Začněte trénovat s Karate Klubem Matsu"
              : "Start training with Karate Klub Matsu"}
          </h2>
          <p className="mt-4 max-w-3xl text-paper/80">{home?.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={getPathForPage(locale, "start-here")}
              className="focus-ring rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white"
            >
              {uiDictionary[locale].beginnerCta}
            </Link>
            <Link
              href={getPathForPage(locale, "contact")}
              className="focus-ring rounded-full border border-paper/30 px-5 py-2.5 text-sm font-semibold"
            >
              {uiDictionary[locale].contactUs}
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
