import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/public-shell";
import { PhotoSlot } from "@/components/public/photo-slot";
import { getSiteContent } from "@/lib/content/site-content";
import { isLocale, getPathForPage, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const c = getSiteContent(locale);

  return {
    title: "Karate Klub Matsu",
    description: c.hero.subtitle,
    alternates: {
      canonical: `/${locale}`,
      languages: { cs: "/cs", en: "/en" }
    }
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const c = getSiteContent(locale);

  // Photo for each value card, keyed by the stable card key from site-content.
  const cardImages: Record<string, string> = {
    smysl: "/images/mind-meditation.jpg",
    tradice: "/images/kata-sunset.jpg",
    sebeobrana: "/images/selfdefense-sunset.jpg",
    praxe: "/images/coach-demo.jpg",
    my: "/images/generations.jpg"
  };

  return (
    <PublicShell locale={locale}>
      {/* Hero */}
      <section className="grid items-center gap-9 px-6 pb-14 pt-10 sm:px-12 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-warm px-3.5 py-2 text-xs font-semibold text-bronze">
            {c.hero.badge}
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            {c.hero.title}
          </h1>
          <p className="mt-5 max-w-[460px] text-[17px] leading-7 text-muted">{c.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link
              href={getPathForPage(locale, c.hero.primaryCta.target)}
              className="focus-ring rounded-full bg-ember px-7 py-3.5 text-sm font-bold text-white transition hover:bg-ember/90"
            >
              {c.hero.primaryCta.label}
            </Link>
            <Link
              href={getPathForPage(locale, c.hero.secondaryCta.target)}
              className="focus-ring rounded-full border border-ember/40 px-7 py-3.5 text-sm font-bold text-ember transition hover:bg-ember/5"
            >
              {c.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <PhotoSlot
          src="/images/hero-coach-kid.png"
          alt={c.hero.title}
          objectPosition="object-top"
          priority
          className="h-[320px] sm:h-[440px]"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </section>

      {/* Value cards */}
      <section className="px-6 pb-16 sm:px-12">
        <h2 className="text-center font-display text-3xl font-bold text-ink">{c.values.title}</h2>
        <p className="mt-2 text-center text-[15px] text-muted">{c.values.subtitle}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.values.cards.map((card) => {
            const Wrapper = card.cta ? Link : "div";
            const wrapperProps = card.cta
              ? { href: getPathForPage(locale, "start-here") }
              : {};
            return (
              <Wrapper
                key={card.key}
                {...(wrapperProps as { href: string })}
                className={cn(
                  "block overflow-hidden rounded-3xl shadow-card",
                  card.cta ? "bg-sage text-white" : "bg-white"
                )}
              >
                <div
                  className={cn(
                    "relative h-40 overflow-hidden",
                    card.cta ? "bg-white/10" : "stripe bg-warm/40"
                  )}
                >
                  {!card.cta && cardImages[card.key] ? (
                    <Image
                      src={cardImages[card.key]}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3
                    className={cn(
                      "font-display text-xl font-bold",
                      card.cta ? "text-white" : "text-ember"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-[13px] leading-6",
                      card.cta ? "text-white/85" : "text-muted"
                    )}
                  >
                    {card.text}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Family band */}
      <section className="mx-6 mb-10 grid items-center gap-9 rounded-[32px] bg-warm p-8 sm:mx-12 sm:p-10 lg:grid-cols-2">
        <PhotoSlot
          src="/images/hero-coach-kid.png"
          alt={c.familyBand.title}
          objectPosition="object-top"
          className="h-[260px] sm:h-[320px]"
          rounded="rounded-2xl"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
        <div>
          <h2 className="font-display text-2xl font-bold leading-[1.25] text-ink sm:text-3xl">
            {c.familyBand.title}
          </h2>
          <p className="mt-3.5 text-base leading-7 text-muted">{c.familyBand.body}</p>
          <Link
            href={getPathForPage(locale, "about")}
            className="focus-ring mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] font-bold text-paper transition hover:bg-ink/90"
          >
            {c.familyBand.ctaLabel}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-16 sm:px-12">
        <h2 className="mb-5 font-display text-2xl font-bold text-ink">{c.testimonials.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {c.testimonials.items.map((item) => (
            <figure key={item.author} className="rounded-3xl bg-white p-6 shadow-card">
              <blockquote className="font-display text-base leading-7 text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-3 text-[13px] font-semibold text-bronze">
                {item.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
