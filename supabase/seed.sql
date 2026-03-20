-- Seed data for Karate Klub Matsu

insert into public.announcements (locale, strip_type, text, is_visible, variant, icon_name)
values
  ('cs', 'recruitment', 'Nábor otevřen', true, 'info', 'megaphone'),
  ('cs', 'info', 'Dnes se necvičí - státní svátek', false, 'warning', 'triangle-alert'),
  ('en', 'recruitment', 'Recruitment open', true, 'info', 'megaphone'),
  ('en', 'info', 'No training today - national holiday', false, 'warning', 'triangle-alert')
on conflict (locale, strip_type) do update set
  text = excluded.text,
  is_visible = excluded.is_visible,
  variant = excluded.variant,
  icon_name = excluded.icon_name;

insert into public.navigation_items (locale, label, href, order_index, is_cta)
values
  ('cs', 'O nás', '/cs/o-nas', 1, false),
  ('cs', 'Chci začít', '/cs/chci-zacit', 2, false),
  ('cs', 'Pro studenty', '/cs/pro-studenty', 3, false),
  ('cs', 'Kontakty', '/cs/kontakty', 4, false),
  ('cs', 'Začít', '/cs/chci-zacit', 99, true),
  ('en', 'About', '/en/about', 1, false),
  ('en', 'Start Here', '/en/start-here', 2, false),
  ('en', 'For Students', '/en/for-students', 3, false),
  ('en', 'Contact', '/en/contact', 4, false),
  ('en', 'Join', '/en/start-here', 99, true);

