import { Testimonial } from "@/lib/types";

interface TestimonialsGridProps {
  title: string;
  testimonials: Testimonial[];
}

export function TestimonialsGrid({ title, testimonials }: TestimonialsGridProps) {
  return (
    <section className="section-shell mt-20">
      <h2 className="mb-7 text-3xl sm:text-4xl">{title}</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        {testimonials.sort((a, b) => a.order_index - b.order_index).map((item) => (
          <blockquote key={item.id} className="surface border-l-4 border-l-ember p-6">
            <p className="text-lg leading-8 text-ink/90">“{item.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-muted">
              {item.author_name}
              {item.author_role ? `, ${item.author_role}` : ""}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
