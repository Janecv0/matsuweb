import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageRenderer } from "@/components/public/page-renderer";
import { PublicShell } from "@/components/public/public-shell";
import { getPageContentByKey, getPublicContent } from "@/lib/content/public-content";
import { getAllRouteParams, getPathForPage, isLocale, resolvePageKey } from "@/lib/i18n";

interface DynamicPageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export const revalidate = 120;

export function generateStaticParams() {
  return getAllRouteParams()
    .filter((item) => item.slug && item.slug.length > 0)
    .map((item) => ({ locale: item.locale, slug: item.slug }));
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageKey = resolvePageKey(locale, slug);
  if (!pageKey) {
    return {};
  }

  const content = await getPublicContent(locale);
  const page = getPageContentByKey(content, pageKey);

  return {
    title: page?.seo_title ?? page?.title,
    description: page?.seo_description ?? page?.intro ?? undefined
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const pageKey = resolvePageKey(locale, slug);
  if (!pageKey || pageKey === "home") {
    notFound();
  }

  const aboutRedirectSection: Partial<Record<string, string>> = {
    "about-club": "club",
    "about-history": "history",
    "about-coaches": "trainers"
  };

  if (aboutRedirectSection[pageKey]) {
    redirect(`${getPathForPage(locale, "about")}#${aboutRedirectSection[pageKey]}`);
  }

  const content = await getPublicContent(locale);

  return (
    <PublicShell locale={locale} slug={slug} content={content}>
      <PageRenderer locale={locale} pageKey={pageKey} content={content} />
    </PublicShell>
  );
}
