import { uiDictionary } from "@/lib/i18n";
import { Locale, LocationItem } from "@/lib/types";

interface LocationSectionProps {
  locale: Locale;
  locations: LocationItem[];
}

export function LocationSection({ locale, locations }: LocationSectionProps) {
  const primary = locations.find((location) => location.is_primary) ?? locations[0];

  return (
    <section className="section-shell mt-20">
      <h2 className="mb-7 text-3xl sm:text-4xl">{uiDictionary[locale].locationsTitle}</h2>
      <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
        <div className="surface space-y-4 p-6">
          {locations.map((location) => (
            <article key={location.id} className="rounded-xl border border-black/10 bg-white/70 p-4">
              <h3 className="text-xl">{location.name}</h3>
              <p className="mt-1 text-sm text-muted">{location.address}</p>
              <p className="text-sm text-muted">{location.city}</p>
              {location.notes ? <p className="mt-2 text-sm text-muted">{location.notes}</p> : null}
            </article>
          ))}
        </div>

        <div className="surface overflow-hidden">
          {primary?.map_embed_url ? (
            <iframe
              src={primary.map_embed_url}
              title={primary.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0"
            />
          ) : (
            <div className="flex min-h-[360px] items-center justify-center p-6 text-sm text-muted">
              {uiDictionary[locale].mapFallback}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
