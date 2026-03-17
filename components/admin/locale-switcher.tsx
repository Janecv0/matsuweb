import Link from "next/link";

interface LocaleAdminSwitcherProps {
  locale: "cs" | "en";
  path: string;
}

export function LocaleAdminSwitcher({ locale, path }: LocaleAdminSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/15 bg-white p-1 text-xs font-semibold uppercase">
      <Link
        href={`${path}?locale=cs`}
        className={`focus-ring rounded-full px-2.5 py-1 ${locale === "cs" ? "bg-ink text-paper" : "text-muted"}`}
      >
        CZ
      </Link>
      <Link
        href={`${path}?locale=en`}
        className={`focus-ring rounded-full px-2.5 py-1 ${locale === "en" ? "bg-ink text-paper" : "text-muted"}`}
      >
        EN
      </Link>
    </div>
  );
}
