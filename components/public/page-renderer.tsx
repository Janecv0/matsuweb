import { BeginnerForm } from "@/components/forms/beginner-form";
import { ContactForm } from "@/components/forms/contact-form";
import { PhotoSlot } from "@/components/public/photo-slot";
import type { SiteContent } from "@/lib/content/site-content-types";
import { Locale, PageKey } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PageRendererProps {
  locale: Locale;
  pageKey: PageKey;
  content: SiteContent;
}

function PageHero({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-warm px-6 py-12 sm:px-12">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-bronze">{eyebrow}</p>
      <h1 className="font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-3.5 max-w-[620px] text-base leading-7 text-muted">{intro}</p> : null}
      {children}
    </div>
  );
}

export function PageRenderer({ locale, pageKey, content }: PageRendererProps) {
  if (pageKey === "about") {
    const { about } = content;
    return (
      <>
        <PageHero eyebrow={about.eyebrow} title={about.title} intro={about.intro} />

        <section id="club" className="grid items-center gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{about.club.title}</h2>
            <p className="mt-3.5 text-base leading-7 text-muted">{about.club.body}</p>
          </div>
          <PhotoSlot
            src="/images/generations.jpg"
            alt={about.club.title}
            className="h-[280px]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </section>

        <section id="history" className="bg-white px-6 py-14 sm:px-12">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink sm:text-3xl">{about.history.title}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.history.entries.map((entry) => (
              <div key={entry.year} className="border-l-[3px] border-ember pl-4">
                <div className="font-display text-xl font-bold text-ember">{entry.year}</div>
                <p className="mt-1.5 text-sm leading-6 text-muted">{entry.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="trainers" className="px-6 py-14 sm:px-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">{about.trainers.title}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.trainers.items.map((trainer) => (
              <article key={trainer.name} className="overflow-hidden rounded-3xl bg-white shadow-card">
                <PhotoSlot className="h-[200px]" rounded="rounded-none" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink">{trainer.name}</h3>
                  <p className="my-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ember">
                    {trainer.rank}
                  </p>
                  <p className="text-[13px] leading-6 text-muted">{trainer.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (pageKey === "start-here") {
    const { startHere } = content;
    return (
      <>
        <div className="grid items-center gap-8 bg-warm px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-bronze">
              {startHere.eyebrow}
            </p>
            <h1 className="font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl">
              {startHere.title}
            </h1>
            <p className="mt-3.5 max-w-[520px] text-base leading-7 text-muted">{startHere.intro}</p>
          </div>
          <PhotoSlot
            src="/images/coach-demo.jpg"
            alt={startHere.title}
            objectPosition="object-top"
            className="h-[220px] sm:h-[280px]"
            rounded="rounded-2xl"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <section className="px-6 py-14 sm:px-12">
          <h2 className="mb-7 font-display text-2xl font-bold text-ink">{startHere.steps.title}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {startHere.steps.items.map((step, index) => (
              <div key={step.title} className="rounded-[20px] bg-white p-6 shadow-card">
                <div className="font-display text-3xl font-bold text-ember">{index + 1}</div>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-14 sm:px-12">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">{startHere.pricing.title}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {startHere.pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-[20px] p-6",
                  tier.highlight ? "bg-sage text-white" : "bg-white text-ink shadow-card"
                )}
              >
                <div className="font-display text-lg font-bold">{tier.name}</div>
                <div
                  className={cn(
                    "mt-2 font-display text-3xl font-bold",
                    tier.highlight ? "text-white" : "text-ember"
                  )}
                >
                  {tier.price}
                  <span className={cn("text-[13px] font-normal", tier.highlight ? "text-white/80" : "text-muted")}>
                    {tier.unit}
                  </span>
                </div>
                <p className={cn("mt-1.5 text-[13px]", tier.highlight ? "text-white/85" : "text-muted")}>
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-14 sm:px-12">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">{startHere.faq.title}</h2>
          <div className="overflow-hidden rounded-2xl bg-[#e7d9c4]">
            {startHere.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-black/5 bg-white last:border-b-0">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-ink">
                  {item.q}
                </summary>
                <p className="px-5 pb-4 text-sm leading-7 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-12">
          <div className="rounded-[24px] bg-white p-6 shadow-card sm:p-8">
            <h2 className="mb-5 font-display text-2xl font-bold text-ink">{startHere.formTitle}</h2>
            <BeginnerForm locale={locale} />
          </div>
        </section>
      </>
    );
  }

  if (pageKey === "students") {
    const { students } = content;
    const tabAnchors = ["exam-rules", "glossary", "etiquette", "ethics"];
    return (
      <>
        <PageHero eyebrow={students.eyebrow} title={students.title}>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {students.tabs.map((tab, index) => (
              <a
                key={tab}
                href={`#${tabAnchors[index]}`}
                className={cn(
                  "focus-ring rounded-full px-4 py-2.5 text-[13px] font-bold",
                  index === 0 ? "bg-ink text-paper" : "bg-white text-ink"
                )}
              >
                {tab}
              </a>
            ))}
          </div>
        </PageHero>

        <section id="exam-rules" className="px-6 py-14 sm:px-12">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">{students.examRules.title}</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[560px] overflow-hidden rounded-2xl bg-[#e7d9c4]">
              <div className="grid grid-cols-[1fr,2fr,1fr] bg-ink px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.06em] text-paper">
                {students.examRules.columns.map((col) => (
                  <div key={col}>{col}</div>
                ))}
              </div>
              {students.examRules.rows.map((row) => (
                <div key={row.level} className="grid grid-cols-[1fr,2fr,1fr] bg-white px-5 py-3.5 text-sm">
                  <div className="font-bold text-ink">{row.level}</div>
                  <div className="text-muted">{row.requirements}</div>
                  <div className="text-muted">{row.practice}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="glossary" className="px-6 pb-14 sm:px-12">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">{students.glossary.title}</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[560px] overflow-hidden rounded-2xl bg-[#e7d9c4]">
              <div className="grid grid-cols-[1fr,1fr,2fr] bg-ink px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.06em] text-paper">
                {students.glossary.columns.map((col) => (
                  <div key={col}>{col}</div>
                ))}
              </div>
              {students.glossary.rows.map((row) => (
                <div key={row.term} className="grid grid-cols-[1fr,1fr,2fr] bg-white px-5 py-3.5 text-sm">
                  <div className="font-bold text-ink">{row.term}</div>
                  <div className="text-muted">{row.translation}</div>
                  <div className="text-muted">{row.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 px-6 pb-14 sm:px-12 lg:grid-cols-2">
          <div id="etiquette" className="rounded-[20px] bg-white p-6 shadow-card">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">{students.etiquette.title}</h2>
            <ul className="space-y-2 text-sm leading-7 text-muted">
              {students.etiquette.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div id="ethics" className="rounded-[20px] bg-ink p-6 text-paper">
            <h2 className="mb-3 font-display text-xl font-bold">{students.ethics.title}</h2>
            <ul className="space-y-2 text-sm leading-7 text-paper/80">
              {students.ethics.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-12">
          <h2 className="mb-4 font-display text-xl font-bold text-ink">{students.documents.title}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {students.documents.items.map((doc) => (
              <a
                key={doc.label}
                href={doc.href ?? "#"}
                className="focus-ring flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warm text-[11px] font-bold text-bronze">
                  PDF
                </span>
                <span className="text-[13px] font-bold text-ink">{doc.label}</span>
              </a>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (pageKey === "contact") {
    const { contact } = content;
    return (
      <>
        <PageHero eyebrow={contact.eyebrow} title={contact.title} />

        <section className="grid gap-9 px-6 py-14 sm:px-12 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="flex flex-col gap-4">
            {contact.cards.map((card) => (
              <div key={card.title} className="rounded-[20px] bg-white p-5 shadow-card">
                <h2 className="font-display text-lg font-bold text-ink">{card.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-muted">
                  {card.lines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              title={contact.title}
              loading="lazy"
              className="h-[340px] w-full rounded-3xl border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <PhotoSlot note={contact.mapLabel} className="h-[340px] min-h-[340px]" />
          )}
        </section>

        <section className="px-6 pb-16 sm:px-12">
          <div className="rounded-[24px] bg-white p-6 shadow-card sm:p-8">
            <ContactForm locale={locale} />
          </div>
        </section>
      </>
    );
  }

  return null;
}
