# Karate Klub Matsu Project Notes

Generated from the local repository on 2026-07-06. This describes the codebase and seed/fallback content in this workspace; live Supabase data may differ.

## Project Summary

Karate Klub Matsu is a production-oriented bilingual website for a karate club. It supports Czech and English public pages, editable Supabase-backed content, protected admin tools, media uploads, contact forms, beginner inquiry forms, spam protection, SEO basics, and deployment to Vercel.

The public site is built as a localized multi-page Next.js App Router application. Most visible copy and structured site data comes from Supabase tables, with local fallback content available when Supabase is not configured or a content query fails.

## Technology Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, and Storage
- `@supabase/ssr` for browser/server auth clients
- `@supabase/supabase-js` for service-role server operations
- Zod for form validation
- Lucide React for icons
- date-fns dependency available for date handling
- ESLint and TypeScript checks

## Main Capabilities

- Bilingual public site for `cs` and `en`.
- Localized URL structure and localized navigation.
- Homepage sections:
  - announcement/recruitment strips
  - hero carousel
  - value cards with link or modal actions
  - about preview
  - coaches preview
  - testimonials
  - locations/map area
  - events/calendar area
  - final CTA
- Public subpages for about, beginners, students, student resources, and contact.
- Admin dashboard protected by Supabase Auth and admin authorization.
- Admin content manager for most content tables.
- Admin submissions list.
- Admin media uploader to Supabase Storage.
- Contact and beginner forms stored in Supabase.
- Captcha support through Cloudflare Turnstile or hCaptcha.
- Optional webhook notifications for form submissions.
- Sitemap and robots routes.
- Initial foundation for member-only content through `is_member_only` and `/members` scaffold.

## Localized Routes

Public locale roots:

- `/cs`
- `/en`

About:

- `/cs/o-nas`
- `/en/about`

The older/deeper about URLs redirect to anchors on the single about page:

- `/cs/o-nas/klub` -> `/cs/o-nas#club`
- `/cs/o-nas/historie` -> `/cs/o-nas#history`
- `/cs/o-nas/treneri` -> `/cs/o-nas#trainers`
- `/en/about/club` -> `/en/about#club`
- `/en/about/history` -> `/en/about#history`
- `/en/about/coaches` -> `/en/about#trainers`

Beginner/start pages:

- `/cs/chci-zacit`
- `/en/start-here`

Student pages:

- `/cs/pro-studenty`
- `/cs/pro-studenty/zkusebni-rad`
- `/cs/pro-studenty/slovnicek`
- `/cs/pro-studenty/etiketa`
- `/cs/pro-studenty/etika`
- `/en/for-students`
- `/en/for-students/examination-rules`
- `/en/for-students/vocabulary`
- `/en/for-students/etiquette`
- `/en/for-students/ethics`

Contact:

- `/cs/kontakty`
- `/en/contact`

Admin and internal routes:

- `/login`
- `/admin`
- `/admin/content`
- `/admin/submissions`
- `/admin/media`
- `/members`
- `/api/forms/contact`
- `/api/forms/beginner`
- `/sitemap.xml`
- `/robots.txt`

## Important Files And Folders

- `app/`: Next.js App Router routes.
- `app/[locale]/page.tsx`: localized homepage.
- `app/[locale]/[...slug]/page.tsx`: localized dynamic public pages.
- `app/admin/`: protected admin dashboard, content editor, submissions, media.
- `app/api/forms/`: JSON POST handlers for contact and beginner forms.
- `components/public/`: public-facing layout and sections.
- `components/forms/`: contact/beginner forms and captcha field.
- `components/admin/`: admin record editor, login form, media uploader, locale switcher.
- `lib/content/public-content.ts`: loads public content from Supabase with fallback handling.
- `lib/content/admin-content.ts`: admin auth helpers and admin data loading.
- `lib/data/fallback-content.ts`: local fallback content for both locales.
- `lib/i18n.ts`: locales, route mapping, page titles, UI dictionary.
- `lib/types.ts`: shared content and database-shaped TypeScript types.
- `lib/supabase/`: browser, server, service-role, and env helpers.
- `lib/validation/forms.ts`: Zod schemas for form APIs.
- `lib/captcha.ts`: Turnstile/hCaptcha verification.
- `lib/notifications.ts`: optional webhook notification sender.
- `proxy.ts`: Supabase session refresh for `/admin/*` and `/login`.
- `supabase/migrations/`: database schema and incremental schema updates.
- `supabase/seed.sql`: demo/initial bilingual content.
- `.env.example`: required environment variable template.

## Public Rendering Flow

Public content is loaded through `getPublicContent(locale)` in `lib/content/public-content.ts`.

The loader:

- starts with `getFallbackContent(locale)`
- creates a Supabase service client if env vars are available
- fetches all public content tables in parallel
- falls back to local content if any fetch errors
- falls back per section when a table returns no rows
- sorts ordered content by `order_index`
- sorts events by `starts_at`
- caches the result with React `cache`

