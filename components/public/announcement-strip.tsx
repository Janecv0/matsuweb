import { AlertTriangle, Bell, Megaphone } from "lucide-react";
import { Announcement } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnnouncementStripProps {
  announcement: Announcement;
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

  return (
    <div className={cn("w-full border-b border-black/20", variantClass(announcement.variant))}>
      <div className="section-shell flex min-h-10 items-center justify-center gap-2 py-1 text-center text-sm font-medium tracking-wide">
        {announcement.icon_name === "triangle-alert" ? (
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        ) : announcement.icon_name === "bell" ? (
          <Bell className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Megaphone className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{announcement.text}</span>
      </div>
    </div>
  );
}
