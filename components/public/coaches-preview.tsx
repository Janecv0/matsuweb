import Image from "next/image";
import Link from "next/link";
import { Coach, Locale } from "@/lib/types";
import { getPathForPage } from "@/lib/i18n";

interface CoachesPreviewProps {
  locale: Locale;
  coaches: Coach[];
  title: string;
}

export function CoachesPreview({ locale, coaches, title }: CoachesPreviewProps) {
  const sorted = coaches.slice().sort((a, b) => a.order_index - b.order_index).slice(0, 3);

  return (
    <section className="section-shell mt-20">
      <div className="mb-7 flex items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <Link
          href={`${getPathForPage(locale, "about")}#trainers`}
          className="focus-ring text-sm font-semibold uppercase tracking-[0.14em] text-ember"
        >
          {locale === "cs" ? "Všichni trenéři" : "All coaches"}
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {sorted.map((coach) => (
          <article key={coach.id} className="surface overflow-hidden">
            <div className="relative h-64">
              <Image src={coach.image_url} alt={coach.name} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-xl">{coach.name}</h3>
              {coach.rank_title ? (
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">{coach.rank_title}</p>
              ) : null}
              <p className="text-sm leading-6 text-muted">{coach.short_bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
