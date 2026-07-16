import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoSlotProps {
  /** When set, renders the real photo (cover-fit). Otherwise shows the placeholder texture. */
  src?: string;
  alt?: string;
  /** How to position the image within the frame (e.g. "object-top"). */
  objectPosition?: string;
  /** Optional caption describing the intended photo (placeholder mode only). */
  note?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * A framed image slot. With `src` it renders an optimized cover image; without one it
 * falls back to the diagonal "stripe" placeholder texture from the design.
 */
export function PhotoSlot({
  src,
  alt = "",
  objectPosition,
  note,
  className,
  rounded = "rounded-3xl",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority
}: PhotoSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded,
        src ? "bg-warm/40" : "stripe bg-warm/40",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", objectPosition)}
        />
      ) : note ? (
        <span className="absolute bottom-4 left-4 rounded-lg bg-white px-2 py-1 font-mono text-[11px] text-ink/60">
          {note}
        </span>
      ) : null}
    </div>
  );
}
