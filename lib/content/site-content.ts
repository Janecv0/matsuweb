import type { Locale } from "@/lib/types";
import type { SiteContent } from "@/lib/content/site-content-types";

const cs: SiteContent = {
  announcement: "🥋 Nábor otevřen — přijďte na první hodinu zdarma",
  nav: {
    home: "Domů",
    about: "O nás",
    start: "Chci začít",
    students: "Pro studenty",
    contact: "Kontakty",
    members: "Členská sekce",
    enrollCta: "Přihlásit dítě"
  },
  hero: {
    badge: "🏵️ Rodinný klub od roku 1990",
    title: "Karate pro celou vaši rodinu",
    subtitle:
      "Přátelské tréninky pro děti i dospělé — budujeme sebevědomí, respekt a dobré kamarády na celý život.",
    primaryCta: { label: "Vyzkoušet zdarma", target: "start-here" },
    secondaryCta: { label: "Poznat klub", target: "about" },
    photoNote: "foto: děti a trenér, vřelý tón"
  },
  values: {
    title: "Proč rodiny volí Matsu",
    subtitle: "Šest věcí, na kterých nám záleží nejvíc",
    cards: [
      { key: "smysl", title: "sMYSL", text: "Klid a soustředění, které si děti odnesou i do školy." },
      { key: "tradice", title: "Tradice", text: "Přes 30 let zkušeností s výukou dětí i dospělých." },
      { key: "sebeobrana", title: "Sebeobrana", text: "Praktické dovednosti přizpůsobené věku a úrovni." },
      { key: "praxe", title: "Praxe", text: "Pravidelný rozvrh, tábory a společné akce." },
      { key: "my", title: "MY", text: "Komunita rodičů a dětí, co drží pohromadě." },
      { key: "zacit", title: "Začít", text: "Napište nám a domluvíme první zkušební hodinu.", cta: true }
    ]
  },
  familyBand: {
    title: "Jsme tu pro celé rodiny",
    body:
      "Od roku 1990 provázíme děti i dospělé cestou karate — s trpělivostí, úsměvem a respektem ke každému tempu.",
    ctaLabel: "Poznat náš tým"
  },
  testimonials: {
    title: "Co říkají rodiče",
    items: [
      {
        quote: "„Syn chodí na Matsu už tři roky a je to ta nejlepší volba, co jsme udělali.“",
        author: "Petra, maminka"
      },
      {
        quote: "„Trenéři mají obrovskou trpělivost i s nejmenšími dětmi.“",
        author: "Martin, tatínek"
      }
    ]
  },
  about: {
    eyebrow: "O klubu",
    title: "Malý klub, velká rodina",
    intro:
      "Karate Klub Matsu vznikl v roce 1990 a od té doby vychoval stovky karatistů — od dětí po dospělé.",
    club: {
      title: "Náš klub",
      body:
        "Trénujeme tradiční styl karate s důrazem na charakter, respekt a bezpečné prostředí pro děti i dospělé. Skupiny dělíme podle věku a úrovně, aby si každý našel svoje tempo."
    },
    history: {
      title: "Naše historie",
      entries: [
        { year: "1990", text: "Založení klubu v tělocvičně ZŠ Menšíkova." },
        { year: "2004", text: "Otevření dětské skupiny a rozšíření rozvrhu." },
        { year: "2015", text: "Přes 100 aktivních členů, nová tělocvična." },
        { year: "2026", text: "36 let tradice, tři generace jedné rodiny." }
      ]
    },
    trainers: {
      title: "Naši trenéři",
      items: [
        { name: "Petr Novák", rank: "4. dan", bio: "Hlavní trenér, v klubu od založení v roce 1990." },
        { name: "Jana Dvořáková", rank: "2. dan", bio: "Vede dětské skupiny a přípravu na zkoušky." },
        { name: "Tomáš Král", rank: "3. dan", bio: "Sebeobrana a kondiční příprava dospělých." }
      ]
    }
  },
  startHere: {
    eyebrow: "Chci začít",
    title: "První hodina je vždy zdarma",
    intro:
      "Přijďte se nezávazně podívat na trénink. Vezměte pohodlné oblečení, o zbytek se postaráme.",
    steps: {
      title: "Jak začít — 3 kroky",
      items: [
        { title: "Vyplňte formulář", text: "Napište nám pár informací o sobě nebo dítěti." },
        { title: "Domluvíme termín", text: "Ozveme se do 2 dnů a vybereme vhodnou hodinu." },
        { title: "Přijďte trénovat", text: "První hodina zdarma, bez závazků." }
      ]
    },
    pricing: {
      title: "Ceník",
      tiers: [
        { name: "Děti", price: "890 Kč", unit: "/měsíc", note: "2× týdně, 6–14 let" },
        { name: "Dospělí", price: "1090 Kč", unit: "/měsíc", note: "2× týdně, 15+ let" },
        { name: "Rodinné", price: "1690 Kč", unit: "/měsíc", note: "2 a více členů rodiny", highlight: true }
      ]
    },
    faq: {
      title: "Časté dotazy",
      items: [
        {
          q: "Od kolika let mohou děti začít?",
          a: "Přijímáme děti od 6 let, mladší po individuální domluvě."
        },
        {
          q: "Potřebuji vlastní kimono?",
          a: "Na první hodiny stačí sportovní oblečení, kimono doporučujeme po rozhodnutí pokračovat."
        },
        {
          q: "Jak často se trénuje?",
          a: "Standardně 2× týdně, pokročilí mají možnost i třetí tréninkový den."
        }
      ]
    },
    formTitle: "Nezávazná přihláška"
  },
  students: {
    eyebrow: "Pro studenty",
    title: "Vše, co student Matsu potřebuje vědět",
    tabs: ["Zkušební řád", "Slovníček", "Etiketa", "Etika"],
    examRules: {
      title: "Zkušební řád",
      columns: ["Stupeň", "Požadavky", "Min. praxe"],
      rows: [
        { level: "9. kyu", requirements: "Základní postoje a údery", practice: "3 měsíce" },
        { level: "8. kyu", requirements: "Kata Taikyoku 1", practice: "6 měsíců" },
        { level: "7. kyu", requirements: "Kata Taikyoku 2, základy kumite", practice: "9 měsíců" }
      ]
    },
    glossary: {
      title: "Slovníček pojmů",
      columns: ["Termín", "Překlad", "Význam"],
      rows: [
        { term: "Rei", translation: "Úklona", meaning: "Pozdrav vyjadřující respekt" },
        { term: "Kata", translation: "Forma", meaning: "Předepsaná sestava technik" },
        { term: "Kumite", translation: "Souboj", meaning: "Nácvik technik s partnerem" }
      ]
    },
    etiquette: {
      title: "Etiketa dojo",
      items: [
        "Úklona při vstupu a odchodu z tatami",
        "Čisté a upravené kimono",
        "Ticho a pozornost při výkladu trenéra",
        "Respekt ke starším pásům"
      ]
    },
    ethics: {
      title: "Etika (Dojo Kun)",
      items: [
        "Usilovat o dokonalost charakteru",
        "Být upřímný",
        "Rozvíjet úsilí",
        "Respektovat druhé",
        "Zdržet se násilného chování"
      ]
    },
    documents: {
      title: "Dokumenty ke stažení",
      items: [
        { label: "Zkušební řád 2026" },
        { label: "Přihláška člena" },
        { label: "Řád tělocvičny" }
      ]
    }
  },
  contact: {
    eyebrow: "Kontakty",
    title: "Ozvěte se nám",
    cards: [
      { title: "Tělocvična ZŠ Menšíkova", lines: ["Menšíkova 620, Praha 4"] },
      { title: "E-mail a telefon", lines: ["kolencik@gmail.com", "+420 777 123 456"] },
      { title: "Sítě", lines: ["Instagram · Facebook"] }
    ],
    mapEmbedUrl: "",
    mapLabel: "mapa: Google Maps"
  },
  members: {
    eyebrow: "Členská sekce",
    welcomePrefix: "Vítej zpět, ",
    subtitle: "Tvůj zkušební řád, materiály a příprava na zkoušky na jednom místě.",
    signOut: "Odhlásit se",
    loginPrompt: {
      title: "Přihlaste se do členské sekce",
      body: "Členská sekce je určena studentům klubu. Přihlaste se svým e-mailem a heslem.",
      cta: "Přihlásit se"
    },
    announcements: {
      title: "Oznámení",
      items: [
        { text: "Zkoušky na pásy se konají 14. 9. — přihlaste se u trenéra.", tone: "ember" },
        { text: "Letní tábor 2026: přihlášky spuštěny.", tone: "sage" }
      ]
    },
    quickRef: {
      examTitle: "Zkušební řád — rychlý přehled",
      examLines: ["9. kyu — základní postoje", "8. kyu — Taikyoku 1", "7. kyu — Taikyoku 2, kumite"],
      glossaryTitle: "Slovníček — rychlý přehled",
      glossaryLines: ["Rei — úklona", "Kata — forma", "Kumite — souboj"]
    },
    documents: {
      title: "Dokumenty",
      items: [
        { label: "Zkušební řád 2026" },
        { label: "Rozvrh podzim 2026" },
        { label: "Přihláška na tábor" }
      ]
    },
    checklist: {
      title: "Připravenost na zkoušky",
      intro:
        "Odškrtej si, co už umíš. Body označené trenérem potvrzuje tvůj učitel před přihlášením ke zkoušce.",
      memberBadge: "Odškrtáváš ty",
      teacherBadge: "Potvrzuje trenér",
      lockedHint: "Tento bod potvrzuje trenér.",
      levels: [
        {
          key: "9kyu",
          label: "9. kyu — bílý pás",
          items: [
            { key: "9kyu.attendance", label: "Odtrénováno min. 3 měsíce", checkableBy: "member" },
            { key: "9kyu.stances", label: "Základní postoje (zenkutsu, kiba dachi)", checkableBy: "member" },
            { key: "9kyu.strikes", label: "Základní údery a kryty", checkableBy: "member" },
            { key: "9kyu.etiquette", label: "Znalost etikety dojo", checkableBy: "member" },
            { key: "9kyu.approved", label: "Doporučení trenéra ke zkoušce", checkableBy: "teacher" }
          ]
        },
        {
          key: "8kyu",
          label: "8. kyu — žlutý pás",
          items: [
            { key: "8kyu.attendance", label: "Odtrénováno min. 6 měsíců", checkableBy: "member" },
            { key: "8kyu.kata", label: "Kata Taikyoku 1", checkableBy: "member" },
            { key: "8kyu.combos", label: "Základní kombinace v pohybu", checkableBy: "member" },
            { key: "8kyu.terms", label: "Japonské názvosloví 9.–8. kyu", checkableBy: "member" },
            { key: "8kyu.technique", label: "Technická úroveň ověřena trenérem", checkableBy: "teacher" },
            { key: "8kyu.approved", label: "Doporučení trenéra ke zkoušce", checkableBy: "teacher" }
          ]
        },
        {
          key: "7kyu",
          label: "7. kyu — oranžový pás",
          items: [
            { key: "7kyu.attendance", label: "Odtrénováno min. 9 měsíců", checkableBy: "member" },
            { key: "7kyu.kata", label: "Kata Taikyoku 2", checkableBy: "member" },
            { key: "7kyu.kumite", label: "Základy kumite (ippon kumite)", checkableBy: "member" },
            { key: "7kyu.terms", label: "Japonské názvosloví 7. kyu", checkableBy: "member" },
            { key: "7kyu.kumite_ok", label: "Kumite ověřeno trenérem", checkableBy: "teacher" },
            { key: "7kyu.approved", label: "Doporučení trenéra ke zkoušce", checkableBy: "teacher" }
          ]
        }
      ]
    },
    teacher: {
      panelTitle: "Trenérský panel",
      pickMember: "Vyber studenta",
      noMembers: "Zatím žádní studenti k zobrazení.",
      viewingLabel: "Zobrazuješ přípravu studenta:"
    }
  },
  footer: {
    tagline: "Tělocvična ZŠ Menšíkova, Praha",
    navLabel: "Navigace",
    socialLabel: "Sítě",
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" }
    ]
  }
};

