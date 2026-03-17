import type { Metadata } from "next";
import { Noto_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"]
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"]
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
    <html lang="cs" suppressHydrationWarning>
      <body className={`${notoSerif.variable} ${sourceSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
