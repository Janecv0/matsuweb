import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MatsuLogoProps {
  href: string;
  variant?: "light" | "dark";
  /** Hide the wordmark on the smallest screens (used in the header to save space). */
  compact?: boolean;
  className?: string;
}

/** The pine-roundel logo + wordmark used in the header (light) and footer (dark). */
export function MatsuLogo({ href, variant = "light", compact = false, className }: MatsuLogoProps) {
  return (
    <Link
      href={href}
      aria-label="Karate Klub Matsu"
      className={cn("focus-ring inline-flex min-w-0 items-center gap-3 rounded-xl", className)}
    >
      <Image
        src="/images/logo.jpg"
        alt="Karate Klub Matsu"
        width={44}
        height={44}
        priority
        className="h-[44px] w-[44px] shrink-0 rounded-full object-cover"
      />
      <span
        className={cn(
          "truncate font-display text-lg font-bold",
          compact ? "hidden sm:inline" : "",
          variant === "dark" ? "text-paper" : "text-ink"
        )}
      >
        Karate Klub Matsu
      </span>
    </Link>
  );
}
