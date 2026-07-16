import type { Locale, PageKey } from "@/lib/types";
import { getPathForPage } from "@/lib/i18n";
import { getSiteContent } from "@/lib/content/site-content";

export interface NavLink {
  key: PageKey;
  label: string;
  href: string;
}

/** Primary navigation links, in order, for the given locale. */
export function getNavLinks(locale: Locale): NavLink[] {
  const nav = getSiteContent(locale).nav;
  const entries: Array<[PageKey, string]> = [
    ["home", nav.home],
    ["about", nav.about],
    ["start-here", nav.start],
    ["students", nav.students],
    ["contact", nav.contact]
  ];

  return entries.map(([key, label]) => ({
    key,
    label,
    href: getPathForPage(locale, key)
  }));
}
