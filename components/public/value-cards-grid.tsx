import Image from "next/image";
import Link from "next/link";
import { ValueCard } from "@/lib/types";

interface ValueCardsGridProps {
  cards: ValueCard[];
}

export function ValueCardsGrid({ cards }: ValueCardsGridProps) {
  return (
    <section className="section-shell mt-14">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.sort((a, b) => a.order_index - b.order_index).map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group surface overflow-hidden border border-black/12 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={card.image_url}
                alt={card.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-2xl">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{card.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
