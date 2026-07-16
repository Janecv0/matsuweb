-- Exam-readiness checklist progress for the members area.
-- Checklist item definitions live in code (lib/content/site-content.ts); only the
-- per-member checked state is stored here. Writes go through server actions using the
-- service role, which enforce the member-vs-coach split by item.

create table if not exists public.member_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  checked boolean not null default false,
  checked_by uuid,
  checked_by_role text,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_key)
);

create index if not exists member_progress_user_idx on public.member_progress (user_id);

alter table public.member_progress enable row level security;

-- Helper: is the given auth user a coach or admin?
create or replace function public.is_staff(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = uid and role in ('coach', 'admin')
  );
$$;

-- A member can read their own progress; coaches/admins can read anyone's.
drop policy if exists "Members read own progress" on public.member_progress;
create policy "Members read own progress" on public.member_progress
  for select
  using (auth.uid() = user_id or public.is_staff(auth.uid()));

-- A member may write their own rows; coaches/admins may write anyone's. The
-- member-vs-coach item split is additionally enforced in the server action.
drop policy if exists "Members write own progress" on public.member_progress;
create policy "Members write own progress" on public.member_progress
  for all
  using (auth.uid() = user_id or public.is_staff(auth.uid()))
  with check (auth.uid() = user_id or public.is_staff(auth.uid()));
