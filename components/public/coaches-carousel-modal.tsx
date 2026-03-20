"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Coach, Locale } from "@/lib/types";

interface CoachesCarouselModalProps {
  locale: Locale;
  coaches: Coach[];
}

function coachQuote(coach: Coach, locale: Locale) {
  if (coach.long_bio) {
    const sentence = coach.long_bio
      .split(".")
      .map((part) => part.trim())
      .find((part) => part.length > 24);

    if (sentence) {
      return `“${sentence}.”`;
    }
  }

  return locale === "cs"
    ? "„Karate není jen technika. Je to každodenní práce na sobě.“"
    : "“Karate is not only technique. It is daily work on yourself.”";
}

export function CoachesCarouselModal({ locale, coaches }: CoachesCarouselModalProps) {
  const sortedCoaches = useMemo(
    () => coaches.slice().sort((a, b) => a.order_index - b.order_index),
    [coaches]
  );
  const [activeCoach, setActiveCoach] = useState<Coach | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  function scrollRail(direction: "left" | "right") {
    railRef.current?.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    if (!activeCoach) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCoach(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCoach]);

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center sm:flex">
          <button
            type="button"
            onClick={() => scrollRail("left")}
            className="pointer-events-auto focus-ring ml-1 rounded-full border border-black/10 bg-white/90 p-2 text-ink shadow-card"
            aria-label={locale === "cs" ? "Posunout doleva" : "Scroll left"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center sm:flex">
          <button
            type="button"
            onClick={() => scrollRail("right")}
            className="pointer-events-auto focus-ring mr-1 rounded-full border border-black/10 bg-white/90 p-2 text-ink shadow-card"
            aria-label={locale === "cs" ? "Posunout doprava" : "Scroll right"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={railRef}
          className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
          aria-label={locale === "cs" ? "Karusel trenérů" : "Coaches carousel"}
        >
          {sortedCoaches.map((coach) => (
            <button
              key={coach.id}
              type="button"
              onClick={() => setActiveCoach(coach)}
              className="focus-ring surface min-w-[250px] snap-start overflow-hidden text-left sm:min-w-[280px]"
              aria-label={`${coach.name}${coach.rank_title ? `, ${coach.rank_title}` : ""}`}
            >
              <div className="relative aspect-[4/5]">
                <Image src={coach.image_url} alt={coach.name} fill className="object-cover" sizes="(max-width: 768px) 70vw, 280px" />
              </div>
              <div className="space-y-1 p-4">
                <h3 className="text-xl">{coach.name}</h3>
                {coach.rank_title ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">{coach.rank_title}</p>
                ) : null}
                <p className="text-sm text-muted">{locale === "cs" ? "Klikněte pro detail" : "Click for details"}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeCoach ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={() => setActiveCoach(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            className="surface max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-paper"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
              <h3 id="coach-modal-title" className="text-2xl">
                {activeCoach.name}
              </h3>
              <button
                type="button"
                onClick={() => setActiveCoach(null)}
                className="focus-ring rounded-full border border-black/10 bg-white p-2"
                aria-label={locale === "cs" ? "Zavřít okno" : "Close modal"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[0.9fr,1.1fr]">
              <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-black/10">
                <Image src={activeCoach.image_url} alt={activeCoach.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>

              <div className="space-y-4">
                {activeCoach.rank_title ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">{activeCoach.rank_title}</p>
                ) : null}

                <blockquote className="rounded-lg border-l-4 border-ember bg-white/70 px-4 py-3 text-base italic leading-7 text-muted">
                  {coachQuote(activeCoach, locale)}
                </blockquote>

                <p className="text-sm leading-7 text-muted">{activeCoach.long_bio ?? activeCoach.short_bio}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
