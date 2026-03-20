"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ValueCard } from "@/lib/types";

interface ValueCardsGridProps {
  cards: ValueCard[];
}

export function ValueCardsGrid({ cards }: ValueCardsGridProps) {
  const orderedCards = useMemo(
    () => cards.slice().sort((a, b) => a.order_index - b.order_index),
    [cards]
  );
  const [activeCard, setActiveCard] = useState<ValueCard | null>(null);

  useEffect(() => {
    if (!activeCard) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard]);

  function CardVisual({ card }: { card: ValueCard }) {
    return (
      <>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={card.image_url}
            alt={card.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
            <div className="transform-gpu transition duration-300 group-hover:-translate-y-7">
              <h2 className="text-2xl">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-paper/90">{card.excerpt}</p>
            </div>
            <p className="pointer-events-none mt-2 max-h-0 overflow-hidden text-sm leading-6 text-paper/90 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
              {card.hover_text ??
                "TODO: Add optional hover paragraph to show additional context on this card."}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="section-shell mt-14">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {orderedCards.map((card) => {
            const isModal = card.action_type === "modal";

            if (isModal) {
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveCard(card)}
                  className="group focus-ring surface overflow-hidden border border-black/12 text-left transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardVisual card={card} />
                </button>
              );
            }

            return (
              <Link
                key={card.id}
                href={card.href ?? "#"}
                className="group focus-ring surface overflow-hidden border border-black/12 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CardVisual card={card} />
              </Link>
            );
          })}
        </div>
      </section>

      {activeCard ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={() => setActiveCard(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="value-card-modal-title"
            className="surface max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-paper"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
              <h3 id="value-card-modal-title" className="text-2xl">
                {activeCard.modal_title ?? activeCard.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveCard(null)}
                className="focus-ring rounded-full border border-black/10 bg-white p-2"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-base leading-7 text-muted">
                  {activeCard.modal_body ??
                    "TODO: Add modal text for this value card. This content is editable in admin."}
                </p>

                <p className="rounded-lg border-l-4 border-ember bg-white/70 px-4 py-3 text-sm italic leading-6 text-muted">
                  {activeCard.hover_text ?? activeCard.excerpt}
                </p>
              </div>

              <div className="space-y-3">
                {activeCard.modal_image_url ? (
                  <div className="relative h-56 overflow-hidden rounded-xl border border-black/10">
                    <Image
                      src={activeCard.modal_image_url}
                      alt={activeCard.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : null}

                {activeCard.modal_image_url_secondary ? (
                  <div className="relative h-40 overflow-hidden rounded-xl border border-black/10">
                    <Image
                      src={activeCard.modal_image_url_secondary}
                      alt={activeCard.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
