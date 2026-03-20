import { LocaleAdminSwitcher } from "@/components/admin/locale-switcher";
import { EditorField, RecordEditor } from "@/components/admin/record-editor";
import { getAdminContent } from "@/lib/content/admin-content";

function Section({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-2xl">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

interface ContentPageProps {
  searchParams: Promise<{ locale?: string }>;
}

const trueFalseOptions = [
  { label: "True", value: "true" },
  { label: "False", value: "false" }
];

const announcementFields: EditorField[] = [
  { name: "locale", label: "Locale", type: "hidden" },
  { name: "strip_type", label: "Strip Type", type: "hidden" },
  { name: "text", label: "Text", required: true },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Info", value: "info" },
      { label: "Warning", value: "warning" },
      { label: "Alert", value: "alert" }
    ]
  },
  { name: "icon_name", label: "Icon Name" },
  { name: "is_visible", label: "Visible", type: "select", options: trueFalseOptions }
];

function toRecords(source: unknown) {
  return (source ?? []) as Record<string, string | number | boolean | null>[];
}

export default async function AdminContentPage({ searchParams }: ContentPageProps) {
  const query = await searchParams;
  const locale = query.locale === "en" ? "en" : "cs";
  const returnPath = "/admin/content";

  const content = await getAdminContent(locale);

  const announcements = toRecords(content.announcements);
  const navigation = toRecords(content.navigation);
  const heroSlides = toRecords(content.heroSlides);
  const valueCards = toRecords(content.valueCards);
  const pages = toRecords(content.pageContent);
  const coaches = toRecords(content.coaches);
  const testimonials = toRecords(content.testimonials);
  const locations = toRecords(content.locations);
  const events = toRecords(content.events);
  const faqs = toRecords(content.faqs);
  const pricing = toRecords(content.pricing);
  const schedule = toRecords(content.schedule);
  const glossary = toRecords(content.glossary);
  const documents = toRecords(content.documents);
  const footerLinks = toRecords(content.footerLinks);
  const socialLinks = toRecords(content.socialLinks);
  const settings = toRecords(content.settings);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl">Content Manager</h1>
          <p className="text-sm text-muted">Editing locale: {locale.toUpperCase()}</p>
        </div>
        <LocaleAdminSwitcher locale={locale} path="/admin/content" />
      </div>

      <Section
        title="Top Strips"
        description="Recruitment strip and optional info/warning strip."
      >
        {announcements.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "announcement-" + index)}
            title={"Strip: " + String(record.strip_type)}
            table="announcements"
            returnPath={returnPath}
            fields={announcementFields}
            record={{ ...record, locale }}
          />
        ))}
      </Section>

      <Section title="Navigation" description="Navbar links and CTA button.">
        {navigation
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "nav-" + index)}
              title={"Nav item " + String(index + 1)}
              table="navigation_items"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "label", label: "Label", required: true },
                { name: "href", label: "Href", required: true },
                { name: "order_index", label: "Order", type: "number" },
                { name: "is_cta", label: "Is CTA", type: "select", options: trueFalseOptions }
              ]}
              record={{ ...record, locale }}
              compact
            />
          ))}
      </Section>

      <Section title="Homepage Hero" description="Hero slides with images and CTA labels/links.">
        {heroSlides
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "hero-" + index)}
              title={"Hero slide " + String(index + 1)}
              table="hero_slides"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "title", label: "Title", required: true },
                { name: "subtitle", label: "Subtitle", type: "textarea" },
                { name: "image_url", label: "Image URL", type: "url", required: true },
                { name: "primary_cta_label", label: "Primary CTA Label" },
                { name: "primary_cta_href", label: "Primary CTA Href" },
                { name: "secondary_cta_label", label: "Secondary CTA Label" },
                { name: "secondary_cta_href", label: "Secondary CTA Href" },
                { name: "order_index", label: "Order", type: "number" },
                { name: "is_active", label: "Active", type: "select", options: trueFalseOptions }
              ]}
              record={{ ...record, locale }}
            />
          ))}
      </Section>

      <Section title="Homepage Value Cards" description="Card grid entries on homepage.">
        {valueCards
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "card-" + index)}
              title={"Card " + String(index + 1)}
              table="value_cards"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "card_key", label: "Card Key", required: true },
                { name: "title", label: "Title", required: true },
                { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
                { name: "hover_text", label: "Hover Paragraph", type: "textarea" },
                { name: "image_url", label: "Image URL", type: "url", required: true },
                {
                  name: "action_type",
                  label: "Click Action",
                  type: "select",
                  options: [
                    { label: "Modal", value: "modal" },
                    { label: "Link", value: "link" }
                  ]
                },
                { name: "href", label: "Link URL (used when action = link)" },
                { name: "modal_title", label: "Modal Title" },
                { name: "modal_body", label: "Modal Body", type: "textarea" },
                { name: "modal_image_url", label: "Modal Image URL", type: "url" },
                { name: "modal_image_url_secondary", label: "Modal Secondary Image URL", type: "url" },
                { name: "order_index", label: "Order", type: "number" }
              ]}
              record={{ ...record, locale }}
            />
          ))}
      </Section>

      <Section title="Pages" description="Localized content and SEO for all public pages.">
        {pages.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "page-" + index)}
            title={"Page: " + String(record.page_key)}
            table="pages"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key", type: "hidden" },
              { name: "title", label: "Title", required: true },
              { name: "subtitle", label: "Subtitle" },
              { name: "intro", label: "Intro", type: "textarea" },
              { name: "body_markdown", label: "Body Markdown", type: "textarea" },
              { name: "seo_title", label: "SEO Title" },
              { name: "seo_description", label: "SEO Description", type: "textarea" },
              { name: "is_member_only", label: "Members Only", type: "select", options: trueFalseOptions }
            ]}
            record={{ ...record, locale }}
          />
        ))}
      </Section>

      <Section title="Coaches" description="Coach previews and profile details.">
        {coaches
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "coach-" + index)}
              title={"Coach " + String(index + 1)}
              table="coaches"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "slug", label: "Slug", required: true },
                { name: "name", label: "Name", required: true },
                { name: "rank_title", label: "Rank" },
                { name: "short_bio", label: "Short Bio", type: "textarea", required: true },
                { name: "long_bio", label: "Long Bio", type: "textarea" },
                { name: "image_url", label: "Image URL", type: "url", required: true },
                { name: "order_index", label: "Order", type: "number" }
              ]}
              record={{ ...record, locale }}
            />
          ))}
      </Section>

      <Section title="Testimonials" description="Editable testimonial quotes.">
        {testimonials
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "testimonial-" + index)}
              title={"Testimonial " + String(index + 1)}
              table="testimonials"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "quote", label: "Quote", type: "textarea", required: true },
                { name: "author_name", label: "Author", required: true },
                { name: "author_role", label: "Role" },
                { name: "order_index", label: "Order", type: "number" }
              ]}
              record={{ ...record, locale }}
              compact
            />
          ))}
      </Section>

      <Section title="Locations" description="Address cards and map iframe URLs.">
        {locations.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "location-" + index)}
            title={"Location " + String(index + 1)}
            table="locations"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "name", label: "Name", required: true },
              { name: "address", label: "Address", required: true },
              { name: "city", label: "City", required: true },
              { name: "map_embed_url", label: "Map Embed URL", type: "url" },
              { name: "notes", label: "Notes", type: "textarea" },
              { name: "is_primary", label: "Primary", type: "select", options: trueFalseOptions }
            ]}
            record={{ ...record, locale }}
          />
        ))}
      </Section>

      <Section title="Events" description="Upcoming events and optional links.">
        {events
          .sort((a, b) => Number(a.order_index ?? 0) - Number(b.order_index ?? 0))
          .map((record, index) => (
            <RecordEditor
              key={String(record.id ?? "event-" + index)}
              title={"Event " + String(index + 1)}
              table="events"
              returnPath={returnPath}
              fields={[
                { name: "locale", label: "Locale", type: "hidden" },
                { name: "title", label: "Title", required: true },
                { name: "starts_at", label: "Starts At (ISO)", required: true },
                { name: "ends_at", label: "Ends At (ISO)" },
                { name: "location_name", label: "Location" },
                { name: "summary", label: "Summary", type: "textarea" },
                { name: "href", label: "Link URL", type: "url" },
                { name: "order_index", label: "Order", type: "number" }
              ]}
              record={{ ...record, locale }}
            />
          ))}
      </Section>

      <Section
        title="Student and Beginner Data"
        description="FAQ, pricing, schedule, glossary, and documents."
      >
        {faqs.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "faq-" + index)}
            title={"FAQ " + String(index + 1)}
            table="faq_items"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key" },
              { name: "question", label: "Question", required: true },
              { name: "answer", label: "Answer", type: "textarea", required: true },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}

        {pricing.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "pricing-" + index)}
            title={"Pricing " + String(index + 1)}
            table="pricing_items"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key" },
              { name: "label", label: "Label", required: true },
              { name: "price_text", label: "Price", required: true },
              { name: "notes", label: "Notes", type: "textarea" },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}

        {schedule.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "schedule-" + index)}
            title={"Schedule Entry " + String(index + 1)}
            table="schedule_entries"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key" },
              { name: "day_of_week", label: "Day 0-6", type: "number" },
              { name: "start_time", label: "Start Time", required: true },
              { name: "end_time", label: "End Time", required: true },
              { name: "group_name", label: "Group", required: true },
              { name: "location_name", label: "Location", required: true },
              { name: "notes", label: "Notes", type: "textarea" },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}

        {glossary.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "term-" + index)}
            title={"Glossary " + String(index + 1)}
            table="glossary_terms"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key" },
              { name: "term", label: "Term", required: true },
              { name: "translation", label: "Translation", required: true },
              { name: "description", label: "Description", type: "textarea" },
              { name: "category", label: "Category" },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}

        {documents.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "doc-" + index)}
            title={"Document " + String(index + 1)}
            table="documents"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "page_key", label: "Page Key" },
              { name: "title", label: "Title", required: true },
              { name: "description", label: "Description", type: "textarea" },
              { name: "file_url", label: "File URL", type: "url", required: true }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}
      </Section>

      <Section title="Footer and Site Settings" description="Footer links, social links, and global settings.">
        {footerLinks.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "footer-" + index)}
            title={"Footer Link " + String(index + 1)}
            table="footer_links"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "hidden" },
              { name: "label", label: "Label", required: true },
              { name: "href", label: "Href", required: true },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={{ ...record, locale }}
            compact
          />
        ))}

        {socialLinks.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "social-" + index)}
            title={"Social Link " + String(index + 1)}
            table="social_links"
            returnPath={returnPath}
            fields={[
              { name: "platform", label: "Platform", required: true },
              { name: "href", label: "Href", required: true },
              { name: "order_index", label: "Order", type: "number" }
            ]}
            record={record}
            compact
          />
        ))}

        {settings.map((record, index) => (
          <RecordEditor
            key={String(record.id ?? "setting-" + index)}
            title={"Setting: " + String(record.setting_key)}
            table="site_settings"
            returnPath={returnPath}
            fields={[
              { name: "locale", label: "Locale", type: "text" },
              { name: "setting_key", label: "Setting Key", required: true },
              { name: "setting_value", label: "Setting Value", type: "textarea", required: true }
            ]}
            record={record}
            compact
          />
        ))}
      </Section>
    </div>
  );
}
