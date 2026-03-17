"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HeroSlide } from "@/lib/types";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const activeSlides = useMemo(
    () => slides.filter((slide) => slide.is_active).sort((a, b) => a.order_index - b.order_index),
    [slides]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % activeSlides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [activeSlides.length]);

  if (!activeSlides.length) {
    return null;
  }

  const current = activeSlides[index];

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <div className="absolute inset-0">
        <Image
          src={current.image_url}
          alt={current.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />

      <div className="section-shell relative flex min-h-[64svh] items-end py-14 sm:min-h-[72svh]">
        <div className="max-w-3xl text-paper">
          <p className="mb-3 inline-flex rounded-full border border-paper/25 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
            Karate Klub Matsu
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">{current.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-paper/90 sm:text-lg">{current.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={current.primary_cta_href}
              className="focus-ring rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember/90"
            >
              {current.primary_cta_label}
            </Link>
            <Link
              href={current.secondary_cta_href}
              className="focus-ring rounded-full border border-paper/35 bg-black/25 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-black/40"
            >
              {current.secondary_cta_label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
