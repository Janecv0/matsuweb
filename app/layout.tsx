import type { Metadata } from "next";
import { Noto_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif"
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karate-klub-matsu.vercel.app"),
  title: "Karate Klub Matsu",
  description:
    "Bilingual website for Karate Klub Matsu. Traditional karate, modern teaching, strong community.",
  openGraph: {
    title: "Karate Klub Matsu",
    description:
      "Traditional karate in a respectful, community-focused club environment.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning className={`${notoSerif.variable} ${sourceSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
