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
      {
        key: "smysl",
        title: "sMYSL",
        text: "Klid a soustředění, které si děti odnesou i do školy.",
        hover: "Trénink mysli je stejně důležitý jako trénink těla — soustředění, sebeovládání, práce s dechem.",
        modalBody: [
          "V Matsu chápeme karate jako cestu (dó), ne jen jako sport. Každý trénink začíná a končí zklidněním mysli.",
          "Děti se učí soustředit se na jednu věc, zvládat trému i frustraci a nést odpovědnost za své jednání. Tyto dovednosti si odnášejí do školy i do života.",
          "Pravidelná praxe rozvíjí trpělivost a pokoru — hodnoty, které dnešní svět často opomíjí."
        ]
      },
      {
        key: "tradice",
        title: "Tradice",
        text: "Přes 30 let zkušeností s výukou dětí i dospělých.",
        hover: "Navazujeme na odkaz tradičního karate předávaný z mistra na žáka už od roku 1990.",
        modalBody: [
          "Karate Klub Matsu vznikl v roce 1990 a od té doby zůstává věrný tradičnímu pojetí karate.",
          "Naši trenéři prošli stejnou cestou jako dnešní žáci — od bílého pásu po černý — a předávají dál nejen techniku, ale i etiketu a hodnoty dojo.",
          "Tradice pro nás neznamená strnulost. Znamená pevné základy, na kterých stavíme moderní a bezpečný trénink."
        ]
      },
      {
        key: "sebeobrana",
        title: "Sebeobrana",
        text: "Praktické dovednosti přizpůsobené věku a úrovni.",
        hover: "Učíme reálnou sebeobranu — jak předejít konfliktu i jak se ubránit, když je to nutné.",
        modalBody: [
          "Sebeobrana v Matsu vychází z karate, ale je doplněná o praktické situace z běžného života.",
          "Děti se učí rozpoznat nebezpečí, říct si o pomoc a bránit se šikaně. Dospělí trénují techniky pro reálné situace.",
          "Vše probíhá v bezpečném prostředí a s ohledem na věk a schopnosti každého cvičence."
        ]
      },
      {
        key: "praxe",
        title: "Praxe",
        text: "Pravidelný rozvrh, tábory a společné akce.",
        hover: "Trénujeme 2× týdně, pořádáme soustředění, letní tábory a přátelské turnaje.",
        modalBody: [
          "Pravidelnost je klíč. Standardně trénujeme dvakrát týdně, pokročilí mají možnost třetího tréninku.",
          "Během roku pořádáme víkendová soustředění, letní tábor a přátelská setkání s dalšími kluby.",
          "Zkoušky na vyšší pásy probíhají dvakrát ročně a jsou pro žáky důležitým milníkem."
        ]
      },
      {
        key: "my",
        title: "MY",
        text: "Komunita rodičů a dětí, co drží pohromadě.",
        hover: "Nejsme jen klub — jsme parta lidí, kteří si pomáhají na tatami i mimo něj.",
        modalBody: [
          "Matsu je malý rodinný klub, kde se všichni znají jménem.",
          "Rodiče nejsou jen diváci — zapojují se do akcí, výletů a života klubu. Starší žáci pomáhají mladším.",
          "Věříme, že nejlepší motivací je dobrá parta, se kterou se člověk těší na každý trénink."
        ]
      },
      {
        key: "zacit",
        title: "Začít",
        text: "Napište nám a domluvíme první zkušební hodinu.",
        hover: "První hodina je vždy zdarma a nezávazná — stačí přijít v pohodlném oblečení.",
        modalBody: [
          "Začít je jednoduché. Vyplňte přihlášku nebo nám napište a domluvíme termín první ukázkové hodiny.",
          "První trénink je zdarma a k ničemu vás nezavazuje. Stačí sportovní oblečení, o zbytek se postaráme.",
          "Přijímáme děti od 6 let i dospělé bez omezení věku. Těšíme se na vás!"
        ],
        cta: true
      }
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
        { year: "1990", text: "Založení klubu v tělocvičně ZŠ Mendíků." },
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
      { title: "Tělocvična ZŠ Mendíků", lines: ["Mendíků 1, Praha 4 – Nusle"] },
      { title: "E-mail a telefon", lines: ["kolencik@gmail.com", "+420 777 123 456"] },
      { title: "Sítě", lines: ["Instagram · Facebook"] }
    ],
    mapEmbedUrl: "https://mapy.com/s/pegegujudu",
    mapLabel: "mapa: Mapy.com"
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
    tagline: "Tělocvična ZŠ Mendíků, Praha 4",
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
      {
        key: "smysl",
        title: "MIND",
        text: "Calm and focus that children carry into school and beyond.",
        hover: "Training the mind matters as much as training the body — focus, self-control and breathing.",
        modalBody: [
          "At Matsu we see karate as a way (dō), not just a sport. Every session begins and ends by settling the mind.",
          "Children learn to focus on one thing, to handle nerves and frustration, and to take responsibility for their actions — skills they carry into school and life.",
          "Regular practice builds patience and humility, values today's world often overlooks."
        ]
      },
      {
        key: "tradice",
        title: "Tradition",
        text: "Over 30 years of experience teaching kids and adults.",
        hover: "We carry on the legacy of traditional karate, passed from master to student since 1990.",
        modalBody: [
          "Karate Klub Matsu was founded in 1990 and has stayed true to a traditional approach ever since.",
          "Our coaches walked the same path as today's students — from white belt to black — and pass on not only technique but the etiquette and values of the dojo.",
          "Tradition doesn't mean rigidity. It means solid foundations on which we build modern, safe training."
        ]
      },
      {
        key: "sebeobrana",
        title: "Self-defence",
        text: "Practical skills adapted to age and level.",
        hover: "We teach real self-defence — how to avoid conflict, and how to protect yourself when you must.",
        modalBody: [
          "Self-defence at Matsu is rooted in karate but supplemented with practical, everyday situations.",
          "Children learn to recognise danger, ask for help and stand up to bullying. Adults train techniques for real situations.",
          "Everything happens in a safe environment, with respect for each student's age and ability."
        ]
      },
      {
        key: "praxe",
        title: "Practice",
        text: "A regular schedule, camps and shared events.",
        hover: "We train twice a week, with camps, seminars and friendly tournaments through the year.",
        modalBody: [
          "Consistency is key. We train twice a week as standard, with a third session available for advanced students.",
          "Through the year we run weekend seminars, a summer camp and friendly meet-ups with other clubs.",
          "Belt exams take place twice a year and are an important milestone for every student."
        ]
      },
      {
        key: "my",
        title: "US",
        text: "A community of parents and children that sticks together.",
        hover: "We're not just a club — we're a group of people who help each other on and off the mat.",
        modalBody: [
          "Matsu is a small family club where everyone knows each other by name.",
          "Parents aren't just spectators — they join in events, trips and the life of the club. Older students help the younger ones.",
          "We believe the best motivation is good company you look forward to training with."
        ]
      },
      {
        key: "zacit",
        title: "Start",
        text: "Message us and we'll arrange your first trial lesson.",
        hover: "Your first lesson is always free and no-obligation — just come in comfortable clothes.",
        modalBody: [
          "Getting started is easy. Fill in the form or message us and we'll arrange a first trial lesson.",
          "The first session is free and commits you to nothing. Bring sports clothing — we'll handle the rest.",
          "We welcome children from age 6 and adults of any age. We look forward to meeting you!"
        ],
        cta: true
      }
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
        { year: "1990", text: "The club is founded in the Mendíků primary-school gym." },
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
      { title: "Mendíků primary-school gym", lines: ["Mendíků 1, Prague 4 – Nusle"] },
      { title: "Email and phone", lines: ["kolencik@gmail.com", "+420 777 123 456"] },
      { title: "Social", lines: ["Instagram · Facebook"] }
    ],
    mapEmbedUrl: "https://mapy.com/s/pegegujudu",
    mapLabel: "map: Mapy.com"
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
    tagline: "Mendíků primary-school gym, Prague 4",
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
