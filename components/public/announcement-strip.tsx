import { AlertTriangle, Bell, Megaphone } from "lucide-react";
import { Announcement } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnnouncementStripProps {
  announcement: Announcement;
}

function iconByName(name: string | null) {
  switch (name) {
    case "triangle-alert":
      return AlertTriangle;
    case "bell":
      return Bell;
    default:
      return Megaphone;
  }
}

function variantClass(variant: Announcement["variant"]) {
  switch (variant) {
    case "alert":
      return "bg-red-900 text-red-100";
    case "warning":
      return "bg-amber-700 text-amber-50";
    default:
      return "bg-ink text-paper";
  }
}

export function AnnouncementStrip({ announcement }: AnnouncementStripProps) {
  if (!announcement.is_visible) {
    return null;
  }

  const Icon = iconByName(announcement.icon_name);

  return (
    <div className={cn("w-full border-b border-black/20", variantClass(announcement.variant))}>
      <div className="section-shell flex min-h-10 items-center justify-center gap-2 py-1 text-center text-sm font-medium tracking-wide">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{announcement.text}</span>
      </div>
    </div>
  );
}
