import { Locale } from "@/lib/types";

interface SubpageHeaderProps {
  locale: Locale;
  title: string;
  subtitle?: string | null;
  intro?: string | null;
}

export function SubpageHeader({ locale, title, subtitle, intro }: SubpageHeaderProps) {
  return (
    <section className="section-shell mt-12" lang={locale}>
      <div className="surface bg-paper-grain p-8 sm:p-10">
        {subtitle ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">{subtitle}</p>
        ) : null}
        <h1 className="mt-2 text-4xl sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg">{intro}</p> : null}
      </div>
    </section>
  );
}
