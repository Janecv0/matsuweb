import Link from "next/link";
import { Announcement, Locale, NavigationItem } from "@/lib/types";
import { uiDictionary } from "@/lib/i18n";
import { AnnouncementStrip } from "@/components/public/announcement-strip";
import { LanguageSwitcher } from "@/components/public/language-switcher";
import { MobileMenu } from "@/components/public/mobile-menu";
import { SiteLogo } from "@/components/public/site-logo";

interface SiteHeaderProps {
  locale: Locale;
  slug?: string[];
  navigation: NavigationItem[];
  announcements: Announcement[];
  logoUrl: string;
  logoAlt: string;
}

export function SiteHeader({
  locale,
  slug,
  navigation,
  announcements,
  logoUrl,
  logoAlt
}: SiteHeaderProps) {
  const mainItems = navigation.filter((item) => !item.is_cta).sort((a, b) => a.order_index - b.order_index);
  const cta = navigation.find((item) => item.is_cta);
  const recruitment = announcements.find((item) => item.strip_type === "recruitment");
  const infoStrip = announcements.find((item) => item.strip_type === "info");

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 backdrop-blur-md">
      {recruitment ? <AnnouncementStrip announcement={recruitment} /> : null}
      {infoStrip ? <AnnouncementStrip announcement={infoStrip} /> : null}

      <div className="section-shell relative flex min-h-16 items-center justify-between gap-4 py-3">
        <SiteLogo href={`/${locale}`} logoUrl={logoUrl} altText={logoAlt} />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {mainItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-ink/90 transition hover:bg-black/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher currentLocale={locale} slug={slug} />
          {cta ? (
            <Link
              href={cta.href}
              className="focus-ring rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:bg-ember/90"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher currentLocale={locale} slug={slug} />
          <MobileMenu items={navigation} menuLabel={uiDictionary[locale].mobileMenu} />
        </div>
      </div>
    </header>
  );
}
