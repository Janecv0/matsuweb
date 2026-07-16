import { cn } from "@/lib/utils";

interface PhotoSlotProps {
  /** Optional caption describing the intended photo (renders as a small note chip). */
  note?: string;
  className?: string;
  rounded?: string;
}

/**
 * Placeholder for a photo the club will supply later. Renders the diagonal
 * "stripe" texture from the design with an optional note chip.
 */
export function PhotoSlot({ note, className, rounded = "rounded-3xl" }: PhotoSlotProps) {
  return (
    <div className={cn("stripe relative overflow-hidden bg-warm/40", rounded, className)}>
      {note ? (
        <span className="absolute bottom-4 left-4 rounded-lg bg-white px-2 py-1 font-mono text-[11px] text-ink/60">
          {note}
        </span>
      ) : null}
    </div>
  );
}
