import Link from "next/link";
import type { Metadata } from "next";
import { signOutAction } from "@/app/admin/actions";
import { MemberPicker } from "@/components/members/member-picker";
import { MembersChecklist } from "@/components/members/members-checklist";
import { getEditableContent } from "@/lib/content/editable";
import {
  getMemberSession,
  getProgressFor,
  isTeacher,
  listMembers
} from "@/lib/content/members";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Členská sekce | Karate Klub Matsu",
  robots: { index: false, follow: false }
};

interface MembersPageProps {
  searchParams: Promise<{ lang?: string; member?: string }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const { lang, member } = await searchParams;
  const locale: Locale = lang && isLocale(lang) ? lang : "cs";
  const c = (await getEditableContent(locale)).members;
  const session = await getMemberSession();

  const langHref = (target: Locale) => {
    const params = new URLSearchParams();
    params.set("lang", target);
    if (member) {
      params.set("member", member);
    }
    return `/members?${params.toString()}`;
  };

  // ---- Signed out ----
  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-16 text-paper">
        <div className="w-full max-w-md rounded-3xl bg-[#332e27] p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">{c.eyebrow}</p>
          <h1 className="mt-2 font-display text-2xl font-bold">{c.loginPrompt.title}</h1>
          <p className="mt-3 text-sm leading-6 text-paper/70">{c.loginPrompt.body}</p>
          <Link
            href="/login?next=/members"
            className="focus-ring mt-6 inline-flex rounded-full bg-sage px-6 py-3 text-sm font-bold text-white"
          >
            {c.loginPrompt.cta}
          </Link>
        </div>
      </main>
    );
  }

  const teacher = isTeacher(session.role);
  const members = teacher ? await listMembers() : [];
  const targetUserId = teacher && member ? member : session.user.id;
  const progress = await getProgressFor(targetUserId);

  const viewingSelf = targetUserId === session.user.id;
  const targetName = viewingSelf
    ? session.displayName
    : members.find((m) => m.id === targetUserId)?.name ?? "";

  const canCheckMemberItems = teacher || viewingSelf;
  const canCheckTeacherItems = teacher;

  return (
    <main className="min-h-screen bg-ink text-paper">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-10">
        <Link href={`/${locale}`} className="focus-ring flex items-center gap-2.5 rounded-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember font-display text-base font-bold text-white">
            松
          </span>
          <span className="font-display text-base font-bold text-paper">Karate Klub Matsu</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-white/15 p-1 text-xs font-semibold uppercase">
            {(["cs", "en"] as Locale[]).map((target) => (
              <Link
                key={target}
                href={langHref(target)}
                className={cn(
                  "rounded-full px-2.5 py-1",
                  target === locale ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"
                )}
              >
                {target === "cs" ? "CZ" : "EN"}
              </Link>
            ))}
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="focus-ring rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-paper/90 hover:bg-white/5"
            >
              {c.signOut}
            </button>
          </form>
        </div>
      </div>

      {/* welcome */}
      <div className="bg-[#22201b] px-6 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">{c.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-bold">
          {c.welcomePrefix}
          {session.displayName} 👋
        </h1>
        <p className="mt-2 text-sm text-paper/70">{c.subtitle}</p>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        {/* announcements */}
        <section className="rounded-2xl bg-[#332e27] p-6">
          <h2 className="mb-4 font-display text-lg font-bold">{c.announcements.title}</h2>
          <div className="space-y-2.5">
            {c.announcements.items.map((item) => (
              <p
                key={item.text}
                className={cn(
                  "border-l-[3px] pl-3 text-sm leading-6 text-paper/85",
                  item.tone === "ember" ? "border-ember" : "border-sage"
                )}
              >
                {item.text}
              </p>
            ))}
          </div>
        </section>

        {/* quick reference */}
        <section className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#332e27] p-6">
            <h2 className="mb-3 font-display text-lg font-bold">{c.quickRef.examTitle}</h2>
            <div className="space-y-1 text-sm leading-7 text-paper/75">
              {c.quickRef.examLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#332e27] p-6">
            <h2 className="mb-3 font-display text-lg font-bold">{c.quickRef.glossaryTitle}</h2>
            <div className="space-y-1 text-sm leading-7 text-paper/75">
              {c.quickRef.glossaryLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </section>

        {/* documents */}
        <section className="mt-5">
          <h2 className="mb-4 font-display text-lg font-bold">{c.documents.title}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.documents.items.map((doc) => (
              <a
                key={doc.label}
                href={doc.href ?? "#"}
                className="focus-ring flex items-center gap-3 rounded-2xl bg-[#332e27] p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage text-[11px] font-bold text-white">
                  PDF
                </span>
                <span className="text-[13px] font-bold text-paper">{doc.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* exam readiness checklist */}
        <section className="mt-8">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">{c.checklist.title}</h2>
              <p className="mt-1 max-w-xl text-sm text-paper/60">{c.checklist.intro}</p>
            </div>
            {teacher ? (
              members.length ? (
                <MemberPicker
                  members={members}
                  selectedId={targetUserId}
                  lang={locale}
                  label={c.teacher.pickMember}
                />
              ) : (
                <p className="text-sm text-paper/50">{c.teacher.noMembers}</p>
              )
            ) : null}
          </div>

          {teacher && !viewingSelf ? (
            <p className="mb-4 text-sm text-sage">
              {c.teacher.viewingLabel} <span className="font-bold">{targetName}</span>
            </p>
          ) : null}

          <MembersChecklist
            levels={c.checklist.levels}
            targetUserId={targetUserId}
            initialProgress={progress}
            canCheckMemberItems={canCheckMemberItems}
            canCheckTeacherItems={canCheckTeacherItems}
            labels={{
              memberBadge: c.checklist.memberBadge,
              teacherBadge: c.checklist.teacherBadge,
              lockedHint: c.checklist.lockedHint
            }}
          />
        </section>
      </div>
    </main>
  );
}
