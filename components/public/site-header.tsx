import Link from "next/link";
import { Locale, PageKey } from "@/lib/types";
import { getPathForPage } from "@/lib/i18n";
import { getEditableContent } from "@/lib/content/editable";
import { getNavLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/public/language-switcher";
import { MatsuLogo } from "@/components/public/matsu-logo";
import { MobileMenu } from "@/components/public/mobile-menu";

interface SiteHeaderProps {
  locale: Locale;
  slug?: string[];
  activeKey: PageKey;
}

export async function SiteHeader({ locale, slug, activeKey }: SiteHeaderProps) {
  const c = await getEditableContent(locale);
  const links = getNavLinks(locale);
  const startHref = getPathForPage(locale, "start-here");

  return (
    <header>
      {c.announcementVisible === false ? null : (
        <div className="bg-ember py-2.5 text-center text-xs font-semibold tracking-wide text-white">
          {c.announcement}
        </div>
      )}

      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] bg-paper/90 px-6 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <MatsuLogo href={`/${locale}`} />

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = item.key === activeKey;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-full px-4 py-2.5 text-sm font-semibold transition",
                  active ? "bg-warm text-ink" : "text-ink hover:bg-warm/60"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher currentLocale={locale} slug={slug} />
          <Link
            href="/members"
            className="focus-ring hidden rounded-full border-[1.5px] border-sage px-4 py-2.5 text-sm font-bold text-sage transition hover:bg-sage hover:text-white sm:inline-flex"
          >
            {c.nav.members}
          </Link>
          <Link
            href={startHref}
            className="focus-ring hidden rounded-full bg-sage px-5 py-3 text-sm font-bold text-white transition hover:bg-sage/90 sm:inline-flex"
          >
            {c.nav.enrollCta}
          </Link>
          <MobileMenu
            links={links}
            membersLabel={c.nav.members}
            membersHref="/members"
            ctaLabel={c.nav.enrollCta}
            ctaHref={startHref}
            menuLabel="Menu"
          />
        </div>
      </div>
    </header>
  );
}
