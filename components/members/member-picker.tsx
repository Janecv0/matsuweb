"use client";

import { useRouter } from "next/navigation";
import type { MemberSummary } from "@/lib/content/members";

interface MemberPickerProps {
  members: MemberSummary[];
  selectedId: string;
  lang: string;
  label: string;
}

export function MemberPicker({ members, selectedId, lang, label }: MemberPickerProps) {
  const router = useRouter();

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-paper/50">{label}</span>
      <select
        value={selectedId}
        onChange={(event) => {
          const params = new URLSearchParams();
          params.set("member", event.target.value);
          if (lang) {
            params.set("lang", lang);
          }
          router.push(`/members?${params.toString()}`);
        }}
        className="focus-ring rounded-xl border border-white/15 bg-[#22201b] px-3 py-2.5 font-semibold text-paper"
      >
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} · {member.email}
          </option>
        ))}
      </select>
    </label>
  );
}
