import type { MetadataRoute } from "next";
import { getAllRouteParams } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karate-klub-matsu.vercel.app";

  return getAllRouteParams().map((params) => {
    const slug = params.slug?.join("/") ?? "";
    const path = slug ? `/${params.locale}/${slug}` : `/${params.locale}`;

    return {
      url: `${baseUrl}${path}`,
      changeFrequency: "weekly",
      priority: path === "/cs" || path === "/en" ? 1 : 0.7
    };
  });
}
