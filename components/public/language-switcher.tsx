import Link from "next/link";
import { getSiblingLocalePath, localeLabels } from "@/lib/i18n";
import { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  slug?: string[];
}

export function LanguageSwitcher({ currentLocale, slug }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/15 bg-white p-1 text-xs font-semibold uppercase">
      {(Object.keys(localeLabels) as Locale[]).map((locale) => {
        const active = locale === currentLocale;
        const href = getSiblingLocalePath(currentLocale, locale, slug);

        return (
          <Link
            key={locale}
            href={href}
            className={cn(
              "focus-ring rounded-full px-2.5 py-1 transition",
              active ? "bg-ink text-paper" : "text-muted hover:bg-black/5"
            )}
            hrefLang={locale}
            locale={false}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