Public pages revalidate every 120 seconds through `export const revalidate = 120`.

The homepage uses `PublicShell`, `HeroCarousel`, `ValueCardsGrid`, `CoachesPreview`, `TestimonialsGrid`, `LocationSection`, and `EventsSection`.

Dynamic pages resolve their `page_key` from localized slugs in `lib/i18n.ts`, then render through `PageRenderer`.

## Page Renderer Behavior

`components/public/page-renderer.tsx` contains custom layouts for important page groups:

- `about`: single page with `club`, `history`, and `trainers` anchor sections.
- `start-here`: beginner copy, schedule table, pricing cards, FAQ, and beginner form.
- `students`: hub page linking to student resource pages.
- `students-examination-rules`: markdown body plus document links.
- `students-vocabulary`: glossary search/table.
- `students-etiquette` and `students-ethics`: markdown body plus student subnav.
- `contact`: contact copy, locations, map iframe, and contact form.
- fallback: generic header plus markdown body.

Markdown rendering is intentionally simple and handled by `MarkdownBlock`.

## Admin System

Admin access requires:

- a signed-in Supabase Auth user
- either the user's email in `ADMIN_EMAILS`
- or a `public.user_roles` row with `role = 'admin'`

The admin check lives in `lib/content/admin-content.ts`.

Protected layout:

- `app/admin/layout.tsx` checks the current user and authorization.
- unauthorized users are redirected to `/login?next=/admin`.
- the admin header links to Overview, Content, Submissions, Media, and Sign out.

Login:

- `components/admin/login-form.tsx` uses Supabase password sign-in.
- after login it redirects to the `next` query param or `/admin`.

Content editing:

- `app/admin/content/page.tsx` defines the editable sections and fields.
- `RecordEditor` renders reusable forms.
- `saveRecordAction` inserts or updates rows using a service-role client.
- `deleteRecordAction` deletes rows by table and ID.
- values are normalized for booleans and numeric fields.
- `revalidatePath(returnPath)` refreshes edited admin pages.

Admin currently edits:

- announcements
- navigation items
- hero slides
- value cards
- pages
- coaches
- testimonials
- locations
- events
- FAQ items
- pricing items
- schedule entries
- glossary terms
- documents
- footer links
- social links
- site settings

Submissions:

- `/admin/submissions` reads the latest form submissions, defaulting to 300 on the page.

Media:

- `/admin/media` uploads images to Supabase Storage bucket `media`.
- uploaded files are stored under `uploads/<timestamp>-<safe-file-name>`.
- public URLs are inserted into `media_assets`.
- admins paste those URLs into content editor fields.

## Forms

The project has two public JSON form endpoints:

- `POST /api/forms/contact`
- `POST /api/forms/beginner`

Both endpoints:

- parse JSON
- validate with Zod
- verify captcha
- save to `form_submissions`
- send optional webhook notification
- return `{ ok: true }` on success

Contact form fields:

- `locale`
- `name`
- `email`
- `phone`
- `message`
- `captchaToken`

Beginner form fields:

- `locale`
- `name`
- `email`
- `phone`
- `ageGroup`
- `message`
- `captchaToken`

Validation limits:

- name: 2 to 120 characters
- email: valid email, max 255 characters
- phone: optional, max 40 characters
- age group: optional, max 80 characters
- message: 10 to 5000 characters
- captcha token: minimum 10 characters

Captcha behavior:

- if `TURNSTILE_SECRET_KEY` is set, Turnstile is used
- otherwise, if `HCAPTCHA_SECRET` is set, hCaptcha is used
- if neither secret is set, captcha verification returns OK with provider `none`

Notification behavior:

- if `NOTIFICATION_WEBHOOK_URL` is set, form payloads are posted as JSON
- webhook failures are swallowed so form saving is not broken

## Supabase Database

The initial schema is in `supabase/migrations/202603170001_initial.sql`.

Core tables:

- `user_roles`: maps Supabase Auth users to admin/editor/coach roles.
- `announcements`: recruitment and info/warning strips.
- `navigation_items`: localized header links and CTA flag.
- `hero_slides`: localized homepage carousel slides.
- `value_cards`: localized homepage card grid.
- `pages`: localized page copy, markdown, SEO metadata, member-only flag.
- `coaches`: localized coach profiles.
- `testimonials`: localized testimonials.
- `locations`: training location cards and map iframe URLs.
- `events`: upcoming events and optional external links.
- `faq_items`: page-specific FAQ entries.
- `pricing_items`: page-specific pricing data.
- `schedule_entries`: page-specific schedule rows.
- `glossary_terms`: student vocabulary terms.
- `documents`: student/resource documents.
- `footer_links`: localized footer links.
- `social_links`: global social links.
- `site_settings`: localized or global settings.
- `form_submissions`: saved contact and beginner inquiries.
- `media_assets`: records of uploaded files.

Value-card modal migration:

