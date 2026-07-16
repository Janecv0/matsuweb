# Karate Klub Matsu Website

Production-oriented bilingual (Czech/English) multi-page website for **Karate Klub Matsu**, built with Next.js App Router and Tailwind CSS. All public copy is **static (i18n)**; Supabase is used only for form submissions and the authenticated members area.

## Content model
- **Public text & headings are static**, defined for both languages in [`lib/content/site-content.ts`](lib/content/site-content.ts) (types in `site-content-types.ts`). Edit the site by editing that file — no database or admin login required. Pages are statically generated.
- **Supabase** backs only the dynamic parts: contact/beginner form submissions and the members area (Auth + the exam-readiness checklist).

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS (warm "Matsu" palette, Noto Serif + Source Sans 3 via `next/font`)
- Supabase
  - Auth (members + coaches)
  - Postgres (form submissions + `member_progress`)
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
- Contact + beginner forms saved to Supabase with Turnstile/hCaptcha verification
- Submissions list at `/admin/submissions` (Supabase-auth guarded)
- **Members area** (`/members`): Supabase Auth login, club announcements, exam/glossary quick reference, documents, and a per-belt **exam-readiness checklist** — some checkpoints are ticked by the student, some confirmed by a coach/admin. Coaches can open any student's checklist.
- SEO basics, sitemap, robots
- Legacy About/Students subpage URLs redirect to anchors on the single About/Students pages

## Project Structure
- `app/[locale]/*`: localized public routes (home + `[...slug]`)
- `app/members/*`: members area (page + server actions)
- `app/admin/*`: submissions view (auth-guarded)
- `app/api/forms/*`: form handlers
- `components/public/*`: public UI sections (header, footer, page renderer, etc.)
- `components/members/*`: members checklist + coach student picker
- `components/forms/*`: contact/beginner forms + captcha
- `lib/content/site-content.ts`: **all static bilingual copy**
- `lib/content/members.ts`: members session/role/progress helpers
- `lib/i18n.ts`, `lib/nav.ts`: locale routing + navigation
- `supabase/migrations/*`: schema (incl. `member_progress`)

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
5. Create users in Supabase Auth (students, and at least one coach/admin).
6. Grant roles in SQL as needed (regular members need no row):
   - Coach (can confirm exam checkpoints): `insert into public.user_roles (user_id, role) values ('<AUTH_USER_UUID>', 'coach');`
   - Admin: `insert into public.user_roles (user_id, role) values ('<AUTH_USER_UUID>', 'admin');`
   - Alternatively add emails to `ADMIN_EMAILS` (comma-separated) to grant admin without a row.
7. Start app:
   - `npm run dev`
8. Open:
   - Public: `http://localhost:3000/cs` or `http://localhost:3000/en`
   - Members: `http://localhost:3000/members` (login gate)
   - Submissions: `http://localhost:3000/admin/submissions`

## Editing Content
Content is **hybrid**: evergreen copy is static in code, a curated set is admin-editable at runtime.

- **Static** (`lib/content/site-content.ts`, `cs` + `en` objects): hero, about text, etiquette/ethics, glossary, FAQ, value cards, nav labels. Also the *fallback* for everything below when Supabase is absent.
- **Admin-editable** at `/admin/content` (Supabase-backed, seeded from the static defaults by migration `202607150002_cms.sql`): the announcement bar (+ show/hide), the **exam requirements** per belt (label CZ/EN, order, and whether the student or the coach ticks each), members announcements, documents (Students + members), pricing tiers, trainers, and contact details.
- `lib/content/editable.ts` merges DB overrides over the static defaults (`getEditableContent`); admin saves call `revalidatePath` so changes show immediately.
- Only the per-student checklist *checked state* lives in `member_progress`; the checklist item *definitions* come from `cms_exam_items` (falling back to `site-content.ts`).

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
- Photos are placeholders (`PhotoSlot`, diagonal stripe texture) until final assets are supplied.
- The logo is the `松` badge + wordmark (`components/public/matsu-logo.tsx`).
- Contact map: set `contact.mapEmbedUrl` per locale in `site-content.ts` to swap the placeholder for a Google Maps embed.
