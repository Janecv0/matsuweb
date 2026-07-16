import Link from "next/link";
import { Locale } from "@/lib/types";
import { getSiteContent } from "@/lib/content/site-content";
import { getNavLinks } from "@/lib/nav";
import { MatsuLogo } from "@/components/public/matsu-logo";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const c = getSiteContent(locale);
  const links = getNavLinks(locale).filter((item) => item.key !== "home");

  return (
    <footer className="mt-4 rounded-t-[22px] bg-ink px-6 py-12 text-paper sm:px-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-3">
          <MatsuLogo href={`/${locale}`} variant="dark" />
          <p className="max-w-sm text-sm leading-6 text-paper/70">{c.footer.tagline}</p>
        </div>

        <div>
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/50">
            {c.footer.navLabel}
          </h2>
          <ul className="space-y-2 text-sm text-paper/85">
            {links.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="focus-ring rounded-sm hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/50">
            {c.footer.socialLabel}
          </h2>
          <ul className="space-y-2 text-sm text-paper/85">
            {c.footer.socials.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring rounded-sm hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-4 text-xs text-paper/50">
        © {year} Karate Klub Matsu
      </div>
    </footer>
  );
}
