"use client";

import { useMemo, useState } from "react";
import { uiDictionary } from "@/lib/i18n";
import { GlossaryTerm, Locale } from "@/lib/types";

interface GlossaryTableProps {
  locale: Locale;
  terms: GlossaryTerm[];
}

export function GlossaryTable({ locale, terms }: GlossaryTableProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return terms;
    }

    return terms.filter((item) =>
      [item.term, item.translation, item.description ?? "", item.category ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, terms]);

  return (
    <section className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-muted">{uiDictionary[locale].glossarySearch}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring w-full rounded-xl border border-black/15 bg-white px-4 py-3"
          placeholder={locale === "cs" ? "Např. rei" : "e.g. rei"}
        />
      </label>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/10 text-sm">
            <thead className="bg-black/[0.03] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">{locale === "cs" ? "Pojem" : "Term"}</th>
                <th className="px-4 py-3 font-semibold">{locale === "cs" ? "Význam" : "Meaning"}</th>
                <th className="px-4 py-3 font-semibold">{locale === "cs" ? "Kategorie" : "Category"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-white/75">
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-semibold">{item.term}</td>
                  <td className="px-4 py-3">
                    <p>{item.translation}</p>
                    {item.description ? <p className="mt-1 text-xs text-muted">{item.description}</p> : null}
                  </td>
                  <td className="px-4 py-3 text-muted">{item.category ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
