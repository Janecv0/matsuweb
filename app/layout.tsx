import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