const en: SiteContent = {
  announcement: "🥋 Enrollment open — come to your first lesson for free",
  nav: {
    home: "Home",
    about: "About",
    start: "Start here",
    students: "For students",
    contact: "Contact",
    members: "Members",
    enrollCta: "Enroll your child"
  },
  hero: {
    badge: "🏵️ A family club since 1990",
    title: "Karate for your whole family",
    subtitle:
      "Friendly training for children and adults — building confidence, respect and lifelong friendships.",
    primaryCta: { label: "Try for free", target: "start-here" },
    secondaryCta: { label: "Meet the club", target: "about" },
    photoNote: "photo: kids + coach smiling, warm tone"
  },
  values: {
    title: "Why families choose Matsu",
    subtitle: "The six things we care about most",
    cards: [
      { key: "smysl", title: "MIND", text: "Calm and focus that children carry into school and beyond." },
      { key: "tradice", title: "Tradition", text: "Over 30 years of experience teaching kids and adults." },
      { key: "sebeobrana", title: "Self-defence", text: "Practical skills adapted to age and level." },
      { key: "praxe", title: "Practice", text: "A regular schedule, camps and shared events." },
      { key: "my", title: "US", text: "A community of parents and children that sticks together." },
      { key: "zacit", title: "Start", text: "Message us and we'll arrange your first trial lesson.", cta: true }
    ]
  },
  familyBand: {
    title: "We're here for whole families",
    body:
      "Since 1990 we've guided children and adults along the karate path — with patience, a smile and respect for every pace.",
    ctaLabel: "Meet our team"
  },
  testimonials: {
    title: "What parents say",
    items: [
      {
        quote: "“Our son has trained at Matsu for three years and it's the best choice we've made.”",
        author: "Petra, mother"
      },
      {
        quote: "“The coaches have enormous patience even with the youngest children.”",
        author: "Martin, father"
      }
    ]
  },
  about: {
    eyebrow: "About the club",
    title: "A small club, a big family",
    intro:
      "Karate Klub Matsu was founded in 1990 and has since raised hundreds of karateka — from children to adults.",
    club: {
      title: "Our club",
      body:
        "We train a traditional style of karate with an emphasis on character, respect and a safe environment for children and adults. We split groups by age and level so everyone finds their own pace."
    },
    history: {
      title: "Our history",
      entries: [
        { year: "1990", text: "The club is founded in the Menšíkova primary-school gym." },
        { year: "2004", text: "A children's group opens and the schedule expands." },
        { year: "2015", text: "Over 100 active members and a new training hall." },
        { year: "2026", text: "36 years of tradition, three generations of one family." }
      ]
    },
    trainers: {
      title: "Our coaches",
      items: [
        { name: "Petr Novák", rank: "4th dan", bio: "Head coach, with the club since it was founded in 1990." },
        { name: "Jana Dvořáková", rank: "2nd dan", bio: "Leads the children's groups and exam preparation." },
        { name: "Tomáš Král", rank: "3rd dan", bio: "Self-defence and conditioning for adults." }
      ]
    }
  },
  startHere: {
    eyebrow: "Start here",
    title: "Your first lesson is always free",
    intro:
      "Come and watch a training session with no obligation. Bring comfortable clothes — we'll take care of the rest.",
    steps: {
      title: "How to start — 3 steps",
      items: [
        { title: "Fill in the form", text: "Send us a few details about yourself or your child." },
        { title: "We'll agree a date", text: "We reply within 2 days and pick a suitable lesson." },
        { title: "Come and train", text: "First lesson free, no strings attached." }
      ]
    },
    pricing: {
      title: "Pricing",
      tiers: [
        { name: "Children", price: "890 CZK", unit: "/month", note: "2× weekly, ages 6–14" },
        { name: "Adults", price: "1090 CZK", unit: "/month", note: "2× weekly, ages 15+" },
        { name: "Family", price: "1690 CZK", unit: "/month", note: "2 or more family members", highlight: true }
      ]
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "From what age can children start?",
          a: "We accept children from age 6; younger by individual arrangement."
        },
        {
          q: "Do I need my own gi?",
          a: "Sports clothing is enough for the first lessons; we recommend a gi once you decide to continue."
        },
        {
          q: "How often do you train?",
          a: "Typically 2× a week; advanced students can add a third training day."
        }
      ]
    },
    formTitle: "No-obligation application"
  },
  students: {
    eyebrow: "For students",
    title: "Everything a Matsu student needs to know",
    tabs: ["Exam rules", "Vocabulary", "Etiquette", "Ethics"],
    examRules: {
      title: "Examination rules",
      columns: ["Grade", "Requirements", "Min. practice"],
      rows: [
        { level: "9th kyu", requirements: "Basic stances and strikes", practice: "3 months" },
        { level: "8th kyu", requirements: "Kata Taikyoku 1", practice: "6 months" },
        { level: "7th kyu", requirements: "Kata Taikyoku 2, kumite basics", practice: "9 months" }
      ]
    },
    glossary: {
      title: "Glossary",
      columns: ["Term", "Translation", "Meaning"],
      rows: [
        { term: "Rei", translation: "Bow", meaning: "A greeting expressing respect" },
        { term: "Kata", translation: "Form", meaning: "A prescribed sequence of techniques" },
        { term: "Kumite", translation: "Sparring", meaning: "Practising techniques with a partner" }
      ]
    },
    etiquette: {
      title: "Dojo etiquette",
      items: [
        "Bow when entering and leaving the mat",
        "A clean and tidy gi",
        "Silence and attention during the coach's explanation",
        "Respect for higher belts"
      ]
    },
    ethics: {
      title: "Ethics (Dojo Kun)",
      items: [
        "Seek perfection of character",
        "Be sincere",
        "Put maximum effort into everything",
        "Respect others",
        "Refrain from violent behaviour"
      ]
    },
    documents: {
      title: "Documents to download",
      items: [
        { label: "Examination rules 2026" },
        { label: "Membership application" },
        { label: "Gym rules" }
      ]
    }
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    cards: [
      { title: "Menšíkova primary-school gym", lines: ["Menšíkova 620, Prague 4"] },
      { title: "Email and phone", lines: ["kolencik@gmail.com", "+420 777 123 456"] },
      { title: "Social", lines: ["Instagram · Facebook"] }
    ],
    mapEmbedUrl: "",
    mapLabel: "map: Google Maps"
  },
  members: {
    eyebrow: "Members",
    welcomePrefix: "Welcome back, ",
    subtitle: "Your exam rules, materials and exam preparation in one place.",
    signOut: "Sign out",
    loginPrompt: {
      title: "Sign in to the members area",
      body: "The members area is for club students. Sign in with your email and password.",
      cta: "Sign in"
    },
    announcements: {
      title: "Announcements",
      items: [
        { text: "Belt exams take place on 14 Sept — sign up with your coach.", tone: "ember" },
        { text: "Summer camp 2026: applications are open.", tone: "sage" }
      ]
    },
    quickRef: {
      examTitle: "Exam rules — quick overview",
      examLines: ["9th kyu — basic stances", "8th kyu — Taikyoku 1", "7th kyu — Taikyoku 2, kumite"],
      glossaryTitle: "Glossary — quick overview",
      glossaryLines: ["Rei — bow", "Kata — form", "Kumite — sparring"]
    },
    documents: {
      title: "Documents",
      items: [
        { label: "Examination rules 2026" },
        { label: "Autumn 2026 schedule" },
        { label: "Camp application" }
      ]
    },
    checklist: {
      title: "Exam readiness",
      intro:
        "Tick off what you can already do. Items marked for the coach are confirmed by your teacher before you sign up for the exam.",
      memberBadge: "You tick this",
      teacherBadge: "Coach confirms",
      lockedHint: "This item is confirmed by your coach.",
      levels: [
        {
          key: "9kyu",
          label: "9th kyu — white belt",
          items: [
            { key: "9kyu.attendance", label: "Trained for at least 3 months", checkableBy: "member" },
            { key: "9kyu.stances", label: "Basic stances (zenkutsu, kiba dachi)", checkableBy: "member" },
            { key: "9kyu.strikes", label: "Basic strikes and blocks", checkableBy: "member" },
            { key: "9kyu.etiquette", label: "Knows dojo etiquette", checkableBy: "member" },
            { key: "9kyu.approved", label: "Coach's recommendation for the exam", checkableBy: "teacher" }
          ]
        },
        {
          key: "8kyu",
          label: "8th kyu — yellow belt",
          items: [
            { key: "8kyu.attendance", label: "Trained for at least 6 months", checkableBy: "member" },
            { key: "8kyu.kata", label: "Kata Taikyoku 1", checkableBy: "member" },
            { key: "8kyu.combos", label: "Basic combinations in motion", checkableBy: "member" },
            { key: "8kyu.terms", label: "Japanese terminology 9th–8th kyu", checkableBy: "member" },
            { key: "8kyu.technique", label: "Technical level verified by coach", checkableBy: "teacher" },
            { key: "8kyu.approved", label: "Coach's recommendation for the exam", checkableBy: "teacher" }
          ]
        },
        {
          key: "7kyu",
          label: "7th kyu — orange belt",
          items: [
            { key: "7kyu.attendance", label: "Trained for at least 9 months", checkableBy: "member" },
            { key: "7kyu.kata", label: "Kata Taikyoku 2", checkableBy: "member" },
            { key: "7kyu.kumite", label: "Kumite basics (ippon kumite)", checkableBy: "member" },
            { key: "7kyu.terms", label: "Japanese terminology 7th kyu", checkableBy: "member" },
            { key: "7kyu.kumite_ok", label: "Kumite verified by coach", checkableBy: "teacher" },
            { key: "7kyu.approved", label: "Coach's recommendation for the exam", checkableBy: "teacher" }
          ]
        }
      ]
    },
    teacher: {
      panelTitle: "Coach panel",
      pickMember: "Choose a student",
      noMembers: "No students to show yet.",
      viewingLabel: "Viewing the preparation of:"
    }
  },
  footer: {
    tagline: "Menšíkova primary-school gym, Prague",
    navLabel: "Navigation",
    socialLabel: "Social",
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" }
    ]
  }
};

export const siteContent: Record<Locale, SiteContent> = { cs, en };

export function getSiteContent(locale: Locale): SiteContent {
  return siteContent[locale];
}

/** All checklist items across every level, flattened — used for validation and lookups. */
export function getChecklistItems(locale: Locale = "cs") {
  return siteContent[locale].members.checklist.levels.flatMap((level) => level.items);
}

/** Look up who is allowed to toggle a checklist item by its stable key. */
export function getChecklistItemRole(itemKey: string): "member" | "teacher" | null {
  const item = getChecklistItems("cs").find((entry) => entry.key === itemKey);
  return item?.checkableBy ?? null;
}
