import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const weekdaysCs = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
const weekdaysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function dayOfWeekLabel(day: number, locale: "cs" | "en") {
  const normalized = Math.max(0, Math.min(6, day));
  return locale === "cs" ? weekdaysCs[normalized] : weekdaysEn[normalized];
}

export function formatDateTime(value: string, locale: "cs" | "en") {
  const date = new Date(value);

  return date.toLocaleString(locale === "cs" ? "cs-CZ" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
