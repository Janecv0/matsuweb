import { getPathForPage } from "@/lib/i18n";
import {
  Announcement,
  Coach,
  DocumentItem,
  EventItem,
  FaqItem,
  FooterLink,
  GlossaryTerm,
  HeroSlide,
  Locale,
  LocationItem,
  NavigationItem,
  PageContent,
  PricingItem,
  PublicContentBundle,
  ScheduleEntry,
  SiteSetting,
  SocialLink,
  Testimonial,
  ValueCard
} from "@/lib/types";

const photo = {
  hero: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1800&q=80",
  heroAlt: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1800&q=80",
  card1: "https://images.unsplash.com/photo-1528701800489-20be9c1f25f3?auto=format&fit=crop&w=900&q=80",
  card2: "https://images.unsplash.com/photo-1599058917213-7da9e4d0f9e0?auto=format&fit=crop&w=900&q=80",
  card3: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
  coach1: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=700&q=80",
  coach2: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=700&q=80"
};

function navigation(locale: Locale): NavigationItem[] {
  if (locale === "cs") {
    return [
      {
        id: "nav-cs-1",
        locale,
        label: "O nás",
        href: getPathForPage(locale, "about"),
        order_index: 1,
        is_cta: false
      },
      {
        id: "nav-cs-2",
        locale,
        label: "Chci začít",
        href: getPathForPage(locale, "start-here"),
        order_index: 2,
        is_cta: false
      },
      {
        id: "nav-cs-3",
        locale,
        label: "Pro studenty",
        href: getPathForPage(locale, "students"),
        order_index: 3,
        is_cta: false
      },
      {
        id: "nav-cs-4",
        locale,
        label: "Kontakty",
        href: getPathForPage(locale, "contact"),
        order_index: 4,
        is_cta: false
      },
      {
        id: "nav-cs-cta",
        locale,
        label: "Začít",
        href: getPathForPage(locale, "start-here"),
        order_index: 99,
        is_cta: true
      }
    ];
  }

  return [
    {
      id: "nav-en-1",
      locale,
      label: "About",
      href: getPathForPage(locale, "about"),
      order_index: 1,
      is_cta: false
    },
    {
      id: "nav-en-2",
      locale,
      label: "Start Here",
      href: getPathForPage(locale, "start-here"),
      order_index: 2,
      is_cta: false
    },
    {
      id: "nav-en-3",
      locale,
      label: "For Students",
      href: getPathForPage(locale, "students"),
      order_index: 3,
      is_cta: false
    },
    {
      id: "nav-en-4",
      locale,
      label: "Contact",
      href: getPathForPage(locale, "contact"),
      order_index: 4,
      is_cta: false
    },
    {
      id: "nav-en-cta",
      locale,
      label: "Join",
      href: getPathForPage(locale, "start-here"),
      order_index: 99,
      is_cta: true
    }
  ];
}

function announcements(locale: Locale): Announcement[] {
  return [
    {
      id: `announcement-${locale}-recruitment`,
      locale,
      strip_type: "recruitment",
      text: locale === "cs" ? "Nábor otevřen" : "Recruitment open",
      is_visible: true,
      variant: "info",
      icon_name: "megaphone"
    },
    {
      id: `announcement-${locale}-info`,
      locale,
      strip_type: "info",
      text: locale === "cs" ? "Dnes se necvičí - státní svátek" : "No training today - national holiday",
      is_visible: false,
      variant: "warning",
      icon_name: "triangle-alert"
    }
  ];
}

