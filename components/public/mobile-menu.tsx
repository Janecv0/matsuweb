"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavLink } from "@/lib/nav";

interface MobileMenuProps {
  links: NavLink[];
  membersLabel: string;
  membersHref: string;
  ctaLabel: string;
  ctaHref: string;
  menuLabel: string;
}

export function MobileMenu({
  links,
  membersLabel,
  membersHref,
  ctaLabel,
  ctaHref,
  menuLabel
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
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
          className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-black/10 bg-paper/95 p-3 shadow-xl backdrop-blur"
        >
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="focus-ring block rounded-xl px-3 py-2 text-base font-semibold text-ink hover:bg-warm/60"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={membersHref}
            className="focus-ring mt-2 block rounded-xl border-[1.5px] border-sage px-3 py-2 text-center text-sm font-bold text-sage"
            onClick={() => setOpen(false)}
          >
            {membersLabel}
          </Link>
          <Link
            href={ctaHref}
            className="focus-ring mt-2 block rounded-xl bg-sage px-3 py-2 text-center text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
