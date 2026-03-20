import { Locale, PageKey } from "@/lib/types";

export const locales: Locale[] = ["cs", "en"];

export const localeLabels: Record<Locale, string> = {
  cs: "CZ",
  en: "EN"
};

const routeByKey: Record<PageKey, Record<Locale, string[]>> = {
  home: { cs: [], en: [] },
  about: { cs: ["o-nas"], en: ["about"] },
  "about-club": { cs: ["o-nas", "klub"], en: ["about", "club"] },
  "about-history": { cs: ["o-nas", "historie"], en: ["about", "history"] },
  "about-coaches": { cs: ["o-nas", "treneri"], en: ["about", "coaches"] },
  "start-here": { cs: ["chci-zacit"], en: ["start-here"] },
  students: { cs: ["pro-studenty"], en: ["for-students"] },
  "students-examination-rules": {
    cs: ["pro-studenty", "zkusebni-rad"],
    en: ["for-students", "examination-rules"]
  },
  "students-vocabulary": {
    cs: ["pro-studenty", "slovnicek"],
    en: ["for-students", "vocabulary"]
  },
  "students-etiquette": {
    cs: ["pro-studenty", "etiketa"],
    en: ["for-students", "etiquette"]
  },
  "students-ethics": {
    cs: ["pro-studenty", "etika"],
    en: ["for-students", "ethics"]
  },
  contact: { cs: ["kontakty"], en: ["contact"] }
};

export const defaultPageTitles: Record<PageKey, Record<Locale, string>> = {
  home: { cs: "Karate Klub Matsu", en: "Karate Klub Matsu" },
  about: { cs: "O nás", en: "About" },
  "about-club": { cs: "Klub", en: "Club" },
  "about-history": { cs: "Historie", en: "History" },
  "about-coaches": { cs: "Trenéři", en: "Coaches" },
  "start-here": { cs: "Chci začít", en: "Start Here" },
  students: { cs: "Pro studenty", en: "For Students" },
  "students-examination-rules": {
    cs: "Zkušební řád",
    en: "Examination Rules"
  },
  "students-vocabulary": { cs: "Slovníček", en: "Vocabulary" },
  "students-etiquette": { cs: "Etiketa", en: "Etiquette" },
  "students-ethics": { cs: "Etika", en: "Ethics" },
  contact: { cs: "Kontakty", en: "Contact" }
};

const keyByLocalizedPath = new Map<string, PageKey>();

for (const key of Object.keys(routeByKey) as PageKey[]) {
  for (const locale of locales) {
    keyByLocalizedPath.set(`${locale}:${routeByKey[key][locale].join("/")}`, key);
  }
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPathForPage(locale: Locale, key: PageKey) {
  const segments = routeByKey[key][locale];
  return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`;
}

export function resolvePageKey(locale: Locale, slug?: string[]) {
  const normalized = (slug ?? []).join("/");
  return keyByLocalizedPath.get(`${locale}:${normalized}`);
}

export function getLocalizedSlugs(locale: Locale, key: PageKey) {
  return routeByKey[key][locale];
}

export function getAllRouteParams() {
  const params: { locale: Locale; slug?: string[] }[] = [];
  const hiddenRouteKeys: PageKey[] = ["about-club", "about-history", "about-coaches"];

  for (const locale of locales) {
    for (const key of Object.keys(routeByKey) as PageKey[]) {
      if (hiddenRouteKeys.includes(key)) {
        continue;
      }
      const slugs = routeByKey[key][locale];
      params.push({
        locale,
        slug: slugs.length ? slugs : undefined
      });
    }
  }

  return params;
}

export function getSiblingLocalePath(
  currentLocale: Locale,
  targetLocale: Locale,
  slug?: string[]
) {
  const key = resolvePageKey(currentLocale, slug);
  if (!key) {
    return `/${targetLocale}`;
  }
  return getPathForPage(targetLocale, key);
}

export function getPageTitle(locale: Locale, pageKey: PageKey) {
  return defaultPageTitles[pageKey][locale];
}

export function getAboutSubpages() {
  return ["about"] as PageKey[];
}

export function getStudentSubpages() {
  return [
    "students",
    "students-examination-rules",
    "students-vocabulary",
    "students-etiquette",
    "students-ethics"
  ] as PageKey[];
}

export const uiDictionary = {
  cs: {
    recruitmentDefault: "Nábor otevřen",
    beginnerCta: "Začít s námi",
    studentsCta: "Pro studenty",
    upcomingEvents: "Nadcházející akce",
    testimonialsTitle: "Říkají o nás",
    coachesTitle: "Trenéři",
    locationsTitle: "Kde cvičíme",
    contactUs: "Napište nám",
    mobileMenu: "Menu",
    admin: "Administrace",
    breadcrumbsHome: "Domů",
    submit: "Odeslat",
    loading: "Načítání...",
    noEvents: "Brzy přidáme nové akce.",
    noContent: "Obsah se připravuje.",
    mapFallback: "Mapa bude doplněna.",
    glossarySearch: "Hledat výraz"
  },
  en: {
    recruitmentDefault: "Recruitment open",
    beginnerCta: "Start with us",
    studentsCta: "For students",
    upcomingEvents: "Upcoming Events",
    testimonialsTitle: "What members say",
    coachesTitle: "Coaches",
    locationsTitle: "Where we train",
    contactUs: "Contact us",
    mobileMenu: "Menu",
    admin: "Admin",
    breadcrumbsHome: "Home",
    submit: "Submit",
    loading: "Loading...",
    noEvents: "New events are coming soon.",
    noContent: "Content is being prepared.",
    mapFallback: "Map embed will be added.",
    glossarySearch: "Search term"
  }
} as const;

export type UiDictionary = typeof uiDictionary;
