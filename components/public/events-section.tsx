import Link from "next/link";
import { uiDictionary } from "@/lib/i18n";
import { EventItem, Locale } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

interface EventsSectionProps {
  locale: Locale;
  events: EventItem[];
  calendarEmbedUrl: string;
}

export function EventsSection({ locale, events, calendarEmbedUrl }: EventsSectionProps) {
  return (
    <section className="section-shell mt-20">
      <h2 className="mb-7 text-3xl sm:text-4xl">{uiDictionary[locale].upcomingEvents}</h2>

      {calendarEmbedUrl ? (
        <div className="surface overflow-hidden">
          <iframe
            src={calendarEmbedUrl}
            className="h-[540px] w-full border-0"
            loading="lazy"
            title="Google Calendar"
          />
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {events.length ? (
            events.map((event) => (
              <article key={event.id} className="surface space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                  {formatDateTime(event.starts_at, locale)}
                </p>
                <h3 className="text-2xl">{event.title}</h3>
                {event.location_name ? <p className="text-sm text-muted">{event.location_name}</p> : null}
                {event.summary ? <p className="text-sm leading-6 text-muted">{event.summary}</p> : null}
                {event.href ? (
                  <Link href={event.href} className="focus-ring text-sm font-semibold text-ember">
                    {locale === "cs" ? "Detail" : "Details"}
                  </Link>
                ) : null}
              </article>
            ))
          ) : (
            <p className="text-sm text-muted">{uiDictionary[locale].noEvents}</p>
          )}
        </div>
      )}
    </section>
  );
}
