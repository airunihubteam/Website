import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { accelerator, catalogPath, conferences, findConference, findProgram, programs, type CatalogItem } from "@/content/catalog";
import {
  aboutParagraphs,
  joinDetails,
  joinNote,
  aiEn,
  aiHe,
  chairLine,
  communityEn,
  communityHe,
  homeAboutCount,
  internshipEn,
  internshipHe,
  joins,
  pitchIntro,
  pitchStages,
  reichmanQuote,
  stats,
  type JoinSlug,
} from "@/content/copy";
import { aboutGroups, advisoryTeam, peopleByIds, peopleIn, personMedia, pitchTeam, type Person } from "@/content/people";
import { programDetails, type ProgramDetails } from "@/content/program-details";
import { TeamSection, type TeamLabels, type TeamMember } from "@/components/about-team";
import { CardSlider } from "@/components/card-slider";
import { ClubSlider, type ClubSlide, type ClubSliderLabels } from "@/components/club-slider";
import { GatePanels, type GatePanel, type GatePanelsLabels } from "@/components/gate-panels";
import { Chevron } from "@/components/icons";
import { ImpactStats, JoinSection, type ImpactLabels, type ImpactStat, type JoinCard } from "@/components/impact-section";
import { RevealController, SectionRail, type RailSection } from "@/components/home-motion";
import { CatalogCard, PersonCard, Section, StarBullet } from "@/components/ui";
import { readableShade } from "@/lib/color";
import { pick, withLocale, type Locale, type Localized } from "@/lib/locale";

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

// Each gate's line is taken from copy that already appears on the site.
const gates: { href: string; title: Localized; summary: Localized; image: string }[] = [
  {
    href: "/programs",
    title: { he: "תוכניות", en: "Programs" },
    summary: { he: firstSentence(aboutParagraphs[5].he), en: firstSentence(aboutParagraphs[5].en ?? "") },
    image: "/media/wp/gate-programs.jpg",
  },
  {
    href: "/accelerator",
    title: { he: "אקסלרטור", en: "Accelerator" },
    summary: accelerator.summary,
    image: "/media/wp/gate-accelerator.jpg",
  },
  {
    href: "/conferences",
    title: { he: "כנסים", en: "Conferences" },
    summary: { he: conferences.map((item) => item.name.he).join(" · ") },
    image: "/media/wp/gate-conferences.jpg",
  },
  {
    href: "/pitch-night",
    title: { he: "Pitch Night", en: "Pitch Night" },
    summary: { he: firstSentence(pitchIntro.he), en: firstSentence(pitchIntro.en ?? "") },
    image: "/media/wp/gate-pitch.jpg",
  },
  {
    href: "/internship",
    title: { he: "מסלול לתעשייה", en: "Industry Internship" },
    summary: { he: internshipHe.body[0], en: internshipEn.body[0] },
    image: "/media/wp/gate-internship.jpg",
  },
];

const gatePanelsLabels: Record<Locale, GatePanelsLabels> = {
  he: { title: "מוקדי העיסוק שלנו", more: "לפרטים נוספים", close: "סגירה" },
  en: { title: "Our Activity Centers", more: "Read More", close: "Close" },
};

function gatePanels(locale: Locale): GatePanel[] {
  return gates.map((gate) => ({
    href: withLocale(gate.href, locale),
    title: pick(gate.title, locale) ?? gate.title.he,
    summary: pick(gate.summary, locale),
    image: gate.image,
  }));
}

const clubLogos = [
  { slug: "artemis", logo: "/media/wp/logos/artemis.png" },
  { slug: "m-club", logo: "/media/wp/logos/m-club.png" },
  { slug: "leaders", logo: "/media/wp/logos/leaders.png" },
  { slug: "greenbiz", logo: "/media/wp/logos/greenbiz.png" },
  { slug: "foodtech", logo: "/media/wp/logos/foodtech.png" },
  { slug: "impact", logo: "/media/wp/logos/impact.png" },
  { slug: "defense-tech", logo: "/media/wp/logos/defense-tech.png" },
  { slug: "tech-talk", logo: "/media/wp/logos/techtalk.png" },
  { slug: "pulse", logo: "/media/wp/logos/pulse.png" },
  { slug: "proptech", logo: "/media/wp/logos/proptech.png" },
  { slug: "product-hub", logo: "/media/wp/logos/product-hub.png" },
  { slug: "momentum", logo: "/media/wp/logos/momentum.jpg" },
];

const clubSliderLabels: Record<Locale, ClubSliderLabels> = {
  he: {
    title: "התוכניות שלנו",
    all: "לכל התוכניות",
    allHref: "/programs",
    open: "לעמוד התוכנית",
    of: "מתוך",
    goTo: "מעבר אל",
  },
  en: {
    title: "Our Programs",
    all: "All programs",
    allHref: "/en/programs",
    open: "View program",
    of: "of",
    goTo: "Go to",
  },
};

function clubSlides(locale: Locale): ClubSlide[] {
  return clubLogos.flatMap(({ slug, logo }) => {
    const item = slug === accelerator.slug ? accelerator : findProgram(slug);
    if (!item) return [];
    // English pages exist only for items with an English summary.
    const target = locale === "en" && !item.summary.en ? "he" : locale;
    const kind = item.kind === "accelerator" ? { he: "אקסלרטור", en: "Accelerator" } : { he: "תוכנית", en: "Program" };
    return [
      {
        slug,
        logo,
        name: pick(item.name, locale) ?? item.name.he,
        summary: pick(item.summary, locale),
        href: withLocale(catalogPath(item), target),
        kind: kind[locale],
      },
    ];
  });
}

const impactLabels: Record<Locale, ImpactLabels> = {
  he: { stats: "המועדון במספרים", join: "הצטרפו לעשייה" },
  en: { stats: "The Club in Numbers", join: "Get Involved" },
};

function impactStats(locale: Locale): ImpactStat[] {
  return stats.map((stat) => ({
    value: Number(stat.value),
    prefix: "suffix" in stat ? stat.suffix : undefined,
    label: pick(stat.label, locale) ?? stat.label.he,
  }));
}

// The join pages exist only in Hebrew, so English shows the numbers alone.
// The join pages exist only in Hebrew, so the English cards translate their lines and link there.
function joinCards(locale: Locale): JoinCard[] {
  const programNames = programs
    .slice(0, 5)
    .map((item) => pick(item.name, locale) ?? item.name.he)
    .join(" · ");
  if (locale === "en") {
    return [
      {
        href: "/join/chair",
        title: "Chair Search Committee",
        summary: "This is your chance to experience what it is like to run an organization with a budget of hundreds of thousands of shekels, and to impact more than 1,500 students.",
        cta: "Register",
        icon: "search",
      },
      { href: "/join/programs", title: "Program Management", summary: aboutParagraphs[6].en ?? aboutParagraphs[6].he, cta: "Register", icon: "checklist" },
      {
        href: "/join/new-program",
        title: "An Idea for a New Club",
        summary: "Have an idea for a new program within the Entrepreneurship Club? We would love to hear it.",
        cta: "Learn More",
        icon: "bulb",
      },
      { href: "/en/programs", title: "Our Programs", summary: `${programNames} and more`, cta: "All Programs", icon: "rocket", featured: true },
    ];
  }
  return [
    {
      href: "/join/chair",
      title: "ועדת האיתור לבחירת יו״ר",
      // The first two clauses of the chair page's pitch, so the card ends on a full stop.
      summary: `${(joins.chair.paragraphs[0].split(". ")[1] ?? joins.chair.paragraphs[0]).split(", ").slice(0, 2).join(", ")}.`,
      cta: "להרשמה",
      icon: "search",
    },
    { href: "/join/programs", title: "ניהול תוכניות", summary: aboutParagraphs[6].he, cta: "להרשמה", icon: "checklist" },
    { href: "/join/new-program", title: "רעיון למועדון חדש", summary: joins["new-program"].paragraphs[1], cta: "לפרטים", icon: "bulb" },
    {
      href: "/programs",
      title: "התוכניות שלנו",
      summary: `${programNames} ועוד`,
      cta: "לכל התוכניות",
      icon: "rocket",
      featured: true,
    },
  ];
}

