import { Locale, PageKey } from "@/lib/types";
import { resolvePageKey } from "@/lib/i18n";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

interface PublicShellProps {
  locale: Locale;
  slug?: string[];
  children: React.ReactNode;
}

export function PublicShell({ locale, slug, children }: PublicShellProps) {
  const activeKey: PageKey = slug ? resolvePageKey(locale, slug) ?? "home" : "home";

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] bg-paper shadow-[0_0_60px_rgba(0,0,0,0.06)]">
      <SiteHeader locale={locale} slug={slug} activeKey={activeKey} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
