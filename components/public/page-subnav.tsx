import Link from "next/link";
import { getPathForPage } from "@/lib/i18n";
import { Locale, PageKey } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PageSubnavProps {
  locale: Locale;
  current: PageKey;
  items: { key: PageKey; label: string }[];
}

export function PageSubnav({ locale, current, items }: PageSubnavProps) {
  return (
    <aside className="surface h-fit p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
        {locale === "cs" ? "Sekce" : "Sections"}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={getPathForPage(locale, item.key)}
              className={cn(
                "focus-ring block rounded-md px-3 py-2 text-sm transition",
                current === item.key ? "bg-ink text-paper" : "text-ink hover:bg-black/5"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
