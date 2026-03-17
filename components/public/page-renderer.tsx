import Link from "next/link";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { BeginnerForm } from "@/components/forms/beginner-form";
import { ContactForm } from "@/components/forms/contact-form";
import { GlossaryTable } from "@/components/public/glossary-table";
import { MarkdownBlock } from "@/components/public/markdown-block";
import { PageSubnav } from "@/components/public/page-subnav";
import { SubpageHeader } from "@/components/public/subpage-header";
import { getPageContentByKey } from "@/lib/content/public-content";
import { getPageTitle, getPathForPage, uiDictionary } from "@/lib/i18n";
import { dayOfWeekLabel } from "@/lib/utils";
import { Locale, PageKey, PublicContentBundle } from "@/lib/types";

interface PageRendererProps {
  locale: Locale;
  pageKey: PageKey;
  content: PublicContentBundle;
}

function aboutSubnav(locale: Locale) {
  return [
    { key: "about" as const, label: getPageTitle(locale, "about") },
    { key: "about-club" as const, label: getPageTitle(locale, "about-club") },
    { key: "about-history" as const, label: getPageTitle(locale, "about-history") },
    { key: "about-coaches" as const, label: getPageTitle(locale, "about-coaches") }
  ];
}

function studentsSubnav(locale: Locale) {
  return [
    { key: "students" as const, label: getPageTitle(locale, "students") },
    {
      key: "students-examination-rules" as const,
      label: getPageTitle(locale, "students-examination-rules")
    },
    { key: "students-vocabulary" as const, label: getPageTitle(locale, "students-vocabulary") },
    { key: "students-etiquette" as const, label: getPageTitle(locale, "students-etiquette") },
    { key: "students-ethics" as const, label: getPageTitle(locale, "students-ethics") }
  ];
}

