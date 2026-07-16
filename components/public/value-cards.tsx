"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { ValueCard } from "@/lib/content/site-content-types";
import { cn } from "@/lib/utils";

interface ValueCardsProps {
  cards: ValueCard[];
  images: Record<string, string>;
  startHref: string;
  labels: { close: string; more: string; startCta: string };
}

export function ValueCards({ cards, images, startHref, labels }: ValueCardsProps) {
  const [active, setActive] = useState<ValueCard | null>(null);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!active) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const activeImage = active ? images[active.key] : undefined;

  return (
    <>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const image = images[card.key];

          const className = cn(
            "group relative block h-[300px] w-full overflow-hidden rounded-3xl text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-ring",
            card.cta ? "bg-sage text-white" : "bg-white"
          );

          const body = card.cta ? (
            // CTA card: no photo — reveal the extra line on hover while keeping height.
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-white/85">{card.text}</p>
              <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-6 text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                {card.hover}
              </p>
              <span className="mt-3 inline-block text-[12px] font-bold uppercase tracking-wide text-white">
                {labels.startCta} →
              </span>
            </div>
          ) : (
            <>
              {/* Photo fills the top; the white panel slides up over it on hover. */}
              <div className="absolute inset-x-0 top-0 h-[160px] overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="absolute inset-x-0 bottom-0 top-[160px] overflow-hidden bg-white p-6 transition-[top] duration-300 ease-out group-hover:top-0">
                <h3 className="font-display text-xl font-bold text-ember">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-muted">{card.text}</p>
                <p className="mt-2 text-[13px] leading-6 text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-200">
                  {card.hover}
                </p>
                <span className="mt-3 inline-block text-[12px] font-bold uppercase tracking-wide text-ember">
                  {labels.more} →
                </span>
              </div>
            </>
          );

          // The CTA card links straight to Start Here; the rest open a modal.
          return card.cta ? (
            <Link key={card.key} href={startHref} className={className}>
              {body}
            </Link>
          ) : (
            <button
              key={card.key}
              type="button"
              onClick={() => setActive(card)}
              aria-haspopup="dialog"
              className={className}
            >
              {body}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-paper shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={labels.close}
              className="focus-ring absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>

            {activeImage ? (
              <div className="relative h-52 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={activeImage}
                  alt={active.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-ink">{active.title}</h3>
              <div className="mt-4 space-y-3">
                {active.modalBody.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