- `supabase/migrations/202603200001_value_cards_modal.sql`
- adds `hover_text`
- adds `action_type` with `link` or `modal`
- adds modal title/body/image fields
- makes `href` nullable
- backfills modal behavior for seeded cards with keys `meaning`, `tradition`, `selfdefense`, and `practice`

Row Level Security:

- RLS is enabled on all public content tables.
- public read policies are created for visible site content tables.
- authenticated users can read `form_submissions`.
- authenticated users can read and insert `media_assets`.
- Supabase Storage bucket `media` is public for reads.
- authenticated users can upload to bucket `media`.

Important security note:

- Admin insert/update/delete operations use the service-role key on the server.
- The admin UI checks authorization before calling those operations.
- The generic save/delete actions accept a table name from form data, so admin access must remain tightly protected.

## Supabase Storage

The migration creates a public bucket:

- bucket ID: `media`
- bucket name: `media`
- public: true

Storage policies:

- public read access for objects in `media`
- authenticated insert access for objects in `media`

The Next image config allows remote images from:

- `images.unsplash.com`
- `**.supabase.co`

## Site Settings

Settings are stored in `site_settings` and can be locale-specific or global.

Observed settings in seed/fallback content include:

- logo URL and logo alt text
- footer contact text
- Google Calendar embed URL
- about page image URLs
- hero photo credit

`getSetting(content, key)` returns the first matching loaded setting value.

## Environment Variables

Defined in `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

HCAPTCHA_SECRET=
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=

NOTIFICATION_WEBHOOK_URL=

ADMIN_EMAILS=
```

Required for Supabase-backed operation:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Recommended for production forms:

- Turnstile variables or hCaptcha variables

Optional:

- `NEXT_PUBLIC_SITE_URL` for sitemap/robots canonical base
- `NOTIFICATION_WEBHOOK_URL` for form notifications
- `ADMIN_EMAILS` as a comma-separated admin allowlist fallback

## Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production server after build:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

Type-check:

```bash
npm run typecheck
```

## Setup Checklist

1. Copy `.env.example` to `.env.local`.
2. Fill Supabase URL, anon key, and service-role key.
3. Fill captcha variables for production.
4. Apply Supabase migrations.
5. Run `supabase/seed.sql` if initial/demo content is needed.
6. Create the first Supabase Auth admin user.
7. Add an admin role:

```sql
insert into public.user_roles (user_id, role)
values ('<AUTH_USER_UUID>', 'admin');
```

8. Start the dev server with `npm run dev`.
9. Open `/cs`, `/en`, `/login`, and `/admin`.

## Deployment Notes

The README targets Vercel deployment:

1. Push the repo to a Git provider.
2. Import the project into Vercel.
3. Add all production environment variables.
4. Apply Supabase migrations and seed content to the production database.
5. Deploy.

Production should use real captcha credentials and should not rely on captcha provider `none`.

## Design And Styling

Global styling is in `app/globals.css`.

The visual system uses:

- paper/warm background tones
- dark ink text
- ember/bronze accent colors
- serif display headings
- sans-serif body text
- reusable `.section-shell`, `.surface`, `.focus-ring`, and `.prose-content` helpers

Tailwind extensions are in `tailwind.config.ts`.

## SEO

SEO support includes:

- root metadata in `app/layout.tsx`
- per-page metadata from Supabase/fallback page records
- localized canonical and language alternates on locale homepages
- generated sitemap from localized route params
- generated robots file

`NEXT_PUBLIC_SITE_URL` controls sitemap/robots base URL. If unset, the fallback is `https://karate-klub-matsu.vercel.app`.

## Current Content State And TODOs

The seed and fallback content intentionally contain many placeholders. Before production launch, replace:

- club logo and logo alt text
- real club photography
- hero/value-card imagery if Unsplash placeholders are not desired
- detailed value-card modal text
- about/club/history/coaches page copy
- coach profiles and real coach images
- exact addresses and entry instructions
- contact email and phone
- pricing and payment conditions
- beginner FAQ answers
- schedule accuracy
- examination-rules document links
- glossary content if final terminology is different
- event descriptions and registration links
- Google Calendar embed URL if a real calendar should appear

Seed events currently use May and June 2026 dates. On 2026-07-06 these seed events are already in the past, so production data should be updated with current or upcoming events.

## Testing And Verification

Available project checks:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

There is no dedicated test suite configured in `package.json`.

## Notes For Future Development

- The `/members` route and `pages.is_member_only` flag are scaffolding for future member-only content, but full member gating is not implemented in the documented files.
- The admin record editor is flexible but generic. If non-admin roles are introduced later, table-level allowlists and stricter server action validation should be added.
- The public content loader currently falls back to local content if any Supabase query in the batch errors. This keeps the public site resilient, but can hide partial backend issues unless logs/monitoring are added.
- Captcha provider `none` is useful for local development, but production should set Turnstile or hCaptcha secrets.
- Uploaded media URLs are public because the `media` bucket is public.
