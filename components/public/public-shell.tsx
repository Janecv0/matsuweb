import { getSetting } from "@/lib/content/public-content";
import { Locale, PublicContentBundle } from "@/lib/types";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

interface PublicShellProps {
  locale: Locale;
  slug?: string[];
  content: PublicContentBundle;
  children: React.ReactNode;
}

export function PublicShell({ locale, slug, content, children }: PublicShellProps) {
  const logoUrl = getSetting(content, "logo_url");
  const logoAlt = getSetting(content, "logo_alt") || "Karate Klub Matsu";
  const contactText = getSetting(content, "footer_contact");

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader
        locale={locale}
        slug={slug}
        navigation={content.navigation}
        announcements={content.announcements}
        logoUrl={logoUrl}
        logoAlt={logoAlt}
      />
      <main>{children}</main>
      <SiteFooter
        locale={locale}
        logoUrl={logoUrl}
        logoAlt={logoAlt}
        contactText={contactText}
        links={content.footerLinks}
        socialLinks={content.socialLinks}
      />
    </div>
  );
}
