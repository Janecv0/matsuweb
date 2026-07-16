import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageRenderer } from "@/components/public/page-renderer";
import { PublicShell } from "@/components/public/public-shell";
import { getEditableContent } from "@/lib/content/editable";
import {
  getAllRouteParams,
  getPageTitle,
  getPathForPage,
  isLocale,
  resolvePageKey
} from "@/lib/i18n";

interface DynamicPageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

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

  return {
    title: `${getPageTitle(locale, pageKey)} | Karate Klub Matsu`
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

  // Legacy deep pages now live as anchored sections on the About / Students pages.
  const anchorRedirects: Partial<Record<string, { parent: "about" | "students"; anchor: string }>> = {
    "about-club": { parent: "about", anchor: "club" },
    "about-history": { parent: "about", anchor: "history" },
    "about-coaches": { parent: "about", anchor: "trainers" },
    "students-examination-rules": { parent: "students", anchor: "exam-rules" },
    "students-vocabulary": { parent: "students", anchor: "glossary" },
    "students-etiquette": { parent: "students", anchor: "etiquette" },
    "students-ethics": { parent: "students", anchor: "ethics" }
  };

  const target = anchorRedirects[pageKey];
  if (target) {
    redirect(`${getPathForPage(locale, target.parent)}#${target.anchor}`);
  }

  const content = await getEditableContent(locale);

  return (
    <PublicShell locale={locale} slug={slug}>
      <PageRenderer locale={locale} pageKey={pageKey} content={content} />
    </PublicShell>
  );
}