export function PageRenderer({ locale, pageKey, content }: PageRendererProps) {
  const page = getPageContentByKey(content, pageKey);

  if (!page) {
    return (
      <section className="section-shell mt-12">
        <p>{uiDictionary[locale].noContent}</p>
      </section>
    );
  }

  const aboutNavigation = aboutSubnav(locale);
  const studentNavigation = studentsSubnav(locale);

  if (pageKey === "about") {
    return (
      <>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <div className="surface p-6">
            {page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutNavigation
                .filter((item) => item.key !== "about")
                .map((item) => (
                  <Link
                    key={item.key}
                    href={getPathForPage(locale, item.key)}
                    className="focus-ring rounded-lg border border-black/10 bg-white/75 px-4 py-3 text-sm font-semibold hover:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
          <PageSubnav locale={locale} current={pageKey} items={aboutNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "about-club" || pageKey === "about-history" || pageKey === "about-coaches") {
    return (
      <>
        <section className="section-shell mt-8">
          <Breadcrumbs locale={locale} pageKey={pageKey} />
        </section>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.3fr,0.9fr]">
          <div className="surface p-6">
            {page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}

            {pageKey === "about-coaches" ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {content.coaches.sort((a, b) => a.order_index - b.order_index).map((coach) => (
                  <article key={coach.id} className="rounded-xl border border-black/10 bg-white/70 p-4">
                    <h3 className="text-xl">{coach.name}</h3>
                    {coach.rank_title ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">{coach.rank_title}</p>
                    ) : null}
                    <p className="mt-2 text-sm leading-6 text-muted">{coach.long_bio ?? coach.short_bio}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
          <PageSubnav locale={locale} current={pageKey} items={aboutNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "start-here") {
    return (
      <>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <div className="surface p-6">{page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}</div>

            <div className="surface p-6">
              <h2 className="text-2xl">{locale === "cs" ? "Tréninkový rozvrh" : "Training Schedule"}</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-black/10 text-sm">
                  <thead className="bg-black/[0.03] text-left">
                    <tr>
                      <th className="px-3 py-2">{locale === "cs" ? "Den" : "Day"}</th>
                      <th className="px-3 py-2">{locale === "cs" ? "Čas" : "Time"}</th>
                      <th className="px-3 py-2">{locale === "cs" ? "Skupina" : "Group"}</th>
                      <th className="px-3 py-2">{locale === "cs" ? "Místo" : "Location"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 bg-white/75">
                    {content.schedule
                      .filter((item) => item.page_key === "start-here")
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-2">{dayOfWeekLabel(item.day_of_week, locale)}</td>
                          <td className="px-3 py-2">{item.start_time} - {item.end_time}</td>
                          <td className="px-3 py-2">{item.group_name}</td>
                          <td className="px-3 py-2">{item.location_name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="surface p-6">
              <h2 className="text-2xl">{locale === "cs" ? "Ceník" : "Pricing"}</h2>
              <div className="mt-4 grid gap-3">
                {content.pricing
                  .filter((item) => item.page_key === "start-here")
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((item) => (
                    <article key={item.id} className="rounded-lg border border-black/10 bg-white/70 p-4">
                      <p className="text-sm text-muted">{item.label}</p>
                      <p className="text-xl font-semibold">{item.price_text}</p>
                      {item.notes ? <p className="mt-1 text-sm text-muted">{item.notes}</p> : null}
                    </article>
                  ))}
              </div>
            </div>

            <div className="surface p-6">
              <h2 className="text-2xl">FAQ</h2>
              <div className="mt-4 space-y-4">
                {content.faqs
                  .filter((item) => item.page_key === "start-here")
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((item) => (
                    <article key={item.id}>
                      <h3 className="font-semibold">{item.question}</h3>
                      <p className="mt-1 text-sm text-muted">{item.answer}</p>
                    </article>
                  ))}
              </div>
            </div>
          </div>

          <BeginnerForm locale={locale} />
        </section>
      </>
    );
  }

  if (pageKey === "students") {
    return (
      <>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <div className="surface p-6">
            {page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}
            <div className="mt-8 grid gap-3">
              {studentNavigation
                .filter((item) => item.key !== "students")
                .map((item) => (
                  <Link
                    key={item.key}
                    href={getPathForPage(locale, item.key)}
                    className="focus-ring rounded-lg border border-black/10 bg-white/75 px-4 py-3 font-semibold hover:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
          <PageSubnav locale={locale} current={pageKey} items={studentNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "students-examination-rules") {
    return (
      <>
        <section className="section-shell mt-8">
          <Breadcrumbs locale={locale} pageKey={pageKey} />
        </section>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.25fr,0.95fr]">
          <div className="surface p-6">
            {page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}

            <div className="mt-8">
              <h2 className="text-2xl">{locale === "cs" ? "Dokumenty" : "Documents"}</h2>
              <div className="mt-3 space-y-2">
                {content.documents
                  .filter((item) => item.page_key === "students-examination-rules")
                  .map((item) => (
                    <a
                      key={item.id}
                      href={item.file_url}
                      className="focus-ring block rounded-lg border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold hover:bg-white"
                    >
                      {item.title}
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <PageSubnav locale={locale} current={pageKey} items={studentNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "students-vocabulary") {
    return (
      <>
        <section className="section-shell mt-8">
          <Breadcrumbs locale={locale} pageKey={pageKey} />
        </section>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.25fr,0.95fr]">
          <div className="surface p-6">
            <GlossaryTable
              locale={locale}
              terms={content.glossary
                .filter((item) => item.page_key === "students-vocabulary")
                .sort((a, b) => a.order_index - b.order_index)}
            />
          </div>
          <PageSubnav locale={locale} current={pageKey} items={studentNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "students-etiquette" || pageKey === "students-ethics") {
    return (
      <>
        <section className="section-shell mt-8">
          <Breadcrumbs locale={locale} pageKey={pageKey} />
        </section>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[1.25fr,0.95fr]">
          <div className="surface p-6">{page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}</div>
          <PageSubnav locale={locale} current={pageKey} items={studentNavigation} />
        </section>
      </>
    );
  }

  if (pageKey === "contact") {
    const primaryLocation = content.locations.find((location) => location.is_primary) ?? content.locations[0];

    return (
      <>
        <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
        <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-6">
            <div className="surface p-6">
              <h2 className="text-2xl">{locale === "cs" ? "Kontakt" : "Contact"}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{page.body_markdown}</p>
            </div>
            <div className="surface p-6">
              <h2 className="text-2xl">{locale === "cs" ? "Tréninková místa" : "Training locations"}</h2>
              <div className="mt-3 space-y-3">
                {content.locations.map((location) => (
                  <article key={location.id} className="rounded-lg border border-black/10 bg-white/70 p-4">
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted">{location.address}</p>
                    <p className="text-sm text-muted">{location.city}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="surface overflow-hidden">
              {primaryLocation?.map_embed_url ? (
                <iframe
                  src={primaryLocation.map_embed_url}
                  title={primaryLocation.name}
                  loading="lazy"
                  className="h-[280px] w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="p-4 text-sm text-muted">{uiDictionary[locale].mapFallback}</div>
              )}
            </div>
          </div>

          <ContactForm locale={locale} />
        </section>
      </>
    );
  }

  return (
    <section className="section-shell mt-10">
      <SubpageHeader locale={locale} title={page.title} subtitle={page.subtitle} intro={page.intro} />
      <div className="surface mt-6 p-6">{page.body_markdown ? <MarkdownBlock content={page.body_markdown} /> : null}</div>
    </section>
  );
}
