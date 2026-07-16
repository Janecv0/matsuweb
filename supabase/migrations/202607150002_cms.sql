-- Admin-editable CMS content. Static defaults live in lib/content/site-content.ts;
-- these tables override the editable sections at runtime. Seeded with the current static
-- values so the DB is the source of truth and exam item_keys stay aligned with member_progress.
-- App reads these server-side via the service role only, so RLS is enabled with no public policy.

create extension if not exists pgcrypto;

-- Singleton: announcement bar + contact details.
create table if not exists public.cms_site (
  id int primary key default 1 check (id = 1),
  announcement_cs text not null default '',
  announcement_en text not null default '',
  announcement_visible boolean not null default true,
  contact_venue_cs text not null default '',
  contact_venue_en text not null default '',
  contact_address_cs text not null default '',
  contact_address_en text not null default '',
  contact_email text not null default '',
  contact_phone text not null default '',
  contact_social_cs text not null default '',
  contact_social_en text not null default '',
  contact_map_url text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_exam_levels (
  id uuid primary key default gen_random_uuid(),
  level_key text not null unique,
  label_cs text not null default '',
  label_en text not null default '',
  order_index int not null default 0
);

create table if not exists public.cms_exam_items (
  id uuid primary key default gen_random_uuid(),
  item_key text not null unique,
  level_key text not null,
  label_cs text not null default '',
  label_en text not null default '',
  checkable_by text not null default 'member' check (checkable_by in ('member', 'teacher')),
  order_index int not null default 0
);

create table if not exists public.cms_member_announcements (
  id uuid primary key default gen_random_uuid(),
  text_cs text not null default '',
  text_en text not null default '',
  tone text not null default 'ember' check (tone in ('ember', 'sage')),
  visible boolean not null default true,
  order_index int not null default 0
);

create table if not exists public.cms_documents (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'students' check (scope in ('students', 'members')),
  label_cs text not null default '',
  label_en text not null default '',
  url text not null default '',
  order_index int not null default 0
);

create table if not exists public.cms_pricing (
  id uuid primary key default gen_random_uuid(),
  name_cs text not null default '',
  name_en text not null default '',
  price text not null default '',
  unit_cs text not null default '',
  unit_en text not null default '',
  note_cs text not null default '',
  note_en text not null default '',
  highlight boolean not null default false,
  order_index int not null default 0
);

create table if not exists public.cms_trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  rank_cs text not null default '',
  rank_en text not null default '',
  bio_cs text not null default '',
  bio_en text not null default '',
  order_index int not null default 0
);

alter table public.cms_site enable row level security;
alter table public.cms_exam_levels enable row level security;
alter table public.cms_exam_items enable row level security;
alter table public.cms_member_announcements enable row level security;
alter table public.cms_documents enable row level security;
alter table public.cms_pricing enable row level security;
alter table public.cms_trainers enable row level security;

-- ---------------------------------------------------------------------------
-- Seed with current static defaults (idempotent).
-- ---------------------------------------------------------------------------

insert into public.cms_site (id, announcement_cs, announcement_en, announcement_visible,
  contact_venue_cs, contact_venue_en, contact_address_cs, contact_address_en,
  contact_email, contact_phone, contact_social_cs, contact_social_en, contact_map_url)
values (1,
  '🥋 Nábor otevřen — přijďte na první hodinu zdarma',
  '🥋 Enrollment open — come to your first lesson for free',
  true,
  'Tělocvična ZŠ Menšíkova', 'Menšíkova primary-school gym',
  'Menšíkova 620, Praha 4', 'Menšíkova 620, Prague 4',
  'kolencik@gmail.com', '+420 777 123 456',
  'Instagram · Facebook', 'Instagram · Facebook', '')
on conflict (id) do nothing;

insert into public.cms_exam_levels (level_key, label_cs, label_en, order_index) values
  ('9kyu', '9. kyu — bílý pás', '9th kyu — white belt', 1),
  ('8kyu', '8. kyu — žlutý pás', '8th kyu — yellow belt', 2),
  ('7kyu', '7. kyu — oranžový pás', '7th kyu — orange belt', 3)
on conflict (level_key) do nothing;

