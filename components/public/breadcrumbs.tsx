import Link from "next/link";
import { defaultPageTitles, getLocalizedSlugs, getPathForPage } from "@/lib/i18n";
import { Locale, PageKey } from "@/lib/types";

interface BreadcrumbsProps {
  locale: Locale;
  pageKey: PageKey;
}

export function Breadcrumbs({ locale, pageKey }: BreadcrumbsProps) {
  const segments = getLocalizedSlugs(locale, pageKey);
  const isNested = segments.length > 1;

  if (!isNested) {
    return null;
  }

  const crumbs: { label: string; href: string }[] = [
    {
      label: locale === "cs" ? "Domů" : "Home",
      href: `/${locale}`
    }
  ];

  if (pageKey.startsWith("about-")) {
    crumbs.push({
      label: defaultPageTitles.about[locale],
      href: getPathForPage(locale, "about")
    });
  }

  if (pageKey.startsWith("students-")) {
    crumbs.push({
      label: defaultPageTitles.students[locale],
      href: getPathForPage(locale, "students")
    });
  }

  crumbs.push({
    label: defaultPageTitles[pageKey][locale],
    href: getPathForPage(locale, pageKey)
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={item.href} className="inline-flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="focus-ring rounded-sm hover:text-ink">
                  {item.label}
                </Link>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