const homeSections: Record<Locale, RailSection[]> = {
  he: [
    { id: "home", label: "ראשי" },
    { id: "numbers", label: "במספרים" },
    { id: "join", label: "הצטרפו" },
    { id: "about-us", label: "קצת עלינו" },
    { id: "activity", label: "מוקדי עיסוק" },
    { id: "our-programs", label: "התוכניות" },
    { id: "chair", label: "יו״ר המועדון" },
  ],
  en: [
    { id: "home", label: "Home" },
    { id: "numbers", label: "Numbers" },
    { id: "join", label: "Get Involved" },
    { id: "about-us", label: "About" },
    { id: "activity", label: "Activity" },
    { id: "our-programs", label: "Programs" },
    { id: "chair", label: "Chair" },
  ],
};

export function HomePage({ locale }: { locale: Locale }) {
  const dir = locale === "en" ? "ltr" : "rtl";
  return (
    <>
      <RevealController />
      <SectionRail sections={homeSections[locale]} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />
      <section id="home" className="relative -mt-[4.5rem] flex min-h-[100vh] items-center overflow-hidden">
        <Image
          src="/media/building.jpg"
          alt=""
          fill
          priority
          className="object-cover motion-safe:animate-[hero-zoom_3.2s_var(--ease)_both]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-club/60" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 max-md:text-center md:px-8">
          {/* The greeting is bold and the club's name regular. "Entrepreneurship" is too long a word
              for a 48px line on a phone, so the English headline scales with the screen width there. */}
          <h1
            className={`max-w-4xl leading-tight text-white md:text-[72px] md:leading-[1.15] ${
              locale === "en" ? "text-[clamp(1.75rem,9vw,3rem)]" : "text-5xl"
            }`}
          >
            <span className="block font-bold motion-safe:animate-[hero-rise_1.2s_var(--ease)_200ms_both]">
              {locale === "en" ? "Welcome to the" : "ברוכים הבאים"}
            </span>
            <span className="block font-normal motion-safe:animate-[hero-rise_1.2s_var(--ease)_380ms_both]">
              {locale === "en" ? "Entrepreneurship Club" : "למועדון היזמות"}
            </span>
          </h1>
          <Link
            href={withLocale("/programs", locale)}
            data-press
            className="mt-8 inline-block border border-white px-5 py-2 text-base text-white transition-colors duration-300 hover:bg-white hover:text-club motion-safe:animate-[hero-rise_1s_var(--ease)_650ms_both]"
          >
            {locale === "en" ? "Our programs" : "לתוכניות שלנו - לחצו כאן"}
          </Link>
        </div>
      </section>
      <div id="numbers" data-reveal className="scroll-mt-[4.5rem]">
        <ImpactStats stats={impactStats(locale)} label={impactLabels[locale].stats} />
      </div>
      <div id="join" data-reveal className="scroll-mt-[4.5rem]">
        <JoinSection cards={joinCards(locale)} title={impactLabels[locale].join} dir={dir} />
      </div>
      <section id="about-us" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-14 md:px-8">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{locale === "en" ? "About Us" : "קצת עלינו"}</span>
        </h2>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4 text-justify text-base leading-8 text-ink">
            {aboutParagraphs.slice(0, homeAboutCount).map((paragraph, index) => (
              <p key={paragraph.he} data-reveal-item={String(index + 1)}>
                {pick(paragraph, locale)}
              </p>
            ))}
            <div data-reveal-item={String(homeAboutCount + 1)} className="pt-2">
              <Link
                href={withLocale("/about", locale)}
                data-press
                className="group mx-auto flex w-fit items-center gap-2 border border-club px-5 py-2 text-sm font-semibold text-club transition-colors duration-300 hover:bg-club hover:text-white"
              >
                {locale === "en" ? "Read More" : "לפרטים נוספים"}
                <Chevron dir={locale === "en" ? "ltr" : "rtl"} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
          <div data-reveal-item="2" className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
            <Image src="/media/wp/about-team.jpg" alt={locale === "en" ? "Club students" : "סטודנטים במועדון היזמות"} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>
      <div id="activity" data-reveal className="scroll-mt-[4.5rem]">
        <GatePanels items={gatePanels(locale)} labels={gatePanelsLabels[locale]} dir={dir} />
      </div>
      <div id="our-programs" data-reveal className="scroll-mt-[4.5rem]">
        <ClubSlider slides={clubSlides(locale)} labels={clubSliderLabels[locale]} dir={dir} />
      </div>
      <section id="chair" data-reveal className="scroll-mt-[4.5rem] bg-gradient-to-b from-band to-club px-5 py-16 text-white md:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold">
            {locale === "en" ? "The Chairman" : "יו״ר המועדון"}
          </h2>
          <blockquote data-reveal-item="1" className="mt-8 text-lg leading-8">
            {pick(reichmanQuote, locale)}
          </blockquote>
          <p data-reveal-item="2" className="mt-6 font-medium">
            {pick(chairLine, locale)}
          </p>
        </div>
      </section>
    </>
  );
}

function teamMember(person: Person, locale: Locale, group?: string): TeamMember {
  const media = personMedia[person.id];
  return {
    id: person.id,
    name: pick(person.name, locale) ?? person.name.he,
    role: pick(person.role, locale) ?? person.role?.he,
    bio: pick(person.bio, locale),
    photo: media?.photo,
    position: media?.position,
    linkedin: media?.linkedin,
    group,
  };
}

const teamLabels: Record<Locale, TeamLabels> = {
  he: { title: "צוות הניהול", all: "כולם", profile: "פרטים נוספים" },
  en: { title: "The Management Team", all: "All", profile: "More details" },
};

const aboutSections: Record<Locale, RailSection[]> = {
  he: [
    { id: "about-top", label: "אודות" },
    { id: "story", label: "הסיפור שלנו" },
    { id: "about-numbers", label: "במספרים" },
    { id: "team", label: "הצוות" },
    { id: "advisory", label: "ועדה מייעצת" },
    { id: "partners", label: "שותפים" },
  ],
  en: [
    { id: "about-top", label: "About" },
    { id: "story", label: "Our Story" },
    { id: "about-numbers", label: "Numbers" },
    { id: "team", label: "The Team" },
    { id: "advisory", label: "Advisory" },
    { id: "partners", label: "Partners" },
  ],
};