insert into public.cms_exam_items (item_key, level_key, label_cs, label_en, checkable_by, order_index) values
  ('9kyu.attendance', '9kyu', 'Odtrénováno min. 3 měsíce', 'Trained for at least 3 months', 'member', 1),
  ('9kyu.stances', '9kyu', 'Základní postoje (zenkutsu, kiba dachi)', 'Basic stances (zenkutsu, kiba dachi)', 'member', 2),
  ('9kyu.strikes', '9kyu', 'Základní údery a kryty', 'Basic strikes and blocks', 'member', 3),
  ('9kyu.etiquette', '9kyu', 'Znalost etikety dojo', 'Knows dojo etiquette', 'member', 4),
  ('9kyu.approved', '9kyu', 'Doporučení trenéra ke zkoušce', 'Coach''s recommendation for the exam', 'teacher', 5),
  ('8kyu.attendance', '8kyu', 'Odtrénováno min. 6 měsíců', 'Trained for at least 6 months', 'member', 1),
  ('8kyu.kata', '8kyu', 'Kata Taikyoku 1', 'Kata Taikyoku 1', 'member', 2),
  ('8kyu.combos', '8kyu', 'Základní kombinace v pohybu', 'Basic combinations in motion', 'member', 3),
  ('8kyu.terms', '8kyu', 'Japonské názvosloví 9.–8. kyu', 'Japanese terminology 9th–8th kyu', 'member', 4),
  ('8kyu.technique', '8kyu', 'Technická úroveň ověřena trenérem', 'Technical level verified by coach', 'teacher', 5),
  ('8kyu.approved', '8kyu', 'Doporučení trenéra ke zkoušce', 'Coach''s recommendation for the exam', 'teacher', 6),
  ('7kyu.attendance', '7kyu', 'Odtrénováno min. 9 měsíců', 'Trained for at least 9 months', 'member', 1),
  ('7kyu.kata', '7kyu', 'Kata Taikyoku 2', 'Kata Taikyoku 2', 'member', 2),
  ('7kyu.kumite', '7kyu', 'Základy kumite (ippon kumite)', 'Kumite basics (ippon kumite)', 'member', 3),
  ('7kyu.terms', '7kyu', 'Japonské názvosloví 7. kyu', 'Japanese terminology 7th kyu', 'member', 4),
  ('7kyu.kumite_ok', '7kyu', 'Kumite ověřeno trenérem', 'Kumite verified by coach', 'teacher', 5),
  ('7kyu.approved', '7kyu', 'Doporučení trenéra ke zkoušce', 'Coach''s recommendation for the exam', 'teacher', 6)
on conflict (item_key) do nothing;

insert into public.cms_member_announcements (text_cs, text_en, tone, visible, order_index) values
  ('Zkoušky na pásy se konají 14. 9. — přihlaste se u trenéra.',
   'Belt exams take place on 14 Sept — sign up with your coach.', 'ember', true, 1),
  ('Letní tábor 2026: přihlášky spuštěny.',
   'Summer camp 2026: applications are open.', 'sage', true, 2);

insert into public.cms_documents (scope, label_cs, label_en, url, order_index) values
  ('students', 'Zkušební řád 2026', 'Examination rules 2026', '#', 1),
  ('students', 'Přihláška člena', 'Membership application', '#', 2),
  ('students', 'Řád tělocvičny', 'Gym rules', '#', 3),
  ('members', 'Zkušební řád 2026', 'Examination rules 2026', '#', 1),
  ('members', 'Rozvrh podzim 2026', 'Autumn 2026 schedule', '#', 2),
  ('members', 'Přihláška na tábor', 'Camp application', '#', 3);

insert into public.cms_pricing (name_cs, name_en, price, unit_cs, unit_en, note_cs, note_en, highlight, order_index) values
  ('Děti', 'Children', '890 Kč', '/měsíc', '/month', '2× týdně, 6–14 let', '2× weekly, ages 6–14', false, 1),
  ('Dospělí', 'Adults', '1090 Kč', '/měsíc', '/month', '2× týdně, 15+ let', '2× weekly, ages 15+', false, 2),
  ('Rodinné', 'Family', '1690 Kč', '/měsíc', '/month', '2 a více členů rodiny', '2 or more family members', true, 3);

insert into public.cms_trainers (name, rank_cs, rank_en, bio_cs, bio_en, order_index) values
  ('Petr Novák', '4. dan', '4th dan',
   'Hlavní trenér, v klubu od založení v roce 1990.', 'Head coach, with the club since it was founded in 1990.', 1),
  ('Jana Dvořáková', '2. dan', '2nd dan',
   'Vede dětské skupiny a přípravu na zkoušky.', 'Leads the children''s groups and exam preparation.', 2),
  ('Tomáš Král', '3. dan', '3rd dan',
   'Sebeobrana a kondiční příprava dospělých.', 'Self-defence and conditioning for adults.', 3);
