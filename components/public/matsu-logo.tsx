import Link from "next/link";
import { cn } from "@/lib/utils";

interface MatsuLogoProps {
  href: string;
  variant?: "light" | "dark";
  className?: string;
}

/** The 松 badge + wordmark used in the header (light) and footer (dark). */
export function MatsuLogo({ href, variant = "light", className }: MatsuLogoProps) {
  return (
    <Link
      href={href}
      aria-label="Karate Klub Matsu"
      className={cn("focus-ring inline-flex items-center gap-3 rounded-xl", className)}
    >
      <span className="flex h-[42px] w-[42px] items-center justify-center rounded-2xl bg-ember font-display text-lg font-bold text-white">
        松
      </span>
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
