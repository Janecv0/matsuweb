"use client";

import { useState, useTransition } from "react";
import { Check, Lock } from "lucide-react";
import { toggleChecklistItem } from "@/app/members/actions";
import type { ExamLevel } from "@/lib/content/site-content-types";
import { cn } from "@/lib/utils";

interface ChecklistLabels {
  memberBadge: string;
  teacherBadge: string;
  lockedHint: string;
}

interface MembersChecklistProps {
  levels: ExamLevel[];
  targetUserId: string;
  initialProgress: Record<string, boolean>;
  canCheckMemberItems: boolean;
  canCheckTeacherItems: boolean;
  labels: ChecklistLabels;
}

export function MembersChecklist({
  levels,
  targetUserId,
  initialProgress,
  canCheckMemberItems,
  canCheckTeacherItems,
  labels
}: MembersChecklistProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>(initialProgress);
  const [pending, setPending] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function canToggle(checkableBy: "member" | "teacher") {
    return checkableBy === "teacher" ? canCheckTeacherItems : canCheckMemberItems;
  }

  function onToggle(itemKey: string, checkableBy: "member" | "teacher") {
    if (!canToggle(checkableBy) || pending) {
      return;
    }
    const next = !progress[itemKey];
    setProgress((prev) => ({ ...prev, [itemKey]: next }));
    setPending(itemKey);

    startTransition(async () => {
      const result = await toggleChecklistItem({ targetUserId, itemKey, checked: next });
      if (!result.ok) {
        // revert on failure
        setProgress((prev) => ({ ...prev, [itemKey]: !next }));
      }
      setPending(null);
    });
  }

  return (
    <div className="space-y-6">
      {levels.map((level) => {
        const done = level.items.filter((item) => progress[item.key]).length;
        return (
          <div key={level.key} className="rounded-2xl bg-[#332e27] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-paper">{level.label}</h3>
              <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-paper/70">
                {done}/{level.items.length}
              </span>
            </div>
            <ul className="space-y-2">
              {level.items.map((item) => {
                const checked = Boolean(progress[item.key]);
                const editable = canToggle(item.checkableBy);
                const isTeacherItem = item.checkableBy === "teacher";
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onToggle(item.key, item.checkableBy)}
                      disabled={!editable}
                      aria-pressed={checked}
                      title={!editable && isTeacherItem ? labels.lockedHint : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                        editable ? "cursor-pointer hover:bg-white/5" : "cursor-not-allowed",
                        pending === item.key && "opacity-60"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 flex-none items-center justify-center rounded-md border",
                          checked
                            ? isTeacherItem
                              ? "border-sage bg-sage text-white"
                              : "border-ember bg-ember text-white"
                            : "border-white/25 bg-transparent"
                        )}
                      >
                        {checked ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <span className={cn("flex-1", checked ? "text-paper/60 line-through" : "text-paper/90")}>
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          isTeacherItem ? "bg-sage/20 text-sage" : "bg-ember/20 text-ember"
                        )}
                      >
                        {isTeacherItem && !editable ? <Lock className="h-2.5 w-2.5" /> : null}
                        {isTeacherItem ? labels.teacherBadge : labels.memberBadge}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
