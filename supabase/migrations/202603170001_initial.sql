create extension if not exists pgcrypto;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (role in ('admin', 'editor', 'coach')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  strip_type text not null check (strip_type in ('recruitment', 'info')),
  text text not null,
  is_visible boolean not null default true,
  variant text not null default 'info' check (variant in ('info', 'warning', 'alert')),
  icon_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, strip_type)
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  label text not null,
  href text not null,
  order_index int not null default 0,
  is_cta boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  title text not null,
  subtitle text not null,
  image_url text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  order_index int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.value_cards (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  card_key text not null,
  title text not null,
  excerpt text not null,
  image_url text not null,
  href text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, card_key)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  title text not null,
  subtitle text,
  intro text,
  body_markdown text,
  seo_title text,
  seo_description text,
  is_member_only boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, page_key)
);

create table if not exists public.coaches (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  slug text not null,
  name text not null,
  rank_title text,
  short_bio text not null,
  long_bio text,
  image_url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  quote text not null,
  author_name text not null,
  author_role text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  name text not null,
  address text not null,
  city text not null,
  map_embed_url text,
  notes text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location_name text,
  summary text,
  href text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  question text not null,
  answer text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_items (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  label text not null,
  price_text text not null,
  notes text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schedule_entries (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  day_of_week int not null check (day_of_week >= 0 and day_of_week <= 6),
  start_time text not null,
  end_time text not null,
  group_name text not null,
  location_name text not null,
  notes text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  term text not null,
  translation text not null,
  description text,
  category text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  page_key text not null,
  title text not null,
  description text,
  file_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.footer_links (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  label text not null,
  href text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  href text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  locale text,
  setting_key text not null,
  setting_value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, setting_key)
);

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('cs', 'en')),
  form_type text not null check (form_type in ('contact', 'beginner')),
  name text not null,
  email text not null,
  phone text,
  age_group text,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  public_url text,
  alt_text_cs text,
  alt_text_en text,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;
alter table public.announcements enable row level security;
alter table public.navigation_items enable row level security;
alter table public.hero_slides enable row level security;
alter table public.value_cards enable row level security;
alter table public.pages enable row level security;
alter table public.coaches enable row level security;
alter table public.testimonials enable row level security;
alter table public.locations enable row level security;
alter table public.events enable row level security;
alter table public.faq_items enable row level security;
alter table public.pricing_items enable row level security;
alter table public.schedule_entries enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.documents enable row level security;
alter table public.footer_links enable row level security;
alter table public.social_links enable row level security;
alter table public.site_settings enable row level security;
alter table public.form_submissions enable row level security;
alter table public.media_assets enable row level security;

drop policy if exists "Public read announcements" on public.announcements;
create policy "Public read announcements" on public.announcements for select using (true);
drop policy if exists "Public read navigation_items" on public.navigation_items;
create policy "Public read navigation_items" on public.navigation_items for select using (true);
drop policy if exists "Public read hero_slides" on public.hero_slides;
create policy "Public read hero_slides" on public.hero_slides for select using (true);
drop policy if exists "Public read value_cards" on public.value_cards;
create policy "Public read value_cards" on public.value_cards for select using (true);
drop policy if exists "Public read pages" on public.pages;
create policy "Public read pages" on public.pages for select using (true);
drop policy if exists "Public read coaches" on public.coaches;
create policy "Public read coaches" on public.coaches for select using (true);
drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials" on public.testimonials for select using (true);
drop policy if exists "Public read locations" on public.locations;
create policy "Public read locations" on public.locations for select using (true);
drop policy if exists "Public read events" on public.events;
create policy "Public read events" on public.events for select using (true);
drop policy if exists "Public read faq_items" on public.faq_items;
create policy "Public read faq_items" on public.faq_items for select using (true);
drop policy if exists "Public read pricing_items" on public.pricing_items;
create policy "Public read pricing_items" on public.pricing_items for select using (true);
drop policy if exists "Public read schedule_entries" on public.schedule_entries;
create policy "Public read schedule_entries" on public.schedule_entries for select using (true);
drop policy if exists "Public read glossary_terms" on public.glossary_terms;
create policy "Public read glossary_terms" on public.glossary_terms for select using (true);
drop policy if exists "Public read documents" on public.documents;
create policy "Public read documents" on public.documents for select using (true);
drop policy if exists "Public read footer_links" on public.footer_links;
create policy "Public read footer_links" on public.footer_links for select using (true);
drop policy if exists "Public read social_links" on public.social_links;
create policy "Public read social_links" on public.social_links for select using (true);
drop policy if exists "Public read site_settings" on public.site_settings;
create policy "Public read site_settings" on public.site_settings for select using (true);

drop policy if exists "Authenticated read submissions" on public.form_submissions;
create policy "Authenticated read submissions" on public.form_submissions
  for select using (auth.role() = 'authenticated');

drop policy if exists "Authenticated read media assets" on public.media_assets;
create policy "Authenticated read media assets" on public.media_assets
  for select using (auth.role() = 'authenticated');

drop policy if exists "Authenticated insert media assets" on public.media_assets;
create policy "Authenticated insert media assets" on public.media_assets
  for insert to authenticated
  with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media bucket" on storage.objects;
create policy "Public read media bucket" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "Authenticated upload media bucket" on storage.objects;
create policy "Authenticated upload media bucket" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media');
