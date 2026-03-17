import Link from "next/link";
import { FooterLink, Locale, SocialLink } from "@/lib/types";
import { SiteLogo } from "@/components/public/site-logo";

interface SiteFooterProps {
  locale: Locale;
  logoUrl: string;
  logoAlt: string;
  contactText: string;
  links: FooterLink[];
  socialLinks: SocialLink[];
}

export function SiteFooter({
  locale,
  logoUrl,
  logoAlt,
  contactText,
  links,
  socialLinks
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  const navLabel = locale === "cs" ? "Navigace" : "Navigation";
  const socialLabel = locale === "cs" ? "Sítě" : "Social";

  return (
    <footer className="mt-20 border-t border-black/15 bg-ink text-paper">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.2fr,1fr,1fr]">
        <div className="space-y-4">
          <SiteLogo href={`/${locale}`} logoUrl={logoUrl} altText={logoAlt} />
          <p className="max-w-sm text-sm text-paper/75">{contactText}</p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-paper/70">{navLabel}</h2>
          <ul className="space-y-2 text-sm text-paper/85">
            {links.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="focus-ring rounded-sm hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-paper/70">{socialLabel}</h2>
          <ul className="space-y-2 text-sm text-paper/85">
            {socialLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.href} target="_blank" rel="noreferrer" className="focus-ring rounded-sm hover:text-white">
                  {item.platform}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-4">
        <div className="section-shell text-xs text-paper/70">© {year} Karate Klub Matsu</div>
      </div>
    </footer>
  );
}