function heroSlides(locale: Locale): HeroSlide[] {
  if (locale === "cs") {
    return [
      {
        id: "hero-cs-1",
        locale,
        title: "Karate Klub Matsu",
        subtitle:
          "Tradiční karate pro děti, studenty i dospělé. Disciplína, respekt a síla komunity.",
        image_url: photo.hero,
        primary_cta_label: "Chci začít",
        primary_cta_href: getPathForPage(locale, "start-here"),
        secondary_cta_label: "Pro studenty",
        secondary_cta_href: getPathForPage(locale, "students"),
        order_index: 1,
        is_active: true
      },
      {
        id: "hero-cs-2",
        locale,
        title: "Cesta, která má smysl",
        subtitle: "Budujeme tělo, mysl i charakter skrze poctivý trénink.",
        image_url: photo.heroAlt,
        primary_cta_label: "Přijďte na trénink",
        primary_cta_href: getPathForPage(locale, "contact"),
        secondary_cta_label: "O nás",
        secondary_cta_href: getPathForPage(locale, "about"),
        order_index: 2,
        is_active: true
      }
    ];
  }

  return [
    {
      id: "hero-en-1",
      locale,
      title: "Karate Klub Matsu",
      subtitle:
        "Traditional karate for children, students and adults. Discipline, respect and community.",
      image_url: photo.hero,
      primary_cta_label: "Start Here",
      primary_cta_href: getPathForPage(locale, "start-here"),
      secondary_cta_label: "For Students",
      secondary_cta_href: getPathForPage(locale, "students"),
      order_index: 1,
      is_active: true
    },
    {
      id: "hero-en-2",
      locale,
      title: "A practice with meaning",
      subtitle: "We develop body, mind and character through steady training.",
      image_url: photo.heroAlt,
      primary_cta_label: "Visit a training",
      primary_cta_href: getPathForPage(locale, "contact"),
      secondary_cta_label: "About",
      secondary_cta_href: getPathForPage(locale, "about"),
      order_index: 2,
      is_active: true
    }
  ];
}

function valueCards(locale: Locale): ValueCard[] {
  const cardsCs = [
    ["meaning", "Smysl", "Karate jako dlouhodobá cesta, ne rychlý efekt.", photo.card1],
    ["tradition", "Tradice", "Respekt k učitelům, etiketa dojo a poctivá technika.", photo.card2],
    ["selfdefense", "Sebeobrana", "Praktické návyky pro bezpečný a klidný život.", photo.card3],
    ["practice", "Praxe", "Pravidelnost, koncentrace a kvalitní vedení tréninku.", photo.card1],
    ["community", "My", "Přátelský klub pro děti, rodiče, studenty i dospělé.", photo.card2],
    ["start", "Začít", "Bez obav. Přijďte si vyzkoušet první trénink.", photo.card3]
  ] as const;

  const cardsEn = [
    ["meaning", "Meaning", "Karate as a long-term path, not a quick shortcut.", photo.card1],
    ["tradition", "Tradition", "Respect, dojo etiquette and solid fundamentals.", photo.card2],
    ["selfdefense", "Self-defense", "Practical habits for confidence and safety.", photo.card3],
    ["practice", "Practice", "Consistency, focus and high-quality coaching.", photo.card1],
    ["community", "Community", "A welcoming club for children and adults alike.", photo.card2],
    ["start", "Start", "Join your first training with confidence.", photo.card3]
  ] as const;

  const source = locale === "cs" ? cardsCs : cardsEn;

  return source.map(([key, title, excerpt, image], index) => ({
    id: `value-${locale}-${key}`,
    locale,
    card_key: key,
    title,
    excerpt,
    image_url: image,
    href: key === "start" ? getPathForPage(locale, "start-here") : getPathForPage(locale, "about"),
    order_index: index + 1
  }));
}

