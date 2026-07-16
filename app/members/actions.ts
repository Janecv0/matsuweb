"use server";

import { revalidatePath } from "next/cache";
import {
  getMemberSession,
  isTeacher,
  resolveChecklistItemRole,
  setProgress
} from "@/lib/content/members";

export interface ToggleResult {
  ok: boolean;
  error?: string;
}

/**
 * Toggle a single exam-readiness checklist item.
 *
 * Authorization:
 * - "member" items: the member may toggle their own; teachers may toggle any member's.
 * - "teacher" items: only a teacher (coach/admin) may toggle, for any member.
 */
export async function toggleChecklistItem(input: {
  targetUserId: string;
  itemKey: string;
  checked: boolean;
}): Promise<ToggleResult> {
  const session = await getMemberSession();
  if (!session) {
    return { ok: false, error: "unauthenticated" };
  }

  const itemRole = await resolveChecklistItemRole(input.itemKey);
  if (!itemRole) {
    return { ok: false, error: "unknown-item" };
  }

  const teacher = isTeacher(session.role);
  const isOwnTarget = input.targetUserId === session.user.id;

  if (itemRole === "teacher" && !teacher) {
    return { ok: false, error: "forbidden" };
  }

  if (itemRole === "member" && !teacher && !isOwnTarget) {
    return { ok: false, error: "forbidden" };
  }

  // A non-teacher may only ever write against their own record.
  const targetUserId = teacher ? input.targetUserId : session.user.id;

  const ok = await setProgress(targetUserId, input.itemKey, input.checked, {
    id: session.user.id,
    role: session.role
  });

  if (!ok) {
    return { ok: false, error: "write-failed" };
  }

  revalidatePath("/members");
  return { ok: true };
}
