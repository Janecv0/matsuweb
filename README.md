# Karate Klub Matsu Website

Production-oriented bilingual (Czech/English) multi-page website for **Karate Klub Matsu**, built with Next.js App Router, Tailwind CSS, and Supabase.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Supabase
  - Auth (admin login)
  - Postgres content + submissions
  - Storage (media bucket)
- Server routes for forms and spam protection
- Ready for Vercel deployment

## Features
- Full bilingual public site (`/cs` + `/en`) with localized route structure
- Sticky header, recruitment strip, optional info/warning strip
- Hero, value cards, about preview, coaches, testimonials, map, events/calendar, strong CTA
- Value cards support hover-reveal text and configurable click action:
  - `action_type = modal` opens a modal with rich text + 1-2 images
  - `action_type = link` navigates to `href`
- Public page tree:
  - `/cs`, `/en`
  - `/cs/o-nas` (single page with `#club`, `#history`, `#trainers` sections)
  - `/en/about` (single page with `#club`, `#history`, `#trainers` sections)
  - `/cs/chci-zacit`, `/en/start-here`
  - `/cs/pro-studenty`, `/cs/pro-studenty/zkusebni-rad`, `/cs/pro-studenty/slovnicek`, `/cs/pro-studenty/etiketa`, `/cs/pro-studenty/etika`
  - `/en/for-students`, `/en/for-students/examination-rules`, `/en/for-students/vocabulary`, `/en/for-students/etiquette`, `/en/for-students/ethics`
  - `/cs/kontakty`, `/en/contact`
- Admin area (`/admin`) with Supabase-auth guard and form-like editors for key content tables
- Contact + beginner forms saved to Supabase with Turnstile/hCaptcha verification
- Submissions list in admin (`/admin/submissions`)
- Media upload to Supabase Storage (`/admin/media`)
- Foundation for future member-only content (`is_member_only`, `/members` scaffold)
- SEO basics, sitemap, robots
- Legacy About subpage URLs redirect to anchors on the single About page

## Project Structure
- `app/[locale]/*`: localized public routes
- `app/admin/*`: protected admin views
- `app/api/forms/*`: form handlers
- `components/public/*`: public UI sections
- `components/forms/*`: contact/beginner forms + captcha
- `components/admin/*`: admin UI
- `lib/content/*`: content loading helpers
- `supabase/migrations/*`: schema
- `supabase/seed.sql`: demo bilingual content

## Setup
1. Install dependencies:
   - `npm install`
2. Copy env template:
   - `cp .env.example .env.local`
3. Fill required variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - captcha vars (`TURNSTILE_*` or `HCAPTCHA_*`)
4. Apply Supabase migration and seed (Supabase CLI):
   - `supabase db reset` (or `supabase db push` then run seed)
   - seed file: `supabase/seed.sql`
5. Create first admin user in Supabase Auth.
6. Grant admin role in SQL:
   - `insert into public.user_roles (user_id, role) values ('<AUTH_USER_UUID>', 'admin');`
7. Start app:
   - `npm run dev`
8. Open:
   - Public: `http://localhost:3000/cs` or `http://localhost:3000/en`
   - Login: `http://localhost:3000/login`
   - Admin: `http://localhost:3000/admin`

## Admin Content Editing
- Locale switch in `/admin/content` toggles CZ/EN records
- Edit:
  - navigation
  - strips
  - hero slides
  - value cards
    - hover paragraph (`hover_text`)
    - click action (`action_type`: `modal` or `link`)
    - modal title/body + modal images
  - page texts/SEO
  - coaches/testimonials
  - locations/events
  - Start Here + Students data tables (FAQ/pricing/schedule/glossary/documents)
  - footer/social/settings
- Upload media in `/admin/media` and paste URLs into content entries

## Forms and Spam Protection
- Contact form: `POST /api/forms/contact`
- Beginner form: `POST /api/forms/beginner`
- Captcha provider auto-detected:
  - Turnstile if `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - hCaptcha if `HCAPTCHA_SECRET` + `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- Optional webhook notifications via `NOTIFICATION_WEBHOOK_URL`

## Deployment (Vercel)
1. Push repo to Git provider.
2. Import project to Vercel.
3. Set environment variables in Vercel.
4. Ensure Supabase migration/seed are applied in target DB.
5. Deploy.

## Notes
- Current logo: placeholder block by default.
- TODO marker is present where client-final content/assets are expected.
- If you have the current-site logo asset, upload it in `/admin/media` and set `site_settings.logo_url` per locale.