function coaches(locale: Locale): Coach[] {
  if (locale === "cs") {
    return [
      {
        id: "coach-cs-1",
        locale,
        slug: "jan-novak",
        name: "Sensei Jan Novák",
        rank_title: "5. dan",
        short_bio: "Hlavní trenér klubu, vede metodiku pro děti i dospělé.",
        long_bio:
          "TODO: Doplňte plný profil trenéra. Tato sekce je připravená pro detailní medailonek včetně zkušeností a specializace.",
        image_url: photo.coach1,
        order_index: 1
      },
      {
        id: "coach-cs-2",
        locale,
        slug: "petra-horakova",
        name: "Senpai Petra Horáková",
        rank_title: "3. dan",
        short_bio: "Specializace na začátečníky, mládež a zkouškovou přípravu.",
        long_bio:
          "TODO: Doplňte plný profil trenérky. Sekce podporuje i odkazy na certifikace a tréninkovou historii.",
        image_url: photo.coach2,
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "coach-en-1",
      locale,
      slug: "jan-novak",
      name: "Sensei Jan Novak",
      rank_title: "5th dan",
      short_bio: "Head coach responsible for the club's methodology and standards.",
      long_bio:
        "TODO: Add full coach profile. This layout is ready for detailed biography and coaching background.",
      image_url: photo.coach1,
      order_index: 1
    },
    {
      id: "coach-en-2",
      locale,
      slug: "petra-horakova",
      name: "Senpai Petra Horakova",
      rank_title: "3rd dan",
      short_bio: "Focuses on beginner classes, youth development and grading prep.",
      long_bio:
        "TODO: Add full coach profile. This section can include credentials and specializations.",
      image_url: photo.coach2,
      order_index: 2
    }
  ];
}

function testimonials(locale: Locale): Testimonial[] {
  if (locale === "cs") {
    return [
      {
        id: "testimonial-cs-1",
        locale,
        quote:
          "V klubu jsme našli bezpečné a kvalitní prostředí pro naše dítě. Tréninky mají řád i lidský přístup.",
        author_name: "Rodič člena",
        author_role: "Dětská skupina",
        order_index: 1
      },
      {
        id: "testimonial-cs-2",
        locale,
        quote:
          "Skvělá atmosféra a jasné vedení. Trénink mi pomohl zlepšit koncentraci i fyzičku.",
        author_name: "Student VŠ",
        author_role: null,
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "testimonial-en-1",
      locale,
      quote:
        "We found a safe, disciplined and welcoming place for our child. The coaching is consistent and respectful.",
      author_name: "Parent",
      author_role: "Children group",
      order_index: 1
    },
    {
      id: "testimonial-en-2",
      locale,
      quote:
        "Excellent training culture. It improved my focus, confidence and overall fitness.",
      author_name: "University student",
      author_role: null,
      order_index: 2
    }
  ];
}

function locations(locale: Locale): LocationItem[] {
  return [
    {
      id: `location-${locale}-1`,
      locale,
      name: locale === "cs" ? "Hlavní dojo" : "Main dojo",
      address: "TODO: Ulice 123",
      city: locale === "cs" ? "Praha" : "Prague",
      map_embed_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.4349867373563!2d14.4378!3d50.0755",
      notes:
        locale === "cs"
          ? "TODO: Doplňte přesný popis vstupu do tělocvičny."
          : "TODO: Add exact entry instructions.",
      is_primary: true
    },
    {
      id: `location-${locale}-2`,
      locale,
      name: locale === "cs" ? "Vedlejší trénink" : "Secondary training hall",
      address: "TODO: Druhá adresa",
      city: locale === "cs" ? "Praha" : "Prague",
      map_embed_url: null,
      notes:
        locale === "cs"
          ? "TODO: Upřesněte dny, kdy se cvičí na této adrese."
          : "TODO: Add days for this location.",
      is_primary: false
    }
  ];
}

function events(locale: Locale): EventItem[] {
  return [
    {
      id: `event-${locale}-1`,
      locale,
      title: locale === "cs" ? "Seminář kata" : "Kata seminar",
      starts_at: "2026-05-10T09:00:00+02:00",
      ends_at: "2026-05-10T15:00:00+02:00",
      location_name: locale === "cs" ? "Hlavní dojo" : "Main dojo",
      summary:
        locale === "cs"
          ? "TODO: Doplňte popis semináře, hosta a registrace."
          : "TODO: Add seminar details, guest and registration info.",
      href: null,
      order_index: 1
    },
    {
      id: `event-${locale}-2`,
      locale,
      title: locale === "cs" ? "Klubové zkoušky" : "Club grading",
      starts_at: "2026-06-08T17:00:00+02:00",
      ends_at: null,
      location_name: locale === "cs" ? "Hlavní dojo" : "Main dojo",
      summary:
        locale === "cs"
          ? "TODO: Podmínky účasti a termíny přihlášek."
          : "TODO: Participation conditions and deadline.",
      href: null,
      order_index: 2
    }
  ];
}

function pageContent(locale: Locale): PageContent[] {
  const cs: Record<PageContent["page_key"], Omit<PageContent, "id" | "locale" | "page_key">> = {
    home: {
      title: "Karate Klub Matsu",
      subtitle: "Tradiční karate, moderní vedení",
      intro:
        "Karate Klub Matsu rozvíjí charakter, pohyb i respekt. Tato sekce je připravená pro finální text klienta.",
      body_markdown: null,
      seo_title: "Karate Klub Matsu | Tradiční karate v Praze",
      seo_description: "Karate pro děti, studenty i dospělé. Přijďte na první trénink.",
      is_member_only: false
    },
    about: {
      title: "O nás",
      subtitle: "Klub, tradice, lidé",
      intro:
        "Spojujeme tradiční hodnoty karate s moderní pedagogikou. Připraveno pro přepsání finálním textem.",
      body_markdown:
        "## Klub\nTODO: Doplňte představení klubu.\n\n## Historie\nTODO: Doplňte milníky a časovou osu.\n\n## Komunita\nTODO: Doplňte, jak klub funguje pro rodiče, studenty a dospělé.",
      seo_title: "O nás | Karate Klub Matsu",
      seo_description: "Seznamte se s klubem, historií, trenéry a filosofií.",
      is_member_only: false
    },
    "about-club": {
      title: "Klub",
      subtitle: "Mise, hodnoty, identita",
      intro: "Co nás definuje jako dojo.",
      body_markdown:
        "## Mise\nTODO: Doplňte misi klubu.\n\n## Hodnoty\nTODO: Doplňte hodnoty a tréninkovou filozofii.",
      seo_title: "Klub | Karate Klub Matsu",
      seo_description: "Mise a tréninková filozofie klubu.",
      is_member_only: false
    },
    "about-history": {
      title: "Historie",
      subtitle: "Cesta klubu v čase",
      intro: "Připraveno pro časovou osu.",
      body_markdown:
        "## 2000-2010\nTODO: Začátky klubu.\n\n## 2011-2020\nTODO: Rozvoj členské základny.\n\n## 2021-dnes\nTODO: Současnost a směr.",
      seo_title: "Historie | Karate Klub Matsu",
      seo_description: "Milníky a tradice klubu.",
      is_member_only: false
    },
    "about-coaches": {
      title: "Trenéři",
      subtitle: "Lidé, kteří vedou cestu",
      intro: "Poznejte trenérský tým.",
      body_markdown: "TODO: Doplňte přístup trenérského týmu a kvalifikace.",
      seo_title: "Trenéři | Karate Klub Matsu",
      seo_description: "Detailní profily trenérů a jejich praxe.",
      is_member_only: false
    },
    "start-here": {
      title: "Chci začít",
      subtitle: "Vítejte mezi námi",
      intro:
        "Tady najdete vše pro první krok: co čekat, co si vzít a jak probíhá nábor.",
      body_markdown:
        "## Co čekat na prvním tréninku\nTODO: Přidejte konkrétní průběh první lekce.\n\n## Co s sebou\nSportovní oblečení, pití, ručník.\n\n## Proč začít u nás\nTODO: Doplňte 3-4 hlavní důvody.",
      seo_title: "Chci začít | Karate Klub Matsu",
      seo_description: "Vše pro začátečníky na jednom místě.",
      is_member_only: false
    },
    students: {
      title: "Pro studenty",
      subtitle: "Studijní a tréninkové materiály",
      intro: "Rozcestník pro zkušební řád, slovníček, etiketu a etiku.",
      body_markdown:
        "TODO: Doplňte úvodní text ke studentské sekci a navigační doporučení.",
      seo_title: "Pro studenty | Karate Klub Matsu",
      seo_description: "Veřejně dostupné studijní materiály pro studenty karate.",
      is_member_only: false
    },
    "students-examination-rules": {
      title: "Zkušební řád",
      subtitle: "Struktura a pravidla hodnocení",
      intro: "Přehled pravidel a požadavků pro jednotlivé stupně.",
      body_markdown:
        "## Obecná pravidla\nTODO: Doplňte znění pravidel.\n\n## Průběh zkoušky\nTODO: Doplňte průběh, kritéria a termíny.",
      seo_title: "Zkušební řád | Karate Klub Matsu",
      seo_description: "Pravidla zkoušek a požadavky na postup.",
      is_member_only: false
    },
    "students-vocabulary": {
      title: "Slovníček",
      subtitle: "Pojmy používané na tréninku",
      intro: "Rychlé vyhledávání japonských termínů.",
      body_markdown: "TODO: Přidejte metodiku práce se slovníčkem.",
      seo_title: "Slovníček | Karate Klub Matsu",
      seo_description: "Karate terminologie pro studenty.",
      is_member_only: false
    },
    "students-etiquette": {
      title: "Etiketa",
      subtitle: "Respekt v dojo",
      intro: "Základní pravidla chování před, během a po tréninku.",
      body_markdown:
        "## Před tréninkem\nTODO: Doplňte instrukce.\n\n## Během tréninku\nTODO: Doplňte instrukce.\n\n## Po tréninku\nTODO: Doplňte instrukce.",
      seo_title: "Etiketa | Karate Klub Matsu",
      seo_description: "Pravidla chování a respektu v dojo.",
      is_member_only: false
    },
    "students-ethics": {
      title: "Etika",
      subtitle: "Principy a hodnoty",
      intro: "Etické principy, na kterých stavíme trénink i komunitu.",
      body_markdown:
        "## Principy\nTODO: Doplňte principy dojo.\n\n## Odpovědnost\nTODO: Doplňte očekávání od studentů.",
      seo_title: "Etika | Karate Klub Matsu",
      seo_description: "Kodex hodnot a principů karate klubu.",
      is_member_only: false
    },
    contact: {
      title: "Kontakty",
      subtitle: "Rádi odpovíme",
      intro: "Napište nám nebo přijďte na ukázkový trénink.",
      body_markdown:
        "TODO: Doplňte telefon, e-mail, instrukce k příchodu a provozní poznámky.",
      seo_title: "Kontakty | Karate Klub Matsu",
      seo_description: "Kontaktujte Karate Klub Matsu.",
      is_member_only: false
    }
  };

  const en: Record<PageContent["page_key"], Omit<PageContent, "id" | "locale" | "page_key">> = {
    home: {
      title: "Karate Klub Matsu",
      subtitle: "Traditional karate, modern instruction",
      intro:
        "Karate Klub Matsu develops character, movement and respect. This section is ready for final client copy.",
      body_markdown: null,
      seo_title: "Karate Klub Matsu | Traditional karate in Prague",
      seo_description: "Karate for children, students and adults. Join your first training.",
      is_member_only: false
    },
    about: {
      title: "About",
      subtitle: "Club, tradition, people",
      intro:
        "We combine traditional karate values with modern teaching. Ready for final copy updates.",
      body_markdown:
        "## Club\nTODO: Add club overview.\n\n## History\nTODO: Add milestones and timeline.\n\n## Community\nTODO: Add details for families, students and adults.",
      seo_title: "About | Karate Klub Matsu",
      seo_description: "Learn about the club, history, coaches and philosophy.",
      is_member_only: false
    },
    "about-club": {
      title: "Club",
      subtitle: "Mission, values, identity",
      intro: "What defines us as a dojo.",
      body_markdown:
        "## Mission\nTODO: Add mission statement.\n\n## Values\nTODO: Add values and teaching philosophy.",
      seo_title: "Club | Karate Klub Matsu",
      seo_description: "Mission and training philosophy.",
      is_member_only: false
    },
    "about-history": {
      title: "History",
      subtitle: "Our path over time",
      intro: "Prepared for a timeline layout.",
      body_markdown:
        "## 2000-2010\nTODO: Early years.\n\n## 2011-2020\nTODO: Growth period.\n\n## 2021-now\nTODO: Current direction.",
      seo_title: "History | Karate Klub Matsu",
      seo_description: "Club milestones and tradition.",
      is_member_only: false
    },
    "about-coaches": {
      title: "Coaches",
      subtitle: "People who guide the path",
      intro: "Meet the coaching team.",
      body_markdown: "TODO: Add coaching approach and qualifications.",
      seo_title: "Coaches | Karate Klub Matsu",
      seo_description: "Detailed coach profiles and credentials.",
      is_member_only: false
    },
    "start-here": {
      title: "Start Here",
      subtitle: "Welcome to the dojo",
      intro:
        "Everything you need for your first step: what to expect, what to bring and how to join.",
      body_markdown:
        "## What to expect at first training\nTODO: Add first-lesson flow.\n\n## What to bring\nSportswear, water bottle, towel.\n\n## Why start with us\nTODO: Add 3-4 key reasons.",
      seo_title: "Start Here | Karate Klub Matsu",
      seo_description: "Beginner guide and first training information.",
      is_member_only: false
    },
    students: {
      title: "For Students",
      subtitle: "Learning and training resources",
      intro: "Hub for examination rules, vocabulary, etiquette and ethics.",
      body_markdown: "TODO: Add student hub introduction and guidance.",
      seo_title: "For Students | Karate Klub Matsu",
      seo_description: "Public learning resources for karate students.",
      is_member_only: false
    },
    "students-examination-rules": {
      title: "Examination Rules",
      subtitle: "Structure and grading requirements",
      intro: "Overview of exam rules for each grade.",
      body_markdown:
        "## General rules\nTODO: Add official wording.\n\n## Exam process\nTODO: Add process, criteria and deadlines.",
      seo_title: "Examination Rules | Karate Klub Matsu",
      seo_description: "Rules and grading requirements.",
      is_member_only: false
    },
    "students-vocabulary": {
      title: "Vocabulary",
      subtitle: "Terms used in training",
      intro: "Quick search through Japanese karate terms.",
      body_markdown: "TODO: Add guidance for using this glossary.",
      seo_title: "Vocabulary | Karate Klub Matsu",
      seo_description: "Karate terminology for students.",
      is_member_only: false
    },
    "students-etiquette": {
      title: "Etiquette",
      subtitle: "Respect in the dojo",
      intro: "Core behavior rules before, during and after class.",
      body_markdown:
        "## Before training\nTODO: Add instructions.\n\n## During training\nTODO: Add instructions.\n\n## After training\nTODO: Add instructions.",
      seo_title: "Etiquette | Karate Klub Matsu",
      seo_description: "Dojo etiquette and respect principles.",
      is_member_only: false
    },
    "students-ethics": {
      title: "Ethics",
      subtitle: "Principles and values",
      intro: "Ethical principles that guide our training and community.",
      body_markdown:
        "## Principles\nTODO: Add dojo principles.\n\n## Responsibility\nTODO: Add student expectations.",
      seo_title: "Ethics | Karate Klub Matsu",
      seo_description: "Club ethics and values.",
      is_member_only: false
    },
    contact: {
      title: "Contact",
      subtitle: "We are here to help",
      intro: "Send us a message or visit a trial training.",
      body_markdown:
        "TODO: Add phone, email, entry instructions and operation notes.",
      seo_title: "Contact | Karate Klub Matsu",
      seo_description: "Get in touch with Karate Klub Matsu.",
      is_member_only: false
    }
  };

  const source = locale === "cs" ? cs : en;

  return Object.entries(source).map(([key, value]) => ({
    id: `page-${locale}-${key}`,
    locale,
    page_key: key as PageContent["page_key"],
    ...value
  }));
}

function faqs(locale: Locale): FaqItem[] {
  if (locale === "cs") {
    return [
      {
        id: "faq-cs-1",
        locale,
        page_key: "start-here",
        question: "Mohu přijít bez předchozí zkušenosti?",
        answer: "Ano. Tréninky pro začátečníky jsou otevřené pro úplné nováčky.",
        order_index: 1
      },
      {
        id: "faq-cs-2",
        locale,
        page_key: "start-here",
        question: "Od kolika let přijímáte děti?",
        answer: "TODO: Doplňte minimální věk dle interních pravidel klubu.",
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "faq-en-1",
      locale,
      page_key: "start-here",
      question: "Can I join with no prior experience?",
      answer: "Yes. Beginner classes are open for complete newcomers.",
      order_index: 1
    },
    {
      id: "faq-en-2",
      locale,
      page_key: "start-here",
      question: "What is the minimum age for children?",
      answer: "TODO: Add the exact age policy used by the club.",
      order_index: 2
    }
  ];
}

function pricing(locale: Locale): PricingItem[] {
  if (locale === "cs") {
    return [
      {
        id: "pricing-cs-1",
        locale,
        page_key: "start-here",
        label: "Měsíční členství",
        price_text: "TODO: 1 500 Kč",
        notes: "Doplňte přesné podmínky a slevy.",
        order_index: 1
      },
      {
        id: "pricing-cs-2",
        locale,
        page_key: "start-here",
        label: "Ukázkový trénink",
        price_text: "Zdarma",
        notes: null,
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "pricing-en-1",
      locale,
      page_key: "start-here",
      label: "Monthly membership",
      price_text: "TODO: 1,500 CZK",
      notes: "Add exact conditions and discounts.",
      order_index: 1
    },
    {
      id: "pricing-en-2",
      locale,
      page_key: "start-here",
      label: "Trial training",
      price_text: "Free",
      notes: null,
      order_index: 2
    }
  ];
}

function schedule(locale: Locale): ScheduleEntry[] {
  if (locale === "cs") {
    return [
      {
        id: "schedule-cs-1",
        locale,
        page_key: "start-here",
        day_of_week: 1,
        start_time: "17:00",
        end_time: "18:00",
        group_name: "Děti začátečníci",
        location_name: "Hlavní dojo",
        notes: null,
        order_index: 1
      },
      {
        id: "schedule-cs-2",
        locale,
        page_key: "start-here",
        day_of_week: 3,
        start_time: "18:15",
        end_time: "19:30",
        group_name: "Studenti a dospělí",
        location_name: "Hlavní dojo",
        notes: "TODO: Doplňte úroveň skupiny.",
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "schedule-en-1",
      locale,
      page_key: "start-here",
      day_of_week: 1,
      start_time: "17:00",
      end_time: "18:00",
      group_name: "Children beginners",
      location_name: "Main dojo",
      notes: null,
      order_index: 1
    },
    {
      id: "schedule-en-2",
      locale,
      page_key: "start-here",
      day_of_week: 3,
      start_time: "18:15",
      end_time: "19:30",
      group_name: "Students and adults",
      location_name: "Main dojo",
      notes: "TODO: Add skill-level recommendation.",
      order_index: 2
    }
  ];
}

function glossary(locale: Locale): GlossaryTerm[] {
  if (locale === "cs") {
    return [
      {
        id: "glossary-cs-1",
        locale,
        page_key: "students-vocabulary",
        term: "Rei",
        translation: "Pozdrav",
        description: "Projev respektu před a po cvičení.",
        category: "Etiketa",
        order_index: 1
      },
      {
        id: "glossary-cs-2",
        locale,
        page_key: "students-vocabulary",
        term: "Kihon",
        translation: "Základní techniky",
        description: "Opakování základních postojů, bloků a úderů.",
        category: "Trénink",
        order_index: 2
      }
    ];
  }

  return [
    {
      id: "glossary-en-1",
      locale,
      page_key: "students-vocabulary",
      term: "Rei",
      translation: "Bow / respectful greeting",
      description: "Expression of respect before and after training.",
      category: "Etiquette",
      order_index: 1
    },
    {
      id: "glossary-en-2",
      locale,
      page_key: "students-vocabulary",
      term: "Kihon",
      translation: "Fundamentals",
      description: "Practice of basic stances, blocks and strikes.",
      category: "Training",
      order_index: 2
    }
  ];
}

function documents(locale: Locale): DocumentItem[] {
  return [
    {
      id: `doc-${locale}-1`,
      locale,
      page_key: "students-examination-rules",
      title: locale === "cs" ? "Zkušební řád PDF (ukázka)" : "Examination Rules PDF (sample)",
      description:
        locale === "cs"
          ? "TODO: Nahraďte odkazem na finální dokument."
          : "TODO: Replace with final document link.",
      file_url: "#"
    }
  ];
}

function footerLinks(locale: Locale): FooterLink[] {
  if (locale === "cs") {
    return [
      {
        id: "footer-cs-1",
        locale,
        label: "O nás",
        href: getPathForPage(locale, "about"),
        order_index: 1
      },
      {
        id: "footer-cs-2",
        locale,
        label: "Chci začít",
        href: getPathForPage(locale, "start-here"),
        order_index: 2
      },
      {
        id: "footer-cs-3",
        locale,
        label: "Kontakty",
        href: getPathForPage(locale, "contact"),
        order_index: 3
      }
    ];
  }

  return [
    {
      id: "footer-en-1",
      locale,
      label: "About",
      href: getPathForPage(locale, "about"),
      order_index: 1
    },
    {
      id: "footer-en-2",
      locale,
      label: "Start Here",
      href: getPathForPage(locale, "start-here"),
      order_index: 2
    },
    {
      id: "footer-en-3",
      locale,
      label: "Contact",
      href: getPathForPage(locale, "contact"),
      order_index: 3
    }
  ];
}

function socialLinks(): SocialLink[] {
  return [
    {
      id: "social-fb",
      platform: "Facebook",
      href: "https://facebook.com",
      order_index: 1
    },
    {
      id: "social-ig",
      platform: "Instagram",
      href: "https://instagram.com",
      order_index: 2
    }
  ];
}

function settings(locale: Locale): SiteSetting[] {
  return [
    {
      id: `setting-${locale}-logo`,
      locale,
      setting_key: "logo_url",
      setting_value: ""
    },
    {
      id: `setting-${locale}-logo-alt`,
      locale,
      setting_key: "logo_alt",
      setting_value:
        locale === "cs"
          ? "TODO: Nahraďte logem klubu ze současného webu"
          : "TODO: Replace with logo from current club website"
    },
    {
      id: `setting-${locale}-footer-contact`,
      locale,
      setting_key: "footer_contact",
      setting_value:
        locale === "cs"
          ? "TODO: klub@matsu.cz | +420 000 000 000"
          : "TODO: club@matsu.cz | +420 000 000 000"
    },
    {
      id: `setting-${locale}-hero-photo-credit`,
      locale,
      setting_key: "hero_photo_credit",
      setting_value:
        locale === "cs"
          ? "TODO: Nahraďte vlastními fotografiemi klubu."
          : "TODO: Replace with original club photography."
    },
    {
      id: `setting-${locale}-calendar`,
      locale,
      setting_key: "google_calendar_embed_url",
      setting_value: ""
    }
  ];
}

export function getFallbackContent(locale: Locale): PublicContentBundle {
  return {
    announcements: announcements(locale),
    navigation: navigation(locale),
    heroSlides: heroSlides(locale),
    valueCards: valueCards(locale),
    coaches: coaches(locale),
    testimonials: testimonials(locale),
    locations: locations(locale),
    events: events(locale),
    pageContent: pageContent(locale),
    faqs: faqs(locale),
    pricing: pricing(locale),
    schedule: schedule(locale),
    glossary: glossary(locale),
    documents: documents(locale),
    footerLinks: footerLinks(locale),
    socialLinks: socialLinks(),
    settings: settings(locale)
  };
}
