import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MatsuLogoProps {
  href: string;
  variant?: "light" | "dark";
  className?: string;
}

/** The pine-roundel logo + wordmark used in the header (light) and footer (dark). */
export function MatsuLogo({ href, variant = "light", className }: MatsuLogoProps) {
  return (
    <Link
      href={href}
      aria-label="Karate Klub Matsu"
      className={cn("focus-ring inline-flex items-center gap-3 rounded-xl", className)}
    >
      <Image
        src="/images/logo.jpg"
        alt="Karate Klub Matsu"
        width={44}
        height={44}
        priority
        className="h-[44px] w-[44px] rounded-full object-cover"
      />
      <span
        className={cn(
          "font-display text-lg font-bold",
          variant === "dark" ? "text-paper" : "text-ink"
        )}
      >
        Karate Klub Matsu
      </span>
    </Link>
  );
}