// Three of the about paragraphs, each given a short title and an icon.
const aboutPillars: { title: Localized; text: Localized; icon: PillarIconName }[] = [
  { title: { he: "החזון שלנו", en: "Our Vision" }, text: aboutParagraphs[2], icon: "eye" },
  { title: { he: "המחויבות שלנו", en: "Our Commitment" }, text: aboutParagraphs[3], icon: "heart" },
  { title: { he: "מקום של חיבור", en: "A Place to Connect" }, text: aboutParagraphs[4], icon: "network" },
];

type PillarIconName = "eye" | "heart" | "network";

const PILLAR_FILL = "#dbe3ff";

// A large light-blue icon set beside the card's heading and cropped by the card's side edge.
// On hover it slides further into view and acts out its meaning: the eye blinks, the heart
// beats, and the network's nodes pulse one after another.
function PillarIcon({ name }: { name: PillarIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="pointer-events-none absolute -end-7 top-2 h-28 w-28 transition-[translate] duration-700 ltr:group-hover:-translate-x-3 rtl:group-hover:translate-x-3 ltr:group-data-active:-translate-x-3 rtl:group-data-active:translate-x-3"
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      {name === "eye" ? (
        <g className="origin-center motion-safe:group-hover:animate-[eye-blink_2.6s_ease-in-out_infinite] motion-safe:group-data-active:animate-[eye-blink_2.6s_ease-in-out_infinite]" style={{ transformBox: "fill-box" }}>
          <path d="M1.5 12C3.8 7.4 7.6 4.8 12 4.8s8.2 2.6 10.5 7.2c-2.3 4.6-6.1 7.2-10.5 7.2S3.8 16.6 1.5 12z" fill={PILLAR_FILL} />
          <circle cx="12" cy="12" r="3.9" fill="#ffffff" />
          <circle cx="12" cy="12" r="1.9" fill={PILLAR_FILL} />
        </g>
      ) : null}
      {name === "heart" ? (
        <path
          d="M12 21s-8.6-5.2-8.6-11.3A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 8.6 3.1C20.6 15.8 12 21 12 21z"
          fill={PILLAR_FILL}
          className="origin-center motion-safe:group-hover:animate-[heart-beat_1.4s_ease-in-out_infinite] motion-safe:group-data-active:animate-[heart-beat_1.4s_ease-in-out_infinite]"
          style={{ transformBox: "fill-box" }}
        />
      ) : null}
      {name === "network" ? (
        <>
          <path d="M5.5 6h13M5.5 6l6.5 12M18.5 6L12 18" fill="none" stroke={PILLAR_FILL} strokeWidth="1.8" strokeLinecap="round" />
          {[
            [5.5, 6],
            [18.5, 6],
            [12, 18],
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="3.2"
              fill={PILLAR_FILL}
              className="origin-center motion-safe:group-hover:animate-[node-pulse_1.8s_ease-in-out_infinite] motion-safe:group-data-active:animate-[node-pulse_1.8s_ease-in-out_infinite]"
              style={{ transformBox: "fill-box", animationDelay: `${index * 0.25}s` }}
            />
          ))}
        </>
      ) : null}
    </svg>
  );
}

const activityLinks = [
  { href: "/programs", label: { he: "תוכניות", en: "Programs" } },
  { href: "/conferences", label: { he: "כנסים", en: "Conferences" } },
  { href: "/accelerator", label: { he: "אקסלרטור", en: "Accelerator" } },
  { href: "/pitch-night", label: { he: "Pitch Night", en: "Pitch Night" } },
];

const academicPartners = [
  { he: "/brand/reichman-he-color.png", en: "/brand/reichman-en-color.png", width: 484, height: 163, name: { he: "בית הספר אדלסון ליזמות", en: "Adelson School of Entrepreneurship" } },
  { he: "/media/partners/sustainability.png", en: "/media/partners/sustainability.png", width: 526, height: 130, name: { he: "בית הספר לקיימות", en: "School of Sustainability" } },
  { he: "/media/partners/recanati.png", en: "/media/partners/recanati.png", width: 567, height: 150, name: { he: "בית הספר הבינלאומי רפאל רקנאטי", en: "Raphael Recanati International School" } },
];