insert into public.hero_slides (locale, title, subtitle, image_url, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href, order_index, is_active)
values
  ('cs', 'Karate Klub Matsu', 'Tradiční karate pro děti, studenty i dospělé.', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1800&q=80', 'Chci začít', '/cs/chci-zacit', 'Pro studenty', '/cs/pro-studenty', 1, true),
  ('cs', 'Cesta, která má smysl', 'Budujeme tělo, mysl i charakter skrze poctivý trénink.', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1800&q=80', 'Přijďte na trénink', '/cs/kontakty', 'O nás', '/cs/o-nas', 2, true),
  ('en', 'Karate Klub Matsu', 'Traditional karate for children, students and adults.', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1800&q=80', 'Start Here', '/en/start-here', 'For Students', '/en/for-students', 1, true),
  ('en', 'A practice with meaning', 'We develop body, mind and character through steady training.', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1800&q=80', 'Visit a training', '/en/contact', 'About', '/en/about', 2, true);

insert into public.value_cards (
  locale,
  card_key,
  title,
  excerpt,
  hover_text,
  image_url,
  href,
  action_type,
  modal_title,
  modal_body,
  modal_image_url,
  modal_image_url_secondary,
  order_index
)
values
  ('cs', 'meaning', 'Smysl', 'Karate jako dlouhodobá cesta, ne rychlý efekt.', 'Disciplína, respekt a klid mysli rostou krok za krokem.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=900&q=80', '/cs/o-nas', 'modal', 'Smysl - detail', 'TODO: Doplňte detailní text k této kartě. Můžete přidat příběh, přístup trenérů, konkrétní přínosy i praktické ukázky z tréninku.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80', 1),
  ('cs', 'tradition', 'Tradice', 'Respekt, etiketa dojo a poctivá technika.', 'Navazujeme na dojo kulturu a ověřený způsob výuky.', 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=900&q=80', '/cs/o-nas#history', 'modal', 'Tradice - detail', 'TODO: Doplňte detailní text k této kartě. Můžete přidat příběh, přístup trenérů, konkrétní přínosy i praktické ukázky z tréninku.', 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80', 2),
  ('cs', 'selfdefense', 'Sebeobrana', 'Praktické návyky pro bezpečný život.', 'Budujeme jistotu, vnímání situace i zdravé sebevědomí.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80', '/cs/chci-zacit', 'modal', 'Sebeobrana - detail', 'TODO: Doplňte detailní text k této kartě. Můžete přidat příběh, přístup trenérů, konkrétní přínosy i praktické ukázky z tréninku.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80', 3),
  ('cs', 'practice', 'Praxe', 'Pravidelnost, koncentrace a kvalitní vedení.', 'Trénujeme s jasnou strukturou a průběžnou zpětnou vazbou.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=900&q=80', '/cs/chci-zacit', 'modal', 'Praxe - detail', 'TODO: Doplňte detailní text k této kartě. Můžete přidat příběh, přístup trenérů, konkrétní přínosy i praktické ukázky z tréninku.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80', 4),
  ('cs', 'community', 'My', 'Přátelský klub pro děti i dospělé.', null, 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=900&q=80', '/cs/o-nas#club', 'link', null, null, null, null, 5),
  ('cs', 'start', 'Začít', 'Bez obav. Přijďte si vyzkoušet první trénink.', null, 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80', '/cs/chci-zacit', 'link', null, null, null, null, 6),
  ('en', 'meaning', 'Meaning', 'Karate as a long-term path.', 'Discipline, respect and calm focus are built over time.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=900&q=80', '/en/about', 'modal', 'Meaning - detail', 'TODO: Add detailed content for this card. You can include coaching approach, real training examples and practical outcomes.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80', 1),
  ('en', 'tradition', 'Tradition', 'Respect, dojo etiquette and fundamentals.', 'Our training follows proven principles with modern clarity.', 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=900&q=80', '/en/about#history', 'modal', 'Tradition - detail', 'TODO: Add detailed content for this card. You can include coaching approach, real training examples and practical outcomes.', 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80', 2),
  ('en', 'selfdefense', 'Self-defense', 'Practical habits for confidence.', 'We build situational awareness and steady decision-making.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80', '/en/start-here', 'modal', 'Self-defense - detail', 'TODO: Add detailed content for this card. You can include coaching approach, real training examples and practical outcomes.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80', 3),
  ('en', 'practice', 'Practice', 'Consistency, focus and quality coaching.', 'Every class has structure, progression and clear feedback.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=900&q=80', '/en/start-here', 'modal', 'Practice - detail', 'TODO: Add detailed content for this card. You can include coaching approach, real training examples and practical outcomes.', 'https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80', 4),
  ('en', 'community', 'Community', 'A welcoming club for families.', null, 'https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=900&q=80', '/en/about#club', 'link', null, null, null, null, 5),
  ('en', 'start', 'Start', 'Join your first training with confidence.', null, 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80', '/en/start-here', 'link', null, null, null, null, 6)
on conflict (locale, card_key) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  hover_text = excluded.hover_text,
  image_url = excluded.image_url,
  href = excluded.href,
  action_type = excluded.action_type,
  modal_title = excluded.modal_title,
  modal_body = excluded.modal_body,
  modal_image_url = excluded.modal_image_url,
  modal_image_url_secondary = excluded.modal_image_url_secondary,
  order_index = excluded.order_index;

insert into public.pages (locale, page_key, title, subtitle, intro, body_markdown, seo_title, seo_description, is_member_only)
values
  ('cs', 'home', 'Karate Klub Matsu', 'Tradiční karate, moderní vedení', 'Karate Klub Matsu rozvíjí charakter, pohyb i respekt.', null, 'Karate Klub Matsu | Tradiční karate v Praze', 'Karate pro děti, studenty i dospělé.', false),
  ('cs', 'about', 'O nás', 'Klub, tradice, lidé', 'Spojujeme tradiční hodnoty karate s moderní pedagogikou.', '## Klub\nTODO: Doplňte představení klubu.\n\n## Historie\nTODO: Doplňte milníky a časovou osu.', 'O nás | Karate Klub Matsu', 'Seznamte se s klubem a jeho historií.', false),
  ('cs', 'about-club', 'Klub', 'Mise, hodnoty, identita', 'Co nás definuje jako dojo.', '## Mise\nTODO: Doplňte misi klubu.', 'Klub | Karate Klub Matsu', 'Mise a filozofie klubu.', false),
  ('cs', 'about-history', 'Historie', 'Cesta klubu v čase', 'Připraveno pro časovou osu.', '## 2000-2010\nTODO: Začátky klubu.\n\n## 2011-2020\nTODO: Rozvoj.', 'Historie | Karate Klub Matsu', 'Milníky a tradice klubu.', false),
  ('cs', 'about-coaches', 'Trenéři', 'Lidé, kteří vedou cestu', 'Poznejte trenérský tým.', 'TODO: Doplňte přístup trenérského týmu.', 'Trenéři | Karate Klub Matsu', 'Trenérské profily.', false),
  ('cs', 'start-here', 'Chci začít', 'Vítejte mezi námi', 'Vše pro první krok na jednom místě.', '## Co čekat na prvním tréninku\nTODO: Doplňte průběh.', 'Chci začít | Karate Klub Matsu', 'Průvodce pro začátečníky.', false),
  ('cs', 'students', 'Pro studenty', 'Studijní a tréninkové materiály', 'Rozcestník pro studentské materiály.', 'TODO: Doplňte úvodní text.', 'Pro studenty | Karate Klub Matsu', 'Materiály pro studenty karate.', false),
  ('cs', 'students-examination-rules', 'Zkušební řád', 'Struktura a pravidla hodnocení', 'Přehled pravidel a požadavků.', '## Obecná pravidla\nTODO: Doplňte text.', 'Zkušební řád | Karate Klub Matsu', 'Pravidla zkoušek.', false),
  ('cs', 'students-vocabulary', 'Slovníček', 'Pojmy používané na tréninku', 'Rychlé vyhledávání termínů.', 'TODO: Doplňte metodiku slovníčku.', 'Slovníček | Karate Klub Matsu', 'Terminologie karate.', false),
  ('cs', 'students-etiquette', 'Etiketa', 'Respekt v dojo', 'Pravidla chování v dojo.', '## Před tréninkem\nTODO: Doplňte instrukce.', 'Etiketa | Karate Klub Matsu', 'Pravidla etikety.', false),
  ('cs', 'students-ethics', 'Etika', 'Principy a hodnoty', 'Etické principy tréninku i komunity.', '## Principy\nTODO: Doplňte principy.', 'Etika | Karate Klub Matsu', 'Etické zásady klubu.', false),
  ('cs', 'contact', 'Kontakty', 'Rádi odpovíme', 'Napište nám nebo přijďte na ukázkový trénink.', 'TODO: Doplňte detailní kontakty.', 'Kontakty | Karate Klub Matsu', 'Kontakt na klub.', false),
  ('en', 'home', 'Karate Klub Matsu', 'Traditional karate, modern instruction', 'Karate Klub Matsu develops character, movement and respect.', null, 'Karate Klub Matsu | Traditional karate in Prague', 'Karate for children, students and adults.', false),
  ('en', 'about', 'About', 'Club, tradition, people', 'We combine traditional karate values with modern teaching.', '## Club\nTODO: Add club overview.\n\n## History\nTODO: Add milestones.', 'About | Karate Klub Matsu', 'Meet the club and its history.', false),
  ('en', 'about-club', 'Club', 'Mission, values, identity', 'What defines us as a dojo.', '## Mission\nTODO: Add mission.', 'Club | Karate Klub Matsu', 'Mission and philosophy.', false),
  ('en', 'about-history', 'History', 'Our path over time', 'Prepared for a timeline layout.', '## 2000-2010\nTODO: Early years.', 'History | Karate Klub Matsu', 'Club milestones.', false),
  ('en', 'about-coaches', 'Coaches', 'People who guide the path', 'Meet the coaching team.', 'TODO: Add coaching approach.', 'Coaches | Karate Klub Matsu', 'Coaching profiles.', false),
  ('en', 'start-here', 'Start Here', 'Welcome to the dojo', 'Everything for your first step in one place.', '## What to expect\nTODO: Add first lesson flow.', 'Start Here | Karate Klub Matsu', 'Beginner onboarding.', false),
  ('en', 'students', 'For Students', 'Learning and training resources', 'Student hub for reference materials.', 'TODO: Add student hub intro.', 'For Students | Karate Klub Matsu', 'Public learning resources.', false),
  ('en', 'students-examination-rules', 'Examination Rules', 'Structure and grading requirements', 'Overview of exam requirements.', '## General rules\nTODO: Add wording.', 'Examination Rules | Karate Klub Matsu', 'Exam rules and requirements.', false),
  ('en', 'students-vocabulary', 'Vocabulary', 'Terms used in training', 'Quick search through terminology.', 'TODO: Add glossary guidance.', 'Vocabulary | Karate Klub Matsu', 'Karate terminology.', false),
  ('en', 'students-etiquette', 'Etiquette', 'Respect in the dojo', 'Core behavior principles in dojo.', '## Before training\nTODO: Add guidance.', 'Etiquette | Karate Klub Matsu', 'Etiquette principles.', false),
  ('en', 'students-ethics', 'Ethics', 'Principles and values', 'Ethical principles guiding our community.', '## Principles\nTODO: Add principles.', 'Ethics | Karate Klub Matsu', 'Ethical code.', false),
  ('en', 'contact', 'Contact', 'We are here to help', 'Send us a message or visit a trial training.', 'TODO: Add final contact details.', 'Contact | Karate Klub Matsu', 'Contact details.', false)
on conflict (locale, page_key) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  intro = excluded.intro,
  body_markdown = excluded.body_markdown,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_member_only = excluded.is_member_only;

insert into public.coaches (locale, slug, name, rank_title, short_bio, long_bio, image_url, order_index)
values
  ('cs', 'jan-novak', 'Sensei Jan Novák', '5. dan', 'Hlavní trenér klubu.', 'TODO: Doplňte detailní profil trenéra.', 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=700&q=80', 1),
  ('cs', 'petra-horakova', 'Senpai Petra Horáková', '3. dan', 'Specializace na začátečníky.', 'TODO: Doplňte detailní profil trenérky.', 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=700&q=80', 2),
  ('en', 'jan-novak', 'Sensei Jan Novak', '5th dan', 'Head coach of the club.', 'TODO: Add full profile details.', 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=700&q=80', 1),
  ('en', 'petra-horakova', 'Senpai Petra Horakova', '3rd dan', 'Focuses on beginners and youth.', 'TODO: Add full profile details.', 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=700&q=80', 2);

insert into public.testimonials (locale, quote, author_name, author_role, order_index)
values
  ('cs', 'V klubu jsme našli bezpečné a kvalitní prostředí pro naše dítě.', 'Rodič člena', 'Dětská skupina', 1),
  ('cs', 'Skvělá atmosféra a jasné vedení.', 'Student VŠ', null, 2),
  ('en', 'We found a safe and respectful place for our child.', 'Parent', 'Children group', 1),
  ('en', 'Excellent training culture and coaching.', 'University student', null, 2);

insert into public.locations (locale, name, address, city, map_embed_url, notes, is_primary)
values
  ('cs', 'Hlavní dojo', 'TODO: Ulice 123', 'Praha', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.4349867373563!2d14.4378!3d50.0755', 'TODO: Doplňte pokyny k příchodu.', true),
  ('cs', 'Vedlejší trénink', 'TODO: Druhá adresa', 'Praha', null, 'TODO: Doplňte dny tréninku.', false),
  ('en', 'Main dojo', 'TODO: Street 123', 'Prague', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.4349867373563!2d14.4378!3d50.0755', 'TODO: Add entry instructions.', true),
  ('en', 'Secondary hall', 'TODO: Secondary address', 'Prague', null, 'TODO: Add training days.', false);

insert into public.events (locale, title, starts_at, ends_at, location_name, summary, href, order_index)
values
  ('cs', 'Seminář kata', '2026-05-10T09:00:00+02:00', '2026-05-10T15:00:00+02:00', 'Hlavní dojo', 'TODO: Popis semináře a registrace.', null, 1),
  ('cs', 'Klubové zkoušky', '2026-06-08T17:00:00+02:00', null, 'Hlavní dojo', 'TODO: Podmínky účasti.', null, 2),
  ('en', 'Kata seminar', '2026-05-10T09:00:00+02:00', '2026-05-10T15:00:00+02:00', 'Main dojo', 'TODO: Seminar description and registration.', null, 1),
  ('en', 'Club grading', '2026-06-08T17:00:00+02:00', null, 'Main dojo', 'TODO: Participation requirements.', null, 2);

insert into public.faq_items (locale, page_key, question, answer, order_index)
values
  ('cs', 'start-here', 'Mohu přijít bez zkušenosti?', 'Ano, tréninky pro začátečníky jsou otevřené pro nováčky.', 1),
  ('cs', 'start-here', 'Od kolika let přijímáte děti?', 'TODO: Doplňte minimální věk.', 2),
  ('en', 'start-here', 'Can I join with no prior experience?', 'Yes, beginner classes are open to newcomers.', 1),
  ('en', 'start-here', 'What is the minimum age?', 'TODO: Add exact age policy.', 2);

insert into public.pricing_items (locale, page_key, label, price_text, notes, order_index)
values
  ('cs', 'start-here', 'Měsíční členství', 'TODO: 1 500 Kč', 'Doplňte přesné podmínky.', 1),
  ('cs', 'start-here', 'Ukázkový trénink', 'Zdarma', null, 2),
  ('en', 'start-here', 'Monthly membership', 'TODO: 1,500 CZK', 'Add exact conditions.', 1),
  ('en', 'start-here', 'Trial training', 'Free', null, 2);

insert into public.schedule_entries (locale, page_key, day_of_week, start_time, end_time, group_name, location_name, notes, order_index)
values
  ('cs', 'start-here', 1, '17:00', '18:00', 'Děti začátečníci', 'Hlavní dojo', null, 1),
  ('cs', 'start-here', 3, '18:15', '19:30', 'Studenti a dospělí', 'Hlavní dojo', 'TODO: Doplňte úroveň skupiny.', 2),
  ('en', 'start-here', 1, '17:00', '18:00', 'Children beginners', 'Main dojo', null, 1),
  ('en', 'start-here', 3, '18:15', '19:30', 'Students and adults', 'Main dojo', 'TODO: Add level recommendation.', 2);

insert into public.glossary_terms (locale, page_key, term, translation, description, category, order_index)
values
  ('cs', 'students-vocabulary', 'Rei', 'Pozdrav', 'Projev respektu před a po cvičení.', 'Etiketa', 1),
  ('cs', 'students-vocabulary', 'Kihon', 'Základní techniky', 'Opakování základních postojů a úderů.', 'Trénink', 2),
  ('en', 'students-vocabulary', 'Rei', 'Bow / respectful greeting', 'Expression of respect before and after training.', 'Etiquette', 1),
  ('en', 'students-vocabulary', 'Kihon', 'Fundamentals', 'Practice of basic stances, blocks and strikes.', 'Training', 2);

insert into public.documents (locale, page_key, title, description, file_url)
values
  ('cs', 'students-examination-rules', 'Zkušební řád PDF (ukázka)', 'TODO: Nahraďte finálním dokumentem.', '#'),
  ('en', 'students-examination-rules', 'Examination Rules PDF (sample)', 'TODO: Replace with final document.', '#');

insert into public.footer_links (locale, label, href, order_index)
values
  ('cs', 'O nás', '/cs/o-nas', 1),
  ('cs', 'Chci začít', '/cs/chci-zacit', 2),
  ('cs', 'Kontakty', '/cs/kontakty', 3),
  ('en', 'About', '/en/about', 1),
  ('en', 'Start Here', '/en/start-here', 2),
  ('en', 'Contact', '/en/contact', 3);

insert into public.social_links (platform, href, order_index)
values
  ('Facebook', 'https://facebook.com', 1),
  ('Instagram', 'https://instagram.com', 2)
on conflict do nothing;

insert into public.site_settings (locale, setting_key, setting_value)
values
  ('cs', 'logo_url', ''),
  ('en', 'logo_url', ''),
  ('cs', 'logo_alt', 'TODO: Nahraďte logem klubu ze současného webu'),
  ('en', 'logo_alt', 'TODO: Replace with logo from current club website'),
  ('cs', 'footer_contact', 'TODO: klub@matsu.cz | +420 000 000 000'),
  ('en', 'footer_contact', 'TODO: club@matsu.cz | +420 000 000 000'),
  ('cs', 'google_calendar_embed_url', ''),
  ('en', 'google_calendar_embed_url', ''),
  ('cs', 'hero_photo_credit', 'TODO: Nahraďte vlastními fotografiemi klubu.'),
  ('en', 'hero_photo_credit', 'TODO: Replace with original club photography.'),
  ('cs', 'about_club_image_url', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=80'),
  ('en', 'about_club_image_url', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=80'),
  ('cs', 'about_history_image_url', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1400&q=80'),
  ('en', 'about_history_image_url', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1400&q=80')
on conflict (locale, setting_key) do update set
  setting_value = excluded.setting_value;

-- After creating your first admin user in Supabase Auth, grant role:
-- insert into public.user_roles (user_id, role)
-- values ('YOUR_AUTH_USER_UUID', 'admin')
-- on conflict do nothing;
