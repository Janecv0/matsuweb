import Image from "next/image";
import Link from "next/link";

interface SiteLogoProps {
  href: string;
  logoUrl: string;
  altText: string;
}

export function SiteLogo({ href, logoUrl, altText }: SiteLogoProps) {
  return (
    <Link
      href={href}
      className="focus-ring inline-flex items-center gap-3 rounded-md px-1 py-1 transition hover:opacity-90"
      aria-label="Karate Klub Matsu"
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={altText || "Karate Klub Matsu"}
          width={42}
          height={42}
          className="h-11 w-11 rounded-sm object-contain"
          priority
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-ember/60 bg-ink text-xs font-bold uppercase tracking-[0.2em] text-paper">
          M
        </div>
      )}
      <span className="text-base font-semibold tracking-[0.1em] sm:text-lg">Karate Klub Matsu</span>
    </Link>
  );
}
