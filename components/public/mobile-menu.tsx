"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavigationItem } from "@/lib/types";

interface MobileMenuProps {
  items: NavigationItem[];
  menuLabel: string;
}

export function MobileMenu({ items, menuLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const mainItems = items.filter((item) => !item.is_cta);
  const cta = items.find((item) => item.is_cta);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-2 text-sm font-semibold"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span>{menuLabel}</span>
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full z-50 mt-2 w-full border-y border-black/15 bg-paper/95 px-4 py-4 shadow-lg backdrop-blur"
        >
          <ul className="space-y-2">
            {mainItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="focus-ring block rounded-md px-3 py-2 text-base font-medium text-ink hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {cta ? (
            <Link
              href={cta.href}
              className="focus-ring mt-3 block rounded-md bg-ember px-3 py-2 text-center text-sm font-semibold text-white hover:bg-ember/90"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