export function AboutPage({ locale }: { locale: Locale }) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const groups = aboutGroups.map((group) => ({ key: group.key, label: pick(group.label, locale) ?? group.label.he }));
  const members = aboutGroups.flatMap((group) => peopleByIds(group.ids).map((person) => teamMember(person, locale, group.key)));
  const advisors = advisoryTeam().map((person) => teamMember(person, locale));

  return (
    <>
      <RevealController />
      <SectionRail sections={aboutSections[locale]} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      <PageBanner
        id="about-top"
        image="/media/building.jpg"
        locale={locale}
        title={locale === "en" ? "About" : "אודות"}
        subtitle={pick(aboutParagraphs[6], locale)}
      />

      <section id="story" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-6 md:px-8 md:pt-24 md:pb-10">
        <div className="grid items-center gap-9 md:gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p data-reveal-item="0" className="text-sm font-semibold text-club/60 ltr:tracking-[0.2em] ltr:uppercase">
              {locale === "en" ? "Our Story" : "הסיפור שלנו"}
            </p>
            <p data-reveal-item="1" className="mt-3 text-justify text-xl leading-[1.55] font-bold text-club md:text-[28px] md:leading-[1.5]">
              {pick(aboutParagraphs[0], locale)}
            </p>
            <p data-reveal-item="2" className="mt-4 text-justify text-base leading-7 text-ink md:mt-6 md:text-lg md:leading-8">
              {pick(aboutParagraphs[5], locale)}
            </p>
            <p data-reveal-item="3" className="mt-3 text-justify text-base leading-7 text-ink md:mt-4 md:text-lg md:leading-8">
              {pick(aboutParagraphs[1], locale)}
            </p>
            <div data-reveal-item="4" className="mt-6 flex flex-wrap gap-2">
              {activityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={withLocale(link.href, locale)}
                  data-press
                  className="group inline-flex items-center gap-1.5 border border-club/25 px-4 py-2 text-sm font-semibold text-club transition-colors duration-300 hover:border-club hover:bg-club hover:text-white"
                >
                  {pick(link.label, locale)}
                  <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
          <div data-reveal-item="2" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <span aria-hidden="true" className="absolute -end-4 -bottom-4 h-full w-full rounded-[28px] border-2 border-club/15" />
            <span aria-hidden="true" className="absolute -start-5 -top-5 h-24 w-24 rounded-[22px] bg-club/10" />
            <div className="group relative aspect-[16/10] overflow-hidden md:aspect-[5/4] rounded-[28px] shadow-[0_30px_60px_-30px_rgba(15,45,150,0.6)]">
              <Image
                src="/media/wp/about-team.jpg"
                alt={locale === "en" ? "Club students" : "סטודנטים במועדון היזמות"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-[scale] duration-[1400ms] group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <CardSlider
          titles={aboutPillars.map((pillar) => pick(pillar.title, locale) ?? pillar.title.he)}
          label={locale === "en" ? "Highlights" : "נקודות מרכזיות"}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-6 md:mt-20"
        >
          {aboutPillars.map((pillar, index) => (
            <article
              key={pillar.title.he}
              data-reveal-item={String(index + 4)}
              className="group relative isolate h-full overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white p-6 md:p-7 transition-[translate,box-shadow,border-color] duration-500 group-data-active:border-club/30 group-data-active:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)] hover:-translate-y-1 hover:border-club/30 hover:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)]"
            >
              <PillarIcon name={pillar.icon} />
              <h3 className="relative flex min-h-24 items-center pe-24 text-2xl font-bold text-club">{pick(pillar.title, locale)}</h3>
              <p className="relative mt-2 text-justify text-[15px] leading-7 text-ink/85">{pick(pillar.text, locale)}</p>
            </article>
          ))}
        </CardSlider>
      </section>

      <div id="about-numbers" data-reveal className="scroll-mt-[4.5rem]">
        <ImpactStats stats={impactStats(locale)} label={impactLabels[locale].stats} />
      </div>

      <section id="team" data-reveal className="scroll-mt-[4.5rem] bg-gradient-to-b from-white via-[#f5f7fd] to-white pt-10 pb-10 md:pt-16 md:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">{teamLabels[locale].title}</span>
          </h2>
          <TeamSection members={members} groups={groups} labels={teamLabels[locale]} dir={dir} />
        </div>
      </section>

      <section id="advisory" data-reveal className="scroll-mt-[4.5rem] py-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">{locale === "en" ? "Advisory Committee & Academic Support" : "ועדה מייעצת וליווי אקדמי"}</span>
          </h2>
          <TeamSection members={advisors} labels={teamLabels[locale]} dir={dir} variant="pair" />
        </div>
      </section>

      <section id="partners" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-2 pb-14 md:px-8 md:pt-4 md:pb-20">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{locale === "en" ? "Academic Partners" : "שותפים אקדמיים"}</span>
        </h2>
        <div className="mt-8 grid gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {academicPartners.map((partner, index) => (
            <a
              key={partner.he}
              href={locale === "en" ? "https://www.runi.ac.il/en/" : "https://www.runi.ac.il/"}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-item={String(index + 1)}
              className="group flex h-20 items-center justify-center rounded-[22px] border border-[#e6e9f5] bg-white px-5 sm:h-32 sm:px-6 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-club/30 hover:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)]"
            >
              {/* The logo is a mask filled with the club's blue, so all three share the site's color. */}
              <span
                role="img"
                aria-label={pick(partner.name, locale) ?? partner.name.he}
                className="block h-12 max-w-full bg-club transition-[scale,background-color] duration-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] group-hover:scale-[1.04] group-hover:bg-[#0a1f6e] sm:h-16"
                style={{
                  aspectRatio: `${partner.width} / ${partner.height}`,
                  maskImage: `url(${locale === "en" ? partner.en : partner.he})`,
                  transitionTimingFunction: "var(--ease)",
                }}
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

const programSections: Record<Locale, RailSection[]> = {
  he: [
    { id: "programs-top", label: "תוכניות" },
    { id: "catalog", label: "כל התוכניות" },
    { id: "join", label: "הצטרפו לעשייה" },
  ],
  en: [
    { id: "programs-top", label: "Programs" },
    { id: "catalog", label: "All Programs" },
    { id: "join", label: "Get Involved" },
  ],
};

// A program in the catalog: its photo under a wash of the program's own color that deepens to
// navy at the foot, with its logo, name, summary and a link to its page. Hover (or a tap on
// phones) zooms the photo, lets the color rise over it, stretches the accent line and fills the
// button with a shade of the program's color deep enough for its white label.
function ProgramCard({ item, logo, locale, dir, reveal }: { item: CatalogItem; logo?: string; locale: Locale; dir: "rtl" | "ltr"; reveal: number }) {
  const name = pick(item.name, locale) ?? item.name.he;
  const summary = pick(item.summary, locale);
  const target = locale === "en" && !item.summary.en ? "he" : locale;
  const tone = item.color ?? "#0f2d96";
  return (
    <Link
      href={withLocale(catalogPath(item), target)}
      data-press
      data-reveal-item={String(reveal)}
      className="group relative isolate flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-[24px] bg-[#061347] text-white shadow-[0_18px_40px_-28px_rgba(6,19,71,0.8)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(6,19,71,0.9)] sm:aspect-[4/5] sm:min-h-0"
      style={{ "--tone": tone, "--tone-deep": readableShade(tone), transitionTimingFunction: "var(--ease)" } as CSSProperties}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.07]"
        style={{ transitionTimingFunction: "var(--ease)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to top, #061347 0%, color-mix(in oklab, var(--tone) 70%, #061347) 38%, color-mix(in oklab, var(--tone) 50%, transparent) 62%, transparent 85%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to top, #061347 0%, color-mix(in oklab, var(--tone) 75%, #061347) 45%, color-mix(in oklab, var(--tone) 45%, transparent) 100%)",
        }}
      />
      {logo ? (
        <span className="absolute start-4 top-4 flex h-12 w-28 items-center justify-center rounded-xl bg-white px-3 shadow-[0_10px_24px_-12px_rgba(6,19,71,0.6)] transition-[translate] duration-500 group-hover:-translate-y-0.5">
          <span className="relative block h-full w-full">
            <Image src={logo} alt="" fill sizes="112px" className="object-contain py-2" />
          </span>
        </span>
      ) : null}
      <div className="p-6">
        <span aria-hidden="true" className="block h-[3px] w-10 bg-(--tone) transition-[width] duration-500 group-hover:w-16" style={{ transitionTimingFunction: "var(--ease)" }} />
        <h2 className="mt-3 text-2xl font-bold">{name}</h2>
        {summary ? <p className="mt-2 text-justify text-[15px] leading-6 text-white/90">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 border border-white/80 px-4 py-2 text-sm font-semibold transition-colors duration-300 group-hover:border-(--tone-deep) group-hover:bg-(--tone-deep)">
          {clubSliderLabels[locale].open}
          <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ProgramIndex({ locale }: { locale: Locale }) {
  const items = locale === "en" ? programs.filter((item) => item.summary.en) : programs;
  const dir = locale === "en" ? "ltr" : "rtl";
  const intro = pick(aboutParagraphs[5], locale) ?? "";
  const lead = firstSentence(intro);
  const logos = new Map(clubLogos.map((entry) => [entry.slug, entry.logo]));

  return (
    <>
      <RevealController />
      <SectionRail sections={programSections[locale]} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      <PageBanner
        id="programs-top"
        image="/media/wp/gate-programs.jpg"
        locale={locale}
        title={locale === "en" ? "Programs" : "תוכניות"}
        subtitle={intro.slice(lead.length).trim()}
      />

      <section id="catalog" className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-12 md:px-8 md:pt-20 md:pb-16">
        <div data-reveal>
          <p
            data-reveal-item="0"
            className="mx-auto max-w-3xl text-justify text-lg leading-8 font-bold text-club [text-align-last:center] md:text-2xl md:leading-[1.6]"
          >
            {lead}
          </p>
        </div>
        {/* Each card reveals as it scrolls into view, one column after another. On phones the twelve
            cards take turns in a slider instead of stacking into a long column. */}
        <CardSlider
          titles={items.map((item) => pick(item.name, locale) ?? item.name.he)}
          label={locale === "en" ? "All programs" : "כל התוכניות"}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-8 md:mt-12"
          grid="md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <div key={item.slug} data-reveal className="h-full">
              <ProgramCard item={item} logo={logos.get(item.slug)} locale={locale} dir={dir} reveal={(index % 3) + 1} />
            </div>
          ))}
        </CardSlider>
      </section>

      {/* The two ways into a program, as on the home page's "get involved" cards. */}
      <div id="join" data-reveal className="scroll-mt-[4.5rem]">
        <JoinSection
          cards={joinCards(locale).filter((card) => card.href === "/join/programs" || card.href === "/join/new-program")}
          title={impactLabels[locale].join}
          dir={dir}
        />
      </div>
    </>
  );
}

export function ProgramPage({ locale, slug }: { locale: Locale; slug: string }) {
  const item = findProgram(slug);
  if (!item || (locale === "en" && !item.summary.en)) notFound();
  const details = programDetails[slug];
  return details ? <ProgramDetailPage locale={locale} item={item} details={details} /> : <ItemPage locale={locale} item={item} />;
}

export function AcceleratorIndex({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero title={locale === "en" ? "Accelerator" : "אקסלרטור"} />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <CatalogCard item={accelerator} locale={locale === "en" ? "he" : locale} />
        </div>
      </Section>
    </>
  );
}

export function MomentumPage({ locale }: { locale: Locale }) {
  if (locale === "en") notFound();
  return <ItemPage locale="he" item={accelerator} />;
}

export function ConferenceIndex({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero title={locale === "en" ? "Conferences" : "כנסים"} />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {conferences.map((item) => (
            <CatalogCard key={item.slug} item={item} locale="he" />
          ))}
        </div>
      </Section>
    </>
  );
}

export function ConferencePage({ locale, slug }: { locale: Locale; slug: string }) {
  const item = findConference(slug);
  if (!item || locale === "en") notFound();
  return <ItemPage locale="he" item={item} />;
}

export function PitchPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero eyebrow="Entrepreneurship Club" title="Pitch Night" />
      <Section>
        <p className="max-w-3xl text-lg font-light leading-8 text-ink">{pick(pitchIntro, locale)}</p>
        <p className="mt-6 max-w-3xl text-lg font-light leading-8">Are You Ready to Pitch?</p>
        <a href="https://www.linkedin.com/company/ruec/" className="mt-6 inline-block border border-club px-5 py-3 text-sm font-extrabold tracking-[0.1em]" rel="noreferrer">
          Visit Our LinkedIn
        </a>
      </Section>
      <Section title="Our Competition Journey">
        <div className="grid gap-4">
          {pitchStages.map((stage) => (
            <article key={stage.title} className="border border-[#e6e6e6] bg-white p-5">
              <h3 className="text-2xl font-bold text-club">{stage.title}</h3>
              <p className="mt-3 text-base font-light leading-7 text-ink">{stage.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="The Pitch Night Team">
        <PeopleGrid people={pitchTeam} locale="en" />
      </Section>
    </>
  );
}

export function InternshipPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? internshipEn : internshipHe;
  return (
    <>
      <PageHero title={locale === "en" ? "Industry Internship" : "מסלול לתעשייה"} />
      <Section>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted">{copy.kicker}</p>
        <p className="mt-3 font-mono text-sm" dir="ltr">
          {copy.data}
        </p>
        <div className="mt-6 max-w-3xl space-y-4 text-lg font-light leading-8 text-ink">
          {copy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h2 className="mt-10 text-2xl font-bold tracking-[0.04em]">{copy.requirementsTitle}</h2>
        <ul className="mt-4 max-w-3xl space-y-3">
          {copy.requirements.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <StarBullet />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-2xl font-bold tracking-[0.04em]">{copy.moreTitle}</h2>
        <div className="mt-4 max-w-3xl space-y-3 text-ink">
          {copy.more.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        {locale === "he" ? <p className="mt-6">{internshipHe.manager}</p> : null}
      </Section>
      {locale === "he" ? (
        <Section title={internshipHe.quotesTitle}>
          <div className="grid gap-4">
            {internshipHe.quotes.map((item) => (
              <blockquote key={item.by} className="border border-[#e6e6e6] bg-white p-5">
                <p className="font-light leading-7 text-ink">{item.quote}</p>
                <footer className="mt-4 text-sm font-semibold tracking-[0.06em]">{item.by}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

export function CommunityPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? communityEn : communityHe;
  return (
    <>
      <PageHero title={copy.title} />
      <Section>
        <div className="max-w-3xl space-y-3 text-lg font-light leading-8 text-ink">
          {copy.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="border border-[#e6e6e6] bg-white p-5">
            <h2 className="text-2xl font-bold text-club">{copy.studentsTitle}</h2>
            {copy.students.map((paragraph) => (
              <p key={paragraph} className="mt-3 font-light leading-7 text-ink">
                {paragraph}
              </p>
            ))}
          </article>
          <article className="border border-[#e6e6e6] bg-white p-5">
            <h2 className="text-2xl font-bold text-club">{copy.alumniTitle}</h2>
            {copy.alumni.map((paragraph) => (
              <p key={paragraph} className="mt-3 font-light leading-7 text-ink">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </Section>
      <Section title={locale === "en" ? "Community Team" : "צוות הקהילה"}>
        <PeopleGrid people={peopleIn("community")} locale={locale} />
      </Section>
    </>
  );
}

export function AiPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? aiEn : aiHe;
  return (
    <>
      <PageHero title="AI" eyebrow={locale === "en" ? "Innovation & AI" : "מדור החדשנות וה-AI"} />
      <Section>
        <p className="max-w-3xl text-lg font-light leading-8 text-ink">{copy.intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.blocks.map((block) => (
            <article key={block.title} className="border border-[#e6e6e6] bg-white p-5">
              <h2 className="text-xl font-bold text-club">{block.title}</h2>
              <p className="mt-3 font-light leading-7 text-ink">{block.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title={locale === "en" ? "Who we are" : "מי אנחנו"}>
        <PeopleGrid people={peopleByIds(["nir-frost", "shay-taub", "yarin-layani", "tal-frankenthal"])} locale={locale} />
      </Section>
    </>
  );
}

const joinBanners: Record<JoinSlug, string> = {
  chair: "/media/wp/gate-pitch.jpg",
  programs: "/media/wp/about-team.jpg",
  "new-program": "/media/wp/gate-conferences.jpg",
};

// A small square check, filled in on hover.
function CheckBox() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-club/30 text-club transition-colors duration-300 group-hover:border-club group-hover:bg-club group-hover:text-white"
    >
      <svg viewBox="0 0 20 20" width="12" height="12">
        <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// One template for the three ways into the club's team: the invitation, how selection works or
// what one can apply for, what an application asks for, and the other ways to join. The sign-up
// forms are not part of this site yet, so nothing here submits; "what to prepare" stands in for
// them until the club builds real forms after the redesign.
export function JoinPage({ slug }: { slug: JoinSlug }) {
  const locale: Locale = "he";
  const dir = "rtl";
  const page = joins[slug];
  const details = joinDetails[slug];
  const choices = [
    ...programs,
    accelerator,
  ].map((item) => ({ name: pick(item.name, locale) ?? item.name.he, href: catalogPath(item), tone: item.color ?? "#0f2d96" }));
  choices.push({ name: "Pitch Night", href: "/pitch-night", tone: "#0f2d96" });
  const sections: RailSection[] = [
    { id: "join-top", label: page.title.he },
    ...(details.steps ? [{ id: "join-steps", label: "אז איך נרשמים?" }] : []),
    ...(details.teams ? [{ id: "join-roles", label: "מה אפשר לנהל?" }] : []),
    { id: "join-prepare", label: "מה צריך להכין?" },
    { id: "join", label: impactLabels[locale].join },
  ];

  return (
    <>
      <RevealController />
      <SectionRail sections={sections} label="ניווט בין חלקי העמוד" />

      <PageBanner id="join-top" image={joinBanners[slug]} locale={locale} title={page.title.he} eyebrow={impactLabels[locale].join} small />

      <section data-reveal className="mx-auto w-full max-w-3xl px-5 pt-10 pb-4 text-center md:px-8 md:pt-20 md:pb-8">
        <p data-reveal-item="0" className="text-2xl leading-snug font-bold text-club md:text-[32px]">
          {details.lead}
        </p>
        {details.more ? (
          <p data-reveal-item="1" className="mt-5 text-justify text-base leading-7 text-ink [text-align-last:center] md:text-lg md:leading-8">
            {details.more}
          </p>
        ) : null}
      </section>

      {details.steps ? (
        <section id="join-steps" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">אז איך נרשמים?</span>
          </h2>
          {details.stepsIntro ? (
            <p data-reveal-item="1" className="mx-auto mt-6 max-w-3xl text-justify text-base leading-7 text-ink/85 [text-align-last:center] md:text-lg md:leading-8">
              {details.stepsIntro}
            </p>
          ) : null}
          {/* Each stage is a card with its number large and light, cropped by the card's edge. */}
          <ol className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
            {details.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal-item={String(index + 2)}
                className="group relative isolate overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white p-6 pe-16 shadow-[0_24px_50px_-34px_rgba(15,45,150,0.45)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-club/30 hover:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)] md:p-8 md:pe-24"
                style={{ transitionTimingFunction: "var(--ease)" }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-2 -top-10 -z-10 text-[9rem] leading-none font-bold text-[#dbe3ff] transition-[translate] duration-700 group-hover:translate-y-3 md:-top-12 md:text-[11rem]"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                >
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-club/60">שלב {index + 1}</p>
                <h3 className="mt-1 text-2xl font-bold text-club">{step.title}</h3>
                <p className="mt-3 text-justify text-[15px] leading-7 text-ink/85">{step.body}</p>
                {step.items ? (
                  <ul className="mt-5 space-y-4">
                    {step.items.map((item) => (
                      <li key={item.title} className="group flex gap-3">
                        <CheckBox />
                        <span>
                          <span className="block font-bold text-club">{item.title}</span>
                          <span className="mt-1 block text-justify text-sm leading-6 text-ink/80">{item.body}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {details.teams ? (
        <section id="join-roles" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">מה אפשר לנהל?</span>
          </h2>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
            <div data-reveal-item="1">
              <p className="text-sm font-semibold text-club/60">מטה המועדון</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {details.teams.map((team) => (
                  <li key={team} className="border border-club/15 bg-white px-3.5 py-2 text-sm font-semibold text-club">
                    {team}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item="2">
              <p className="text-sm font-semibold text-club/60">תוכניות</p>
              {/* Each program in its own color, linking to its page. */}
              <ul className="mt-3 flex flex-wrap gap-2">
                {choices.map((choice) => (
                  <li key={choice.href}>
                    <Link
                      href={choice.href}
                      data-press
                      className="group inline-flex items-center gap-2 border border-club/15 bg-white px-3.5 py-2 text-sm font-semibold text-club transition-colors duration-300 hover:border-(--tone-deep) hover:bg-(--tone-deep) hover:text-white"
                      style={{ "--tone": choice.tone, "--tone-deep": readableShade(choice.tone) } as CSSProperties}
                    >
                      <span aria-hidden="true" className="h-2.5 w-2.5 bg-(--tone) transition-colors duration-300 group-hover:bg-white" />
                      {choice.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {details.team ? (
            <p data-reveal-item="3" className="mx-auto mt-8 max-w-3xl bg-[#f4f6fd] p-4 text-center text-[15px] leading-7 text-club/85 md:mt-10">
              {details.team}
            </p>
          ) : null}
        </section>
      ) : null}

      <section id="join-prepare" data-reveal className="mx-auto w-full max-w-4xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">מה צריך להכין?</span>
        </h2>
        <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 md:mt-10 md:gap-3">
          {details.prepare.map((item, index) => (
            <li
              key={item}
              data-reveal-item={String(Math.min(index + 1, 6))}
              className="group flex items-start gap-3 rounded-xl border border-[#e6e9f5] bg-white px-4 py-3 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-club/30"
            >
              <CheckBox />
              {item}
            </li>
          ))}
        </ul>
        <p data-reveal-item="6" className="mt-6 bg-[#f4f6fd] p-4 text-center text-sm leading-6 text-club/85">
          {joinNote}
        </p>
      </section>

      {/* The other ways in, as on the home page's "get involved" cards. */}
      <div id="join" data-reveal className="scroll-mt-[4.5rem]">
        <JoinSection cards={joinCards(locale).filter((card) => card.href.startsWith("/join/") && card.href !== `/join/${slug}`)} title={impactLabels[locale].join} dir={dir} />
      </div>
    </>
  );
}

const dayNames: Record<Locale, string[]> = {
  he: ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"],
  en: ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"],
};

const programLabels: Record<
  Locale,
  {
    eyebrow: string;
    back: string;
    language: string;
    languages: Record<"he" | "en", string>;
    frequency: string;
    semester: string;
    meets: string;
    details: string;
    about: string;
    follow: string;
    website: string;
    managers: string;
    gallery: string;
    more: string;
    all: string;
  }
> = {
  he: {
    eyebrow: "תוכנית · מועדון היזמות",
    back: "לכל התוכניות",
    language: "שפה",
    languages: { he: "עברית", en: "אנגלית" },
    frequency: "תדירות",
    semester: "סמסטריאלי",
    meets: "מפגש שבועי",
    details: "פרטי התוכנית",
    about: "על התוכנית",
    follow: "עקבו אחרינו",
    website: "אתר התוכנית",
    managers: "מנהלי התוכנית",
    gallery: "גלרייה",
    more: "תוכניות נוספות",
    all: "לכל התוכניות",
  },
  en: {
    eyebrow: "Program · Entrepreneurship Club",
    back: "All programs",
    language: "Language",
    languages: { he: "Hebrew", en: "English" },
    frequency: "Frequency",
    semester: "Semester-long",
    meets: "Weekly Meeting",
    details: "Program Details",
    about: "About the Program",
    follow: "Follow Us",
    website: "Program website",
    managers: "Program Managers",
    gallery: "Gallery",
    more: "More Programs",
    all: "All programs",
  },
};

type FactIconName = "language" | "calendar" | "clock";

// An icon in the program's light tone: small above the text in a phone square, large and cropped
// by the card's edge on wider screens. On hover it acts out its meaning: the speech bubble types,
// the calendar ticks a day off and the clock's hand sweeps round.
function FactIcon({ name }: { name: FactIconName }) {
  const dot = "origin-center fill-white motion-safe:group-hover:animate-[node-pulse_1.2s_ease-in-out_infinite]";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="pointer-events-none mb-1 h-8 w-8 shrink-0 fill-(--tone-light) transition-[translate] duration-700 md:absolute md:-end-6 md:top-1/2 md:mb-0 md:h-24 md:w-24 md:-translate-y-1/2 md:ltr:group-hover:-translate-x-3 md:rtl:group-hover:translate-x-3"
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      {name === "language" ? (
        <>
          <path d="M5 3.5h14A2.5 2.5 0 0 1 21.5 6v8.5A2.5 2.5 0 0 1 19 17h-8.2L6 20.8V17H5a2.5 2.5 0 0 1-2.5-2.5V6A2.5 2.5 0 0 1 5 3.5z" />
          {[8, 12, 16].map((cx, index) => (
            <circle key={cx} cx={cx} cy="10.3" r="1.25" className={dot} style={{ transformBox: "fill-box", animationDelay: `${index * 0.18}s` }} />
          ))}
        </>
      ) : null}
      {name === "calendar" ? (
        <>
          <path d="M5 4.5h14A2.5 2.5 0 0 1 21.5 7v12a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V7A2.5 2.5 0 0 1 5 4.5z" />
          <rect x="6.5" y="2" width="2.4" height="5" rx="1.2" />
          <rect x="15.1" y="2" width="2.4" height="5" rx="1.2" />
          <path d="M2.5 9.6h19" fill="none" stroke="#ffffff" strokeWidth="1.2" />
          <path
            d="M8.2 15.4l2.4 2.4 5.2-5.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-150 duration-700 group-hover:[stroke-dashoffset:0]"
          />
        </>
      ) : null}
      {name === "clock" ? (
        <>
          <circle cx="12" cy="12" r="10" />
          {[0, 90, 180, 270].map((angle) => (
            <circle key={angle} cx="12" cy="4.6" r="0.9" fill="#ffffff" transform={`rotate(${angle} 12 12)`} />
          ))}
          <path d="M12 12V7.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M12 12h4.6"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="transition-[rotate] duration-[1600ms] group-hover:rotate-[360deg]"
            style={{ transformOrigin: "12px 12px", transitionTimingFunction: "var(--ease)" }}
          />
        </>
      ) : null}
    </svg>
  );
}

type SocialName = "instagram" | "linkedin" | "facebook" | "website";

function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="shrink-0">
      {name === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </>
      ) : null}
      {name === "linkedin" ? (
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"
        />
      ) : null}
      {name === "facebook" ? (
        <path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
      ) : null}
      {name === "website" ? (
        <>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </>
      ) : null}
    </svg>
  );
}

// A program's page, one template for every program: its photo in its own color, the three
// facts of when and how it meets, what it is about with its social accounts, its photos when
// it has some, its managers, and a way on to other programs.
function ProgramDetailPage({ locale, item, details }: { locale: Locale; item: CatalogItem; details: ProgramDetails }) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const labels = programLabels[locale];
  const name = pick(item.name, locale) ?? item.name.he;
  const tone = item.color ?? "#0f2d96";
  const logo = clubLogos.find((entry) => entry.slug === item.slug)?.logo;
  const about = (locale === "en" ? details.about.en : undefined) ?? details.about.he;
  const managers: TeamMember[] = details.managers.flatMap((person, index) => {
    const personName = pick(person.name, locale);
    return personName ? [{ id: `${item.slug}-${index}`, name: personName, role: pick(person.role, locale), photo: person.photo, linkedin: person.linkedin }] : [];
  });
  const links = (["instagram", "linkedin", "facebook", "website"] as const).flatMap((key) => {
    const href = details.links[key];
    return href ? [{ key, href, label: key === "website" ? labels.website : { instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook" }[key] }] : [];
  });
  const listed = locale === "en" ? programs.filter((entry) => entry.summary.en) : programs;
  const at = listed.findIndex((entry) => entry.slug === item.slug);
  const others = [1, 2, 3].map((step) => listed[(at + step) % listed.length]).filter((entry) => entry.slug !== item.slug);
  const sections: RailSection[] = [
    { id: "program-top", label: name },
    { id: "program-about", label: labels.about },
    ...(details.gallery.length ? [{ id: "program-gallery", label: labels.gallery }] : []),
    ...(managers.length ? [{ id: "program-managers", label: labels.managers }] : []),
    { id: "program-more", label: labels.more },
  ];
  const facts: { icon: FactIconName; label: string; value: string; detail?: string }[] = [
    { icon: "language", label: labels.language, value: labels.languages[details.language] },
    { icon: "calendar", label: labels.frequency, value: labels.semester },
    { icon: "clock", label: labels.meets, value: dayNames[locale][details.meets.day], detail: details.meets.time.replace("-", "–") },
  ];
  const chevron = <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />;
  const toneStyle = {
    "--tone": tone,
    "--tone-deep": readableShade(tone),
    "--tone-light": `color-mix(in oklab, ${tone} 24%, white)`,
  } as CSSProperties;

  return (
    <div style={toneStyle}>
      <RevealController />
      <SectionRail sections={sections} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      <PageBanner
        id="program-top"
        image={item.image}
        locale={locale}
        title={name}
        subtitle={pick(item.summary, locale)}
        eyebrow={labels.eyebrow}
        tone={tone}
        logo={logo}
        back={{ href: withLocale("/programs", locale), label: labels.back }}
        className="pb-10 md:pb-14"
      />

      {/* The facts float over the banner's lower edge. */}
      <section aria-label={labels.details} data-reveal className="relative z-10 mx-auto -mt-14 w-full max-w-6xl px-5 md:-mt-20 md:px-8">
        {/* Three small squares side by side on phones; wide cards with a cropped icon from md up. */}
        <div className="grid grid-cols-3 gap-2.5 md:gap-5">
          {facts.map((fact, index) => (
            <div
              key={fact.icon}
              data-reveal-item={String(index + 1)}
              className="group relative isolate flex h-full min-h-28 flex-col items-center justify-center overflow-hidden rounded-[20px] border border-[#e6e9f5] bg-white p-2 text-center shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-(--tone)/40 hover:shadow-[0_30px_60px_-30px_rgba(6,19,71,0.6)] md:block md:min-h-0 md:rounded-[24px] md:p-6 md:pe-28 md:text-start"
              style={{ transitionTimingFunction: "var(--ease)" }}
            >
              <FactIcon name={fact.icon} />
              <p className="relative text-xs font-semibold text-club/60 md:text-sm">{fact.label}</p>
              <p className="relative mt-0.5 text-sm leading-tight font-bold text-club md:mt-1 md:text-2xl">{fact.value}</p>
              {fact.detail ? (
                <p className="relative mt-0.5 text-xs font-semibold text-(--tone-deep) md:text-base">
                  <span dir="ltr" className="inline-block">
                    {fact.detail}
                  </span>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="program-about" data-reveal className="mx-auto w-full max-w-3xl scroll-mt-[4.5rem] px-5 pt-12 pb-6 md:px-8 md:pt-20 md:pb-10">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{labels.about}</span>
        </h2>
        <div className="mt-8 md:mt-10">
          {about.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal-item={String(Math.min(index + 1, 6))}
              className={
                index === 0
                  ? "text-justify text-xl leading-[1.55] font-bold text-club md:text-2xl md:leading-[1.5]"
                  : "mt-4 text-justify text-base leading-7 text-ink md:text-lg md:leading-8"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        {links.length ? (
          <div data-reveal-item="6" className="mt-10 border-t border-[#e9ecf6] pt-8 text-center">
            <p className="text-sm font-semibold text-club/60">{labels.follow}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-club/25 px-4 py-2.5 text-sm font-semibold text-club transition-colors duration-300 hover:border-(--tone-deep) hover:bg-(--tone-deep) hover:text-white"
                >
                  <SocialIcon name={link.key} />
                  {link.label}
                  {chevron}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </section>


      {details.gallery.length ? (
        <section id="program-gallery" className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
          <div data-reveal>
            <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
              <span className="club-underline">{labels.gallery}</span>
            </h2>
          </div>
          {/* A swipe row on phones; one row of equal tiles from sm up. */}
          <div
            className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-(--cols) sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
            style={{ "--cols": `repeat(${details.gallery.length}, minmax(0, 1fr))` } as CSSProperties}
          >
            {details.gallery.map((src, index) => (
              <div key={src} data-reveal className="w-[64vw] shrink-0 snap-center sm:w-auto">
                <div
                  data-reveal-item={String(Math.min(index + 1, 6))}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-(--tone-light) shadow-[0_18px_40px_-30px_rgba(6,19,71,0.7)]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 25vw, 64vw"
                    className="object-cover transition-[scale] duration-[1200ms] group-hover:scale-[1.06]"
                    style={{ transitionTimingFunction: "var(--ease)" }}
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-center scale-x-0 bg-(--tone) transition-[scale] duration-500 group-hover:scale-x-100" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {managers.length ? (
        <section id="program-managers" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">{labels.managers}</span>
          </h2>
          <TeamSection members={managers} labels={{ title: labels.managers, all: "", profile: teamLabels[locale].profile }} dir={dir} variant="center" />
        </section>
      ) : null}

      <section id="program-more" className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-24">
        <div data-reveal>
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <span className="club-underline">{labels.more}</span>
          </h2>
        </div>
        <CardSlider
          titles={others.map((entry) => pick(entry.name, locale) ?? entry.name.he)}
          label={labels.more}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-8 md:mt-10"
          grid="md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          slideClasses={["", "", "md:max-lg:hidden"]}
        >
          {others.map((entry, index) => (
            <div key={entry.slug} data-reveal className="h-full">
              <ProgramCard item={entry} logo={clubLogos.find((logoEntry) => logoEntry.slug === entry.slug)?.logo} locale={locale} dir={dir} reveal={index + 1} />
            </div>
          ))}
        </CardSlider>
        <div data-reveal className="mt-8 flex justify-center md:mt-10">
          <Link
            href={withLocale("/programs", locale)}
            data-press
            data-reveal-item="1"
            className="group inline-flex items-center gap-2 border border-club px-6 py-3 text-sm font-semibold text-club transition-colors duration-300 hover:bg-club hover:text-white"
          >
            {labels.all}
            {chevron}
          </Link>
        </div>
      </section>
    </div>
  );
}

function ItemPage({ locale, item }: { locale: Locale; item: CatalogItem }) {
  const name = pick(item.name, locale) ?? item.name.he;
  const summary = pick(item.summary, locale) ?? item.summary.he;
  return (
    <>
      <PageHero title={name} />
      <Section>
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={item.image} alt={name} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <p className="text-lg font-light leading-8 text-ink">{summary}</p>
        </div>
      </Section>
    </>
  );
}

// The photo banner that opens a page and runs under the header: the photo settles in slowly
// behind a wash (the club's blue, or a program's own color) while the eyebrow, the underlined
// title and the line under it rise in. A program page adds a way back and its logo on top.
function PageBanner({
  id,
  image,
  locale,
  title,
  subtitle,
  eyebrow,
  tone,
  logo,
  back,
  small = false,
  className = "",
}: {
  id: string;
  image: string;
  locale: Locale;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  tone?: string;
  logo?: string;
  back?: { href: string; label: string };
  // A smaller title, for long page names.
  small?: boolean;
  className?: string;
}) {
  return (
    <section id={id} className={`relative -mt-[4.5rem] flex min-h-[46vh] items-end overflow-hidden md:min-h-[64vh] ${className}`}>
      <Image src={image} alt="" fill preload sizes="100vw" className="object-cover motion-safe:animate-[hero-zoom_3.2s_var(--ease)_both]" />
      {tone ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgb(6 19 71 / 0.92), color-mix(in oklab, ${tone} 55%, transparent) 62%, color-mix(in oklab, ${tone} 30%, transparent))`,
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-[#061347]/90 via-club/60 to-club/35" />
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-10 text-center md:px-8 md:pt-40 md:pb-20">
        {back ? (
          <Link
            href={back.href}
            data-press
            className="group mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 transition-colors duration-300 hover:text-white motion-safe:animate-[hero-rise_1s_var(--ease)_both]"
          >
            <Chevron dir={locale === "en" ? "rtl" : "ltr"} className="transition-transform duration-500 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {back.label}
          </Link>
        ) : null}
        {logo ? (
          <span className="mx-auto mb-5 flex h-14 w-36 items-center justify-center rounded-xl bg-white px-4 shadow-[0_18px_40px_-20px_rgba(6,19,71,0.8)] motion-safe:animate-[hero-rise_1s_var(--ease)_60ms_both]">
            <span className="relative block h-full w-full">
              <Image src={logo} alt="" fill sizes="144px" className="object-contain py-2.5" />
            </span>
          </span>
        ) : null}
        <p className="text-sm font-semibold text-white/75 motion-safe:animate-[hero-rise_1s_var(--ease)_100ms_both]">
          {eyebrow ?? (locale === "en" ? "Entrepreneurship Club · Reichman University" : "מועדון היזמות · אוניברסיטת רייכמן")}
        </p>
        <h1
          className={`mt-4 font-bold text-white motion-safe:animate-[hero-rise_1.2s_var(--ease)_220ms_both] ${small ? "text-4xl leading-tight md:text-6xl" : "text-5xl md:text-7xl"}`}
        >
          <span className="club-underline on-dark">{title}</span>
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:mt-7 motion-safe:animate-[hero-rise_1.1s_var(--ease)_420ms_both] md:text-2xl md:leading-snug">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function PageHero({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-12 md:px-8">
      {eyebrow ? <p className="text-sm font-medium text-muted">{eyebrow}</p> : null}
      <h1 className="mt-2 text-4xl font-bold text-club md:text-5xl">{title}</h1>
    </section>
  );
}

function PeopleGrid({ people, locale }: { people: Person[]; locale: Locale }) {
  const visible = people.filter((person) => pick(person.name, locale));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {visible.map((person) => (
        <PersonCard key={person.id} person={person} locale={locale} />
      ))}
    </div>
  );
}
