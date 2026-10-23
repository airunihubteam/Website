import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { accelerator, catalogPath, conferences, findConference, findProgram, programs, type CatalogItem } from "@/content/catalog";
import {
  aboutParagraphs,
  joinDetails,
  joinNote,
  aiEn,
  aiHe,
  homePartners,
  communityEn,
  communityHe,
  homeAboutCount,
  internshipEn,
  internshipHe,
  joins,
  pitchIntro,
  pitchPartners,
  pitchReady,
  pitchRegistration,
  pitchStages,
  pitchStats,
  stats,
  type JoinSlug,
} from "@/content/copy";
import { aboutGroups, advisoryTeam, peopleByIds, peopleIn, personMedia, pitchTeam, type Person } from "@/content/people";
import { conferenceDetails, programDetails, type ProgramDetails, type ProgramFact } from "@/content/program-details";
import { TeamSection, type TeamLabels, type TeamMember } from "@/components/about-team";
import { CardSlider } from "@/components/card-slider";
import { Journey } from "@/components/journey";
import { ClubSlider, type ClubSlide, type ClubSliderLabels } from "@/components/club-slider";
import { GatePanels, type GatePanel, type GatePanelsLabels } from "@/components/gate-panels";
import { Chevron, SocialIcon } from "@/components/icons";
import { ImpactStats, JoinSection, type ImpactLabels, type ImpactStat, type JoinCard } from "@/components/impact-section";
import { RevealController, SectionRail, type RailSection } from "@/components/home-motion";
import { Section } from "@/components/ui";
import { readableShade } from "@/lib/color";
import { pick, withLocale, type Locale, type Localized } from "@/lib/locale";
import { Underline } from "@/components/underline";

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
    { id: "partners", label: "שותפים" },
  ],
  en: [
    { id: "home", label: "Home" },
    { id: "numbers", label: "Numbers" },
    { id: "join", label: "Get Involved" },
    { id: "about-us", label: "About" },
    { id: "activity", label: "Activity" },
    { id: "our-programs", label: "Programs" },
    { id: "partners", label: "Partners" },
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
          {/* The greeting is regular and the club's name bold. "Entrepreneurship" is too long a word
              for a 48px line on a phone, so the English headline scales with the screen width there. */}
          <h1
            className={`max-w-4xl leading-tight text-white md:text-[72px] md:leading-[1.15] ${
              locale === "en" ? "text-[clamp(1.75rem,9vw,3rem)]" : "text-5xl"
            }`}
          >
            <span className="block font-normal motion-safe:animate-[hero-rise_1.2s_var(--ease)_200ms_both]">
              {locale === "en" ? "Welcome to the" : "ברוכים הבאים"}
            </span>
            <span className="block font-bold motion-safe:animate-[hero-rise_1.2s_var(--ease)_380ms_both]">
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
          <Underline>{locale === "en" ? "About Us" : "קצת עלינו"}</Underline>
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
      <section id="partners" data-reveal className="scroll-mt-[4.5rem] pt-14 pb-14 md:pt-20 md:pb-24">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{locale === "en" ? "Our Partners" : "השותפים שלנו לדרך"}</Underline>
        </h2>
        <PartnerStrip partners={homePartners} />
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

type PartnerLogo = { src: string; width: number; height: number };

// The Hebrew Adelson lockup file is blurry, so the Hebrew card pairs the university's sharp
// stars-and-name mark with the school's name set as text (the English lockup is the only English
// file there is).
const academicPartners: { logo: Record<Locale, PartnerLogo>; caption?: Localized; name: Localized }[] = [
  {
    logo: {
      he: { src: "/brand/reichman-mark-he-color.png", width: 900, height: 548 },
      en: { src: "/brand/reichman-en-color.png", width: 798, height: 225 },
    },
    caption: { he: "בית ספר אדלסון ליזמות" },
    name: { he: "בית הספר אדלסון ליזמות", en: "Adelson School of Entrepreneurship" },
  },
  {
    logo: {
      he: { src: "/media/partners/sustainability.png", width: 526, height: 130 },
      en: { src: "/media/partners/sustainability.png", width: 526, height: 130 },
    },
    name: { he: "בית הספר לקיימות", en: "School of Sustainability" },
  },
  {
    logo: {
      he: { src: "/media/partners/recanati.png", width: 567, height: 150 },
      en: { src: "/media/partners/recanati.png", width: 567, height: 150 },
    },
    name: { he: "בית הספר הבינלאומי רפאל רקנאטי", en: "Raphael Recanati International School" },
  },
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
            <Underline>{teamLabels[locale].title}</Underline>
          </h2>
          <TeamSection members={members} groups={groups} labels={teamLabels[locale]} dir={dir} />
        </div>
      </section>

      <section id="advisory" data-reveal className="scroll-mt-[4.5rem] py-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <Underline>{locale === "en" ? "Advisory Committee & Academic Support" : "ועדה מייעצת וליווי אקדמי"}</Underline>
          </h2>
          <TeamSection members={advisors} labels={teamLabels[locale]} dir={dir} variant="pair" />
        </div>
      </section>

      <section id="partners" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-2 pb-14 md:px-8 md:pt-4 md:pb-20">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{locale === "en" ? "Academic Partners" : "שותפים אקדמיים"}</Underline>
        </h2>
        <div className="mt-8 grid gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {academicPartners.map((partner, index) => (
            <a
              key={partner.name.he}
              href={locale === "en" ? "https://www.runi.ac.il/en/" : "https://www.runi.ac.il/"}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-item={String(index + 1)}
              className="group flex h-20 items-center justify-center gap-3 rounded-[22px] border border-[#e6e9f5] bg-white px-5 sm:h-32 sm:px-6 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-club/30 hover:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)]"
            >
              {/* The logo is a mask filled with the club's blue, so all three share the site's color. */}
              <span
                role="img"
                aria-label={pick(partner.name, locale) ?? partner.name.he}
                className="block h-12 max-w-full bg-club transition-[scale,background-color] duration-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] group-hover:scale-[1.04] group-hover:bg-[#0a1f6e] sm:h-16"
                style={{
                  aspectRatio: `${partner.logo[locale].width} / ${partner.logo[locale].height}`,
                  maskImage: `url(${partner.logo[locale].src})`,
                  transitionTimingFunction: "var(--ease)",
                }}
              />
              {/* Hidden where three cards share a narrow row. */}
              {partner.caption && pick(partner.caption, locale) ? (
                <span className="max-w-[7.5rem] text-sm leading-snug font-light text-club transition-colors duration-500 group-hover:text-[#0a1f6e] sm:max-md:hidden md:text-base">
                  {pick(partner.caption, locale)}
                </span>
              ) : null}
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
function ProgramCard({
  item,
  logo,
  locale,
  dir,
  reveal,
  open = clubSliderLabels[locale].open,
}: {
  item: CatalogItem;
  logo?: string;
  locale: Locale;
  dir: "rtl" | "ltr";
  reveal: number;
  open?: string;
}) {
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
          {open}
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

const acceleratorLabels: Record<Locale, { title: string; intro: string; facts: string[]; open: string; register: string }> = {
  he: {
    title: "אקסלרטור",
    intro: "תוכנית האצה הפועלת מזה כ-11 שנים המוקדשת להעצמה וסיוע לסטארט-אפים בשלבי Seed של סטודנטים ובוגרי האוניברסיטה.",
    facts: ["פועל מאז 2013", "כשלושה חודשים", "0% אקוויטי"],
    open: "לעמוד Momentum",
    register: "הרשמה לאקסלרטור",
  },
  en: {
    title: "Accelerator",
    // From the old site's English accelerator page.
    intro: "An acceleration program that has been operating for about 11 years dedicated to empowering and assisting start-ups in the seed stages of university students and alumni.",
    facts: ["Since 2013", "About three months", "0% equity"],
    open: "View Momentum",
    register: "Apply",
  },
};

// The accelerator gate: the club runs one accelerator, Momentum, so the page is its banner and a
// single wide card with Momentum's photo, its open registration, its figures and the way in.
export function AcceleratorIndex({ locale }: { locale: Locale }) {
  const labels = acceleratorLabels[locale];
  const dir = locale === "en" ? "ltr" : "rtl";
  const details = programDetails[accelerator.slug];
  const logo = clubLogos.find((entry) => entry.slug === accelerator.slug)?.logo;
  const chevron = <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />;

  return (
    <>
      <RevealController />
      <PageBanner id="accelerator-top" image="/media/wp/gate-accelerator.jpg" locale={locale} title={labels.title} subtitle={labels.intro} />

      <section data-reveal className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-20">
        <article
          data-reveal-item="1"
          className="group grid overflow-hidden rounded-[28px] border border-[#e6e9f5] bg-white shadow-[0_30px_60px_-36px_rgba(15,45,150,0.55)] md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-club md:aspect-auto md:min-h-[440px]">
            <Image
              src={details?.banner ?? accelerator.image}
              alt=""
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.05]"
              style={{ transitionTimingFunction: "var(--ease)" }}
            />
            {logo ? (
              <span className="absolute start-4 top-4 flex h-12 w-28 items-center justify-center rounded-xl bg-white px-3 shadow-[0_10px_24px_-12px_rgba(6,19,71,0.6)]">
                <span className="relative block h-full w-full">
                  <Image src={logo} alt="" fill sizes="112px" className="object-contain py-2" />
                </span>
              </span>
            ) : null}
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            {details?.registration ? (
              <p className="self-start bg-[#f4f6fd] px-3 py-1.5 text-sm font-semibold text-club">{pick(details.registration.title, locale) ?? details.registration.title.he}</p>
            ) : null}
            <h2 className="mt-4 text-3xl font-bold text-club md:text-4xl">Momentum</h2>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-12 bg-club transition-[width] duration-500 group-hover:w-20" style={{ transitionTimingFunction: "var(--ease)" }} />
            <p className="mt-4 text-justify text-base leading-7 text-ink md:text-lg md:leading-8">{(locale === "en" ? details?.about.en?.[0] : details?.about.he[0]) ?? labels.intro}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {labels.facts.map((fact) => (
                <li key={fact} className="inline-flex items-center gap-2 border border-club/15 px-3 py-1.5 text-sm font-semibold text-club">
                  <span aria-hidden="true" className="h-2 w-2 bg-club" />
                  {fact}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocale(catalogPath(accelerator), locale)}
                data-press
                className="group inline-flex items-center justify-center gap-2 border border-club px-6 py-3 text-sm font-semibold whitespace-nowrap text-club transition-colors duration-300 hover:bg-club hover:text-white"
              >
                {labels.open}
                {chevron}
              </Link>
              {details?.registration ? (
                <a
                  href={details.registration.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 border border-club bg-club px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:border-[#0a1f6e] hover:bg-[#0a1f6e]"
                >
                  {labels.register}
                  {chevron}
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export function MomentumPage({ locale }: { locale: Locale }) {
  const details = programDetails[accelerator.slug];
  return details ? <ProgramDetailPage locale={locale} item={accelerator} details={details} /> : <ItemPage locale={locale} item={accelerator} />;
}

const conferenceIndexLabels: Record<Locale, { title: string; intro: string; all: string }> = {
  he: {
    title: "כנסים",
    intro: "כנסי המועדון מפגישים סטודנטים עם מובילי התעשייה, וסמינרי המנהלים מכשירים את מי שמוביל את המועדון.",
    all: "כל הכנסים",
  },
  en: {
    title: "Conferences",
    intro: "The club's conferences bring students together with industry leaders, and its managers seminars train the people who lead the club.",
    all: "All conferences",
  },
};

// The conferences gate: its banner and the three conferences as program-style cards, side by side
// from lg up (the third centered under the other two on tablets) and a slider on phones.
export function ConferenceIndex({ locale }: { locale: Locale }) {
  const labels = conferenceIndexLabels[locale];
  const cardLabels = labelsFor("conference", locale);
  const dir = locale === "en" ? "ltr" : "rtl";
  const items = locale === "en" ? conferences.filter((item) => item.summary.en) : conferences;

  return (
    <>
      <RevealController />
      <PageBanner id="conferences-top" image="/media/conferences/banner.webp" locale={locale} title={labels.title} subtitle={labels.intro} />

      <section className="mx-auto w-full max-w-6xl px-5 pt-6 pb-14 md:px-8 md:pt-20 md:pb-24">
        <CardSlider
          titles={items.map((item) => pick(item.name, locale) ?? item.name.he)}
          label={labels.all}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          grid="md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          slideClasses={["", "", "md:max-lg:col-span-2 md:max-lg:w-[calc(50%-0.625rem)] md:max-lg:justify-self-center"]}
        >
          {items.map((item, index) => (
            <div key={item.slug} data-reveal className="h-full">
              <ProgramCard item={item} logo={conferenceDetails[item.slug]?.logo} locale={locale} dir={dir} reveal={index + 1} open={cardLabels.open} />
            </div>
          ))}
        </CardSlider>
      </section>
    </>
  );
}

export function ConferencePage({ locale, slug }: { locale: Locale; slug: string }) {
  const item = findConference(slug);
  if (!item || (locale === "en" && !item.summary.en)) notFound();
  const details = conferenceDetails[slug];
  return details ? <ProgramDetailPage locale={locale} item={item} details={details} /> : <ItemPage locale={locale} item={item} />;
}

const STAR_PATH = "M12 1.8l2.9 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.3 5.7 21l1.6-7.1L1.9 9.1l7.2-.7z";

// Stars over the "are you ready" sky: most twinkle in place, a few rise slowly and fade. Fixed
// positions (in percent of the section) keep them clear of the text in the middle.
const readyStars: { x: number; y: number; size: number; delay: number; rise?: boolean }[] = [
  { x: 7, y: 16, size: 10, delay: 0 },
  { x: 15, y: 58, size: 6, delay: 1.2 },
  { x: 22, y: 30, size: 8, delay: 2.4 },
  { x: 29, y: 82, size: 12, delay: 0.6, rise: true },
  { x: 38, y: 10, size: 6, delay: 3.1 },
  { x: 46, y: 90, size: 8, delay: 4.2, rise: true },
  { x: 57, y: 13, size: 7, delay: 1.8 },
  { x: 66, y: 86, size: 10, delay: 2.9 },
  { x: 74, y: 18, size: 9, delay: 0.9 },
  { x: 82, y: 50, size: 6, delay: 3.6 },
  { x: 88, y: 80, size: 11, delay: 1.5, rise: true },
  { x: 93, y: 26, size: 8, delay: 2.2 },
  { x: 10, y: 88, size: 9, delay: 5, rise: true },
  { x: 60, y: 94, size: 6, delay: 6.5, rise: true },
];

function ReadyStars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {readyStars.map((star) => (
        <svg
          key={`${star.x}-${star.y}`}
          viewBox="0 0 24 24"
          className={`absolute fill-white opacity-40 ${star.rise ? "motion-safe:animate-[star-rise_12s_ease-in-out_infinite]" : "motion-safe:animate-[twinkle_5s_ease-in-out_infinite]"}`}
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: `${star.delay}s` }}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

const pitchSections: RailSection[] = [
  { id: "pitch-top", label: "Pitch Night" },
  { id: "pitch-journey", label: "Our Competition Journey" },
  { id: "pitch-ready", label: "Are You Ready?" },
  { id: "pitch-team", label: "The Team" },
  { id: "pitch-partners", label: "Our Partners" },
];

// Partner logos in one row on any screen, filled with the club's blue: they drift past and stop
// under the pointer, and without motion they sit still, wrapped and centered. The row always runs
// left to right, so it moves the same way on Hebrew pages.
function PartnerStrip({ partners }: { partners: { name: string; logo: string }[] }) {
  return (
    <div
      dir="ltr"
      data-reveal-item="1"
      className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:mt-10"
    >
      <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={`flex shrink-0 items-center gap-4 pe-4 ${copy === 1 ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center"}`}
          >
            {partners.map((partner) => (
              <li key={partner.name} className="flex h-24 w-52 items-center justify-center rounded-[20px] border border-[#e6e9f5] bg-white px-6 md:h-28">
                <span
                  role={copy === 1 ? undefined : "img"}
                  aria-label={copy === 1 ? undefined : partner.name}
                  className="block h-12 w-full bg-club [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                  style={{ maskImage: `url(${partner.logo})` }}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// Pitch Night, in English on both sites as on the old one, so it reads left to right: the banner
// and story, the competition in figures, its five stages one at a time, the call to follow along,
// the team and the partners.
export function PitchPage({ locale }: { locale: Locale }) {
  const intro = pick(pitchIntro, locale) ?? pitchIntro.he;
  const lead = firstSentence(intro);
  const team: TeamMember[] = pitchTeam.map((person) => ({
    id: person.id,
    name: pick(person.name, "en") ?? person.name.he,
    role: pick(person.role, "en"),
    photo: personMedia[person.id]?.photo,
  }));
  const heading = "text-center text-[32px] font-bold text-club";

  return (
    <div dir="ltr" lang="en">
      <RevealController />
      <SectionRail sections={pitchSections} label="Page sections" />

      <PageBanner id="pitch-top" image="/media/pitch/banner.webp" locale="en" title="Pitch Night" subtitle={lead}>
        <p className="text-base font-bold text-white md:text-lg">{pitchRegistration.title}</p>
        <p className="mt-1 text-sm text-white/75">{pitchRegistration.line}</p>
        <a
          href={pitchRegistration.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-bold text-club transition-colors duration-300 hover:border-club hover:bg-club hover:text-white"
        >
          {pitchRegistration.cta}
          <Chevron dir="ltr" className="transition-transform duration-500 group-hover:translate-x-1" />
        </a>
        <p className="mt-3 text-xs font-semibold tracking-wide text-white/70">{pitchRegistration.closes}</p>
      </PageBanner>

      <section data-reveal className="mx-auto w-full max-w-3xl px-5 pt-10 pb-2 md:px-8 md:pt-20 md:pb-4">
        <p data-reveal-item="0" className="text-justify text-xl leading-[1.55] font-bold text-club [text-align-last:center] md:text-2xl md:leading-[1.5]">
          {intro.slice(lead.length).trim()}
        </p>
      </section>
      <div data-reveal>
        <ImpactStats stats={pitchStats} label="Pitch Night in Numbers" />
      </div>

      <section id="pitch-journey" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-12">
        <h2 data-reveal-item="0" className={heading}>
          <Underline>Our Competition Journey</Underline>
        </h2>
        <div data-reveal-item="1" className="mt-8">
          <Journey steps={pitchStages} label="Our Competition Journey" stage="Stage" dir="ltr" />
        </div>
      </section>

      {/* A full section that moves like footage: a video when one is set, otherwise the climber
          photo pushing in slowly, with stars twinkling and rising over the night sky. */}
      <section id="pitch-ready" data-reveal className="relative isolate flex min-h-[540px] scroll-mt-[4.5rem] items-center overflow-hidden md:min-h-[78vh]">
        <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-[#061347]">
          {pitchReady.video ? (
            <video className="relative z-10 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" poster={pitchReady.poster}>
              {pitchReady.videoSmall ? <source src={pitchReady.videoSmall} type="video/mp4" media="(max-width: 767px)" /> : null}
              <source src={pitchReady.video} type="video/mp4" />
            </video>
          ) : null}
          <Image
            src={pitchReady.video && pitchReady.poster ? pitchReady.poster : "/media/pitch/ready.webp"}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${pitchReady.video ? "" : "motion-safe:animate-[ken-burns_28s_ease-in-out_infinite_alternate]"}`}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,19,71,0.92)_0%,rgba(6,19,71,0.5)_45%,rgba(6,19,71,0.88)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_55%,rgba(15,45,150,0.4),transparent)]" />
        <ReadyStars />
        <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center text-white md:px-8">
          <p data-reveal-item="0" className="text-sm font-semibold tracking-[0.24em] text-white/70 uppercase">
            {pitchReady.line}
          </p>
          <h2 data-reveal-item="1" className="mt-4 text-4xl font-bold md:text-6xl">
            <Underline onDark>{pitchReady.title}</Underline>
          </h2>
          <p data-reveal-item="2" className="mt-6 text-base text-white/85 md:text-lg">
            {pitchReady.body}
          </p>
          <div data-reveal-item="3" className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={pitchRegistration.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-sm font-bold text-club transition-colors duration-300 hover:border-club hover:bg-club hover:text-white"
            >
              {pitchRegistration.cta}
              <Chevron dir="ltr" className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href={pitchReady.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-white px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-club hover:bg-club"
            >
              {pitchReady.cta}
              <Chevron dir="ltr" className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <section id="pitch-team" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
        <h2 data-reveal-item="0" className={heading}>
          <Underline>The Pitch Night Team</Underline>
        </h2>
        <TeamSection members={team} labels={{ title: "The Pitch Night Team", all: "", profile: "More details" }} dir="ltr" variant="dense" />
      </section>

      <section id="pitch-partners" data-reveal className="scroll-mt-[4.5rem] pt-6 pb-14 md:pt-10 md:pb-24">
        <h2 data-reveal-item="0" className={heading}>
          <Underline>Our Partners</Underline>
        </h2>
        <PartnerStrip partners={pitchPartners} />
      </section>
    </div>
  );
}

// A large light shape cropped by a card's edge: a medal with the club's star on the scholarship
// card, a quotation mark beside a graduate's name, the club's star on the alumni invitation. Each
// drifts a little on hover; the medal's star also twinkles.
function CardMark({ name, className }: { name: "medal" | "quote" | "star"; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 transition-[translate] duration-700 ${className}`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      {name === "medal" ? (
        <>
          <path d="M6.2 1.5h4.2l2.4 5.6-2.6 2.2zM17.8 1.5h-4.2l-1.5 3.6 2.3 4.4z" />
          <circle cx="12" cy="15" r="7.5" />
          <path
            d={STAR_PATH}
            transform="translate(7.2 10.2) scale(0.4)"
            className="fill-white/25 motion-safe:group-hover:animate-[twinkle_2.4s_ease-in-out_infinite]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </>
      ) : null}
      {name === "star" ? <path d={STAR_PATH} /> : null}
      {name === "quote" ? (
        <path d="M10.2 6C6.8 7 4.5 9.8 4.5 13.6V19h6.2v-6.2H7.6c0-2.2 1.2-3.8 3.2-4.5zm9.3 0c-3.4 1-5.7 3.8-5.7 7.6V19H20v-6.2h-3.1c0-2.2 1.2-3.8 3.2-4.5z" />
      ) : null}
    </svg>
  );
}

// The industry internship with NICE: its banner on NICE's building, its three facts, what the
// program is, what it asks for beside its scholarship and its manager, and what graduates say.
// Its register button, in the banner and under the requirements, points at the old site's form
// until the club's forms are built (see docs/08-forms.md).
export function InternshipPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? internshipEn : internshipHe;
  const dir = locale === "en" ? "ltr" : "rtl";
  const sections: RailSection[] = [
    { id: "internship-top", label: copy.title },
    { id: "internship-about", label: copy.aboutTitle },
    { id: "internship-requirements", label: copy.requirementsTitle },
    { id: "internship-graduates", label: copy.quotesTitle },
  ];
  const lift =
    "transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,19,71,0.6)]";

  return (
    <div style={toneStyle("#0f2d96")}>
      <RevealController />
      <SectionRail sections={sections} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      {/* The photo is a tall shot of NICE's building; the banner keeps its sign in view. */}
      <PageBanner
        id="internship-top"
        image="/media/wp/gate-internship.jpg"
        imagePosition="50% 0%"
        locale={locale}
        title={copy.title}
        subtitle={copy.intro}
        eyebrow={copy.kicker}
        className="pb-10 md:pb-14"
      >
        <a
          href={copy.registration.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-bold whitespace-nowrap text-club transition-colors duration-300 hover:border-[#0a1f6e] hover:bg-[#0a1f6e] hover:text-white"
        >
          {copy.registration.cta}
          <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </a>
      </PageBanner>

      <FactCards facts={copy.facts} label={programLabels[locale].details} />

      <section id="internship-about" data-reveal className="mx-auto w-full max-w-3xl scroll-mt-[4.5rem] px-5 pt-12 pb-6 md:px-8 md:pt-20 md:pb-10">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{copy.aboutTitle}</Underline>
        </h2>
        <div className="mt-8 md:mt-10">
          {copy.body.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal-item={String(Math.min(index + 1, 6))}
              className={
                index === 0
                  ? "text-justify text-xl leading-[1.55] font-bold text-club hyphens-auto md:text-2xl md:leading-[1.5]"
                  : "mt-4 text-justify text-base leading-7 text-ink hyphens-auto md:text-lg md:leading-8"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* The requirements as a checklist, beside the scholarship and the program's manager. */}
      <section id="internship-requirements" data-reveal className="mx-auto w-full max-w-5xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{copy.requirementsTitle}</Underline>
        </h2>
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-5">
          <ul
            data-reveal-item="1"
            className={`space-y-3.5 rounded-[24px] border border-[#e6e9f5] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] hover:border-club/25 md:p-8 ${lift}`}
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            {copy.requirements.map((item) => (
              <li key={item} className="group flex gap-3 text-[15px] leading-7 text-ink md:text-base">
                <CheckBox />
                {item}
              </li>
            ))}
          </ul>
          <div className="grid gap-4 md:gap-5">
            <div
              data-reveal-item="2"
              className={`group relative isolate overflow-hidden rounded-[24px] bg-club p-6 text-white shadow-[0_24px_50px_-30px_rgba(6,19,71,0.7)] md:p-7 ${lift}`}
              style={{ transitionTimingFunction: "var(--ease)" }}
            >
              <CardMark name="medal" className="-end-7 -bottom-9 h-40 w-40 fill-white/10 group-hover:-translate-y-2" />
              <p className="text-sm font-semibold text-white/70">{copy.scholarship.label}</p>
              <p className="mt-1 text-4xl font-bold md:text-5xl">
                <span dir="ltr">{copy.scholarship.value}</span>
              </p>
              <p className="mt-3 text-justify text-[15px] leading-7 text-white/90">{copy.scholarship.text}</p>
            </div>
            {/* The manager: his portrait fills the card's side, edge to edge like the team cards, beside
                his name with the site's accent line, his role and a LinkedIn button. On hover the photo
                eases closer and the line stretches; the button fills on its own hover. */}
            <div
              data-reveal-item="3"
              className={`group relative isolate grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] hover:border-club/25 ${lift}`}
              style={{ transitionTimingFunction: "var(--ease)" }}
            >
              <div className="relative min-h-48 overflow-hidden bg-(--tone-light)">
                <Image
                  src={copy.manager.photo}
                  alt={copy.manager.name}
                  fill
                  unoptimized
                  className="object-cover transition-[scale] duration-[1200ms] group-hover:scale-[1.06]"
                  style={{ objectPosition: "50% 25%", transitionTimingFunction: "var(--ease)" }}
                />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-club/35 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-5 md:p-6">
                <p className="text-sm font-semibold text-club/60">{copy.manager.label}</p>
                <p className="mt-1 text-xl font-bold text-club md:text-2xl">{copy.manager.name}</p>
                <span
                  aria-hidden="true"
                  className="mt-2 block h-[3px] w-10 bg-club transition-[width] duration-500 group-hover:w-16"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                />
                <p className="mt-3 text-[15px] leading-6 text-ink">{copy.manager.role}</p>
                <a
                  href={copy.manager.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/in mt-4 inline-flex items-center gap-2 self-start border border-club/25 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-club transition-[background-color,color,border-color] duration-300 hover:border-club hover:bg-club hover:text-white"
                >
                  <SocialIcon name="linkedin" />
                  LinkedIn
                  <Chevron dir={dir} className="transition-transform duration-500 group-hover/in:translate-x-1 rtl:group-hover/in:-translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p data-reveal-item="4" className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-ink/70 md:mt-8">
          {copy.outline}
        </p>
        <div data-reveal-item="5" className="mt-8 flex justify-center">
          <a
            href={copy.registration.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-club bg-club px-7 py-3 text-sm font-bold whitespace-nowrap text-white transition-colors duration-300 hover:border-[#0a1f6e] hover:bg-[#0a1f6e]"
          >
            {copy.registration.cta}
            <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </div>
      </section>

      {/* Graduates' words: one card at a time on phones, side by side from lg up (the third
          centered under the other two on tablets). */}
      <section id="internship-graduates" className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-24">
        <div data-reveal>
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <Underline>{copy.quotesTitle}</Underline>
          </h2>
        </div>
        <CardSlider
          titles={copy.quotes.map((item) => item.name)}
          label={copy.quotesTitle}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-8 md:mt-10"
          grid="md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          slideClasses={["", "", "md:max-lg:col-span-2 md:max-lg:w-[calc(50%-0.625rem)] md:max-lg:justify-self-center"]}
        >
          {copy.quotes.map((item, index) => (
            <div key={item.name} data-reveal className="h-full">
              <figure
                data-reveal-item={String(index + 1)}
                className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] hover:border-club/25 md:p-7 ${lift}`}
                style={{ transitionTimingFunction: "var(--ease)" }}
              >
                <CardMark name="quote" className="-end-4 -bottom-9 h-28 w-28 fill-(--tone-light) group-hover:-translate-y-1.5" />
                <blockquote className="flex-1 text-justify text-sm leading-6 text-ink hyphens-auto md:text-[15px] md:leading-7">{item.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#e9ecf6] pe-16 pt-5">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-(--tone-light)">
                    <Image
                      src={item.photo}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition-[scale] duration-700 group-hover:scale-[1.08]"
                      style={{ transitionTimingFunction: "var(--ease)" }}
                    />
                  </span>
                  <span>
                    <span className="block font-bold text-club">{item.name}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-ink/70">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </CardSlider>
      </section>
    </div>
  );
}

// The club's community: a banner of the club's managers at a seminar, the community's promise,
// the student and alumni communities, the community team, and an invitation to former program
// managers to join the alumni community.
export function CommunityPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? communityEn : communityHe;
  const dir = locale === "en" ? "ltr" : "rtl";
  const team = peopleIn("community").map((person) => teamMember(person, locale));
  const communities = [
    { title: copy.studentsTitle, paragraphs: copy.students, image: "/media/community/students.webp" },
    { title: copy.alumniTitle, paragraphs: copy.alumni, image: "/media/community/alumni.webp" },
  ];
  const sections: RailSection[] = [
    { id: "community-top", label: copy.title },
    { id: "community-groups", label: copy.communitiesLabel },
    { id: "community-team", label: copy.teamTitle },
    { id: "community-join", label: copy.join.title },
  ];

  return (
    <>
      <RevealController />
      <SectionRail sections={sections} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      <PageBanner id="community-top" image="/media/community/banner.webp" locale={locale} title={copy.title} subtitle={copy.intro[0]} />

      <section id="community-groups" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-10 md:px-8 md:pt-20 md:pb-16">
        <p
          data-reveal-item="0"
          className="mx-auto max-w-3xl text-justify text-lg leading-8 font-bold text-club [text-align-last:center] md:text-2xl md:leading-[1.6]"
        >
          {copy.intro.slice(1).join(" ")}
        </p>
        {/* Side by side from md up; on phones the club slider, the other community peeking in at
            the side, each card as tall as its own text. They are long reads, so the slider waits for
            a swipe or tap. */}
        <CardSlider
          titles={communities.map((community) => community.title)}
          label={copy.communitiesLabel}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-8 md:mt-12"
          grid="md:grid-cols-2 md:gap-5"
          autoplay={false}
        >
          {communities.map((community, index) => (
            <article
              key={community.title}
              data-reveal-item={String(index + 1)}
              className="flex flex-col overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-club/25 md:h-full hover:shadow-[0_30px_60px_-30px_rgba(6,19,71,0.6)]"
              style={{ transitionTimingFunction: "var(--ease)" }}
            >
              <div className="relative aspect-[2/1] overflow-hidden bg-club md:aspect-[16/9]">
                <Image
                  src={community.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 540px, 78vw"
                  className="object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.05] group-data-active:scale-[1.05]"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-club md:text-[28px]">{community.title}</h3>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-[3px] w-10 bg-club transition-[width] duration-500 group-hover:w-16 group-data-active:w-16"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                />
                {community.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-justify text-[15px] leading-7 text-ink hyphens-auto md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </CardSlider>
      </section>

      <section id="community-team" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 py-10 md:px-8 md:py-16">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{copy.teamTitle}</Underline>
        </h2>
        <TeamSection members={team} labels={{ title: copy.teamTitle, all: "", profile: teamLabels[locale].profile }} dir={dir} variant="dense" />
      </section>

      {/* The alumni sign-up, in the club's blue under a large star. */}
      <section id="community-join" data-reveal className="mx-auto w-full max-w-4xl scroll-mt-[4.5rem] px-5 pt-6 pb-14 md:px-8 md:pt-10 md:pb-24">
        <div
          data-reveal-item="1"
          className="group relative isolate overflow-hidden rounded-[28px] bg-club px-6 py-10 text-center text-white shadow-[0_30px_60px_-36px_rgba(6,19,71,0.9)] md:px-12 md:py-14"
        >
          <CardMark name="star" className="-start-10 -bottom-12 h-48 w-48 fill-white/10 group-hover:-translate-y-2 md:h-64 md:w-64" />
          <CardMark name="star" className="-end-6 -top-8 h-24 w-24 fill-white/10 group-hover:translate-y-1.5 md:h-32 md:w-32" />
          <h2 className="text-[28px] leading-tight font-bold md:text-4xl">{copy.join.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 md:text-lg">{copy.join.line}</p>
          <a
            href={copy.join.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta mt-7 inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-bold whitespace-nowrap text-club transition-colors duration-300 hover:border-[#0a1f6e] hover:bg-[#0a1f6e] hover:text-white"
          >
            {copy.join.cta}
            <Chevron dir={dir} className="transition-transform duration-500 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1" />
          </a>
        </div>
      </section>
    </>
  );
}

// The Innovation & AI division: its banner with the division's robot, what it is for, its three
// activities with the robot's illustrations, and its team.
export function AiPage({ locale }: { locale: Locale }) {
  const copy = locale === "en" ? aiEn : aiHe;
  const dir = locale === "en" ? "ltr" : "rtl";
  const team = peopleIn("ai").map((person) => teamMember(person, locale));
  const sections: RailSection[] = [
    { id: "ai-top", label: copy.title },
    { id: "ai-activities", label: copy.blocksTitle },
    { id: "ai-team", label: copy.teamTitle },
  ];

  return (
    <>
      <RevealController />
      <SectionRail sections={sections} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      {/* The division's artwork, its robot at the right-hand edge, kept in view when cropped. */}
      <PageBanner id="ai-top" image="/media/ai/banner.webp" imagePosition="92% 50%" locale={locale} title={copy.title} subtitle={copy.intro} />

      <section id="ai-activities" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-10 md:px-8 md:pt-20 md:pb-16">
        <p
          data-reveal-item="0"
          className="mx-auto max-w-3xl text-justify text-lg leading-8 font-bold text-club [text-align-last:center] md:text-2xl md:leading-[1.6]"
        >
          {copy.lead}
        </p>
        <h2 data-reveal-item="1" className="mt-12 text-center text-[32px] font-bold text-club md:mt-16">
          <Underline>{copy.blocksTitle}</Underline>
        </h2>
        {/* One at a time on phones, the next one peeking in; three side by side from md up. */}
        <CardSlider
          titles={copy.blocks.map((block) => block.title)}
          label={copy.blocksTitle}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className="mt-8 md:mt-10"
        >
          {copy.blocks.map((block, index) => (
            <div key={block.title} data-reveal className="h-full">
              <article
                data-reveal-item={String(index + 1)}
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e6e9f5] bg-white shadow-[0_24px_50px_-30px_rgba(6,19,71,0.55)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-club/25 hover:shadow-[0_30px_60px_-30px_rgba(6,19,71,0.6)]"
                style={{ transitionTimingFunction: "var(--ease)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1440]">
                  <Image
                    src={block.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 360px, 78vw"
                    className="object-cover transition-[scale] duration-[1400ms] group-hover:scale-[1.06] group-data-active:scale-[1.06]"
                    style={{ transitionTimingFunction: "var(--ease)" }}
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-club md:text-[22px]">{block.title}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-[3px] w-10 bg-club transition-[width] duration-500 group-hover:w-16 group-data-active:w-16"
                    style={{ transitionTimingFunction: "var(--ease)" }}
                  />
                  <p className="mt-4 text-justify text-[15px] leading-7 text-ink hyphens-auto">{block.body}</p>
                </div>
              </article>
            </div>
          ))}
        </CardSlider>
      </section>

      <section id="ai-team" data-reveal className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-24">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{copy.teamTitle}</Underline>
        </h2>
        <TeamSection members={team} labels={{ title: copy.teamTitle, all: "", profile: teamLabels[locale].profile }} dir={dir} variant="center" />
      </section>
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
            <Underline>אז איך נרשמים?</Underline>
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
            <Underline>מה אפשר לנהל?</Underline>
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
          <Underline>מה צריך להכין?</Underline>
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

type ProgramLabels = {
  eyebrow: string;
  // The index page the banner leads back to, and its label.
  index: string;
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
  open: string;
};

const programLabels: Record<Locale, ProgramLabels> = {
  he: {
    eyebrow: "תוכנית · מועדון היזמות",
    index: "/programs",
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
    open: "לעמוד התוכנית",
  },
  en: {
    eyebrow: "Program · Entrepreneurship Club",
    index: "/programs",
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
    open: "View program",
  },
};

// The accelerator and the conferences use the program template, worded for themselves.
const kindLabels: Record<Exclude<CatalogItem["kind"], "program">, Record<Locale, Partial<ProgramLabels>>> = {
  accelerator: {
    he: { eyebrow: "אקסלרטור · מועדון היזמות", index: "/accelerator", back: "לאקסלרטור" },
    en: { eyebrow: "Accelerator · Entrepreneurship Club", index: "/accelerator", back: "Accelerator" },
  },
  conference: {
    he: {
      eyebrow: "כנס · מועדון היזמות",
      index: "/conferences",
      back: "לכל הכנסים",
      details: "פרטי הכנס",
      about: "על הכנס",
      website: "אתר הכנס",
      managers: "מנהלי הכנס",
      more: "כנסים נוספים",
      all: "לכל הכנסים",
      open: "לעמוד הכנס",
    },
    en: {
      eyebrow: "Conference · Entrepreneurship Club",
      index: "/conferences",
      back: "All conferences",
      details: "Conference Details",
      about: "About the Conference",
      website: "Conference website",
      managers: "Conference Managers",
      more: "More Conferences",
      all: "All conferences",
      open: "View conference",
    },
  },
};

function labelsFor(kind: CatalogItem["kind"], locale: Locale): ProgramLabels {
  return kind === "program" ? programLabels[locale] : { ...programLabels[locale], ...kindLabels[kind][locale] };
}

type FactIconName = ProgramFact["icon"];

// An icon in the program's light tone: small above the text in a phone square, large and cropped
// by the card's edge on wider screens. On hover it acts out its meaning: the speech bubble types,
// the calendar ticks a day off, the clock's hand sweeps round, the percent sign's dots pulse, the
// second person steps up beside the first, the pin's center pulses and the microphone sends out
// sound waves.
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
      {name === "percent" ? (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M8.2 15.8l7.6-7.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="8.7" cy="8.7" r="1.7" className={dot} style={{ transformBox: "fill-box" }} />
          <circle cx="15.3" cy="15.3" r="1.7" className={dot} style={{ transformBox: "fill-box", animationDelay: "0.2s" }} />
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
      {name === "people" ? (
        <>
          <g className="transition-[translate] duration-700 group-hover:-translate-y-0.5 ltr:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" style={{ transitionTimingFunction: "var(--ease)" }}>
            <circle cx="16.4" cy="7.4" r="3.1" />
            <path d="M11.2 19.6c0-3.6 2.3-6.3 5.2-6.3s5.2 2.7 5.2 6.3v.9H11.2z" />
          </g>
          <circle cx="8.6" cy="8.2" r="3.7" stroke="#ffffff" strokeWidth="1.3" />
          <path d="M2.4 21.2c0-4.3 2.8-7.4 6.2-7.4s6.2 3.1 6.2 7.4v.6H2.4z" stroke="#ffffff" strokeWidth="1.3" />
        </>
      ) : null}
      {name === "location" ? (
        <>
          <path d="M12 1.8a7.7 7.7 0 0 1 7.7 7.7c0 5.5-6.2 11.6-7.1 12.5a.86.86 0 0 1-1.2 0c-.9-.9-7.1-7-7.1-12.5A7.7 7.7 0 0 1 12 1.8z" />
          <circle cx="12" cy="9.5" r="2.9" className={dot} style={{ transformBox: "fill-box" }} />
        </>
      ) : null}
      {name === "mic" ? (
        <>
          <rect x="8.6" y="2" width="6.8" height="12.2" rx="3.4" />
          <path d="M10.6 6.4h2.8M10.6 9.2h2.8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5.6 10.6a6.4 6.4 0 0 0 12.8 0" fill="none" className="stroke-(--tone-light)" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="11.1" y="17" width="1.8" height="3.6" />
          <rect x="7.8" y="20.2" width="8.4" height="1.8" rx="0.9" />
          {["M20.6 5.6a7.4 7.4 0 0 1 0 7.2", "M3.4 5.6a7.4 7.4 0 0 0 0 7.2"].map((wave) => (
            <path
              key={wave}
              d={wave}
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              pathLength={1}
              className="stroke-(--tone-light) [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-150 duration-700 group-hover:[stroke-dashoffset:0]"
            />
          ))}
        </>
      ) : null}
    </svg>
  );
}

type FactCard = { icon: FactIconName; label: string; value: string; detail?: string; time?: boolean };

// Three facts that float over a banner's lower edge, in the page's tone (see toneStyle).
function FactCards({ facts, label }: { facts: FactCard[]; label: string }) {
  return (
    <section aria-label={label} data-reveal className="relative z-10 mx-auto -mt-14 w-full max-w-6xl px-5 md:-mt-20 md:px-8">
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
              <p className={`relative mt-0.5 text-xs font-semibold text-(--tone-deep) md:text-base ${fact.time ? "" : "max-md:hidden"}`}>
                <span dir={fact.time ? "ltr" : undefined} className="inline-block">
                  {fact.detail}
                </span>
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

// The page's own color and the two shades its buttons and icons use.
function toneStyle(tone: string): CSSProperties {
  return {
    "--tone": tone,
    "--tone-deep": readableShade(tone),
    "--tone-light": `color-mix(in oklab, ${tone} 24%, white)`,
  } as CSSProperties;
}

// A program's page, one template for every program: its photo in its own color, the three
// facts of when and how it meets, what it is about with its social accounts, its photos when
// it has some, its managers, and a way on to other programs. The accelerator and the
// conferences use it too, worded for themselves (see kindLabels).
function ProgramDetailPage({ locale, item, details }: { locale: Locale; item: CatalogItem; details: ProgramDetails }) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const labels = labelsFor(item.kind, locale);
  // The accelerator is the club's only one, so its page leads on to no others.
  const isAccelerator = item.kind === "accelerator";
  const isConference = item.kind === "conference";
  const name = pick(item.name, locale) ?? item.name.he;
  const tone = item.color ?? "#0f2d96";
  const logo = details.logo ?? clubLogos.find((entry) => entry.slug === item.slug)?.logo;
  const about = (locale === "en" ? details.about.en : undefined) ?? details.about.he;
  const managers: TeamMember[] = details.managers.flatMap((person, index) => {
    const personName = pick(person.name, locale);
    return personName ? [{ id: `${item.slug}-${index}`, name: personName, role: pick(person.role, locale), photo: person.photo, linkedin: person.linkedin }] : [];
  });
  const links = (["instagram", "linkedin", "facebook", "website"] as const).flatMap((key) => {
    const href = details.links[key];
    return href ? [{ key, href, label: key === "website" ? labels.website : { instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook" }[key] }] : [];
  });
  const siblings = isConference ? conferences : programs;
  const listed = locale === "en" ? siblings.filter((entry) => entry.summary.en) : siblings;
  const at = listed.findIndex((entry) => entry.slug === item.slug);
  const others = [1, 2, 3].map((step) => listed[(at + step) % listed.length]).filter((entry) => entry.slug !== item.slug);
  const managersTitle = (details.managersTitle && pick(details.managersTitle, locale)) ?? labels.managers;
  const text = (value: Localized) => pick(value, locale) ?? value.he;
  const sections: RailSection[] = [
    { id: "program-top", label: name },
    { id: "program-about", label: labels.about },
    ...(details.gallery.length ? [{ id: "program-gallery", label: labels.gallery }] : []),
    ...(managers.length ? [{ id: "program-managers", label: managersTitle }] : []),
    ...(isAccelerator ? [] : [{ id: "program-more", label: labels.more }]),
  ];
  // A weekly program's three facts come from when it meets; other pages bring their own.
  const facts: FactCard[] =
    details.facts?.map((fact) => ({ icon: fact.icon, label: text(fact.label), value: text(fact.value), detail: fact.detail && text(fact.detail) })) ??
    (details.language && details.meets
      ? [
          { icon: "language", label: labels.language, value: labels.languages[details.language] },
          { icon: "calendar", label: labels.frequency, value: labels.semester },
          { icon: "clock", label: labels.meets, value: dayNames[locale][details.meets.day], detail: details.meets.time.replace("-", "–"), time: true },
        ]
      : []);
  const chevron = <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />;
  return (
    <div style={toneStyle(tone)}>
      <RevealController />
      <SectionRail sections={sections} label={locale === "en" ? "Page sections" : "ניווט בין חלקי העמוד"} />

      <PageBanner
        id="program-top"
        image={details.banner ?? item.image}
        locale={locale}
        title={name}
        subtitle={pick(item.summary, locale)}
        eyebrow={labels.eyebrow}
        tone={tone}
        logo={logo}
        back={{ href: withLocale(labels.index, locale), label: labels.back }}
        className="pb-10 md:pb-14"
      >
        {details.registration ? (
          <>
            <p className="text-base font-bold text-white md:text-lg">{text(details.registration.title)}</p>
            <a
              href={details.registration.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-bold whitespace-nowrap text-club transition-colors duration-300 hover:border-(--tone-deep) hover:bg-(--tone-deep) hover:text-white"
            >
              {text(details.registration.cta)}
              {chevron}
            </a>
          </>
        ) : null}
      </PageBanner>

      <FactCards facts={facts} label={labels.details} />

      <section id="program-about" data-reveal className="mx-auto w-full max-w-3xl scroll-mt-[4.5rem] px-5 pt-12 pb-6 md:px-8 md:pt-20 md:pb-10">
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <Underline>{labels.about}</Underline>
        </h2>
        <div className="mt-8 md:mt-10">
          {about.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal-item={String(Math.min(index + 1, 6))}
              className={
                index === 0
                  ? "text-justify text-xl leading-[1.55] font-bold text-club hyphens-auto md:text-2xl md:leading-[1.5]"
                  : "mt-4 text-justify text-base leading-7 text-ink hyphens-auto md:text-lg md:leading-8"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        {details.priority ? (
          <div data-reveal-item="6" className="mt-8 rounded-[24px] border border-[#e6e9f5] bg-white p-6 md:p-7">
            <p className="font-bold text-club">{text(details.priority.title)}</p>
            <ul className="mt-4 space-y-3">
              {details.priority.items.map((entry) => (
                <li key={entry.he} className="group flex gap-3 text-[15px] leading-7 text-ink">
                  <CheckBox />
                  {text(entry)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {details.registration ? (
          <div data-reveal-item="6" className="mt-8 text-center">
            <p className="text-lg leading-8 font-bold text-club md:text-xl">{text(details.registration.title)}</p>
            <a
              href={details.registration.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 border border-club bg-club px-7 py-3 text-sm font-bold whitespace-nowrap text-white transition-colors duration-300 hover:border-(--tone-deep) hover:bg-(--tone-deep)"
            >
              {text(details.registration.cta)}
              {chevron}
            </a>
          </div>
        ) : null}
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
              <Underline>{labels.gallery}</Underline>
            </h2>
          </div>
          {/* A swipe row on phones that stops at every photo, centered (the row's padding lets the
              first and last one center too), and one row of equal tiles from sm up.
              The row reveals as one, so photos swiped in from the side are already in place
              instead of fading in mid-swipe. */}
          <div
            data-reveal
            className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[18vw] pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-(--cols) sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
            style={{ "--cols": `repeat(${details.gallery.length}, minmax(0, 1fr))` } as CSSProperties}
          >
            {details.gallery.map((src, index) => (
              <div key={src} data-reveal-item={String(Math.min(index + 1, 6))} className="w-[64vw] shrink-0 snap-center snap-always sm:w-auto">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-(--tone-light) shadow-[0_18px_40px_-30px_rgba(6,19,71,0.7)]">
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
        <section
          id="program-managers"
          data-reveal
          className={`mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 md:px-8 ${isAccelerator ? "pt-10 pb-14 md:pt-16 md:pb-24" : "py-10 md:py-16"}`}
        >
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <Underline>{managersTitle}</Underline>
          </h2>
          <TeamSection members={managers} labels={{ title: managersTitle, all: "", profile: teamLabels[locale].profile }} dir={dir} variant="center" />
        </section>
      ) : null}

      {isAccelerator ? null : (
      <section id="program-more" className="mx-auto w-full max-w-6xl scroll-mt-[4.5rem] px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-24">
        <div data-reveal>
          <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
            <Underline>{labels.more}</Underline>
          </h2>
        </div>
        <CardSlider
          titles={others.map((entry) => pick(entry.name, locale) ?? entry.name.he)}
          label={labels.more}
          goTo={clubSliderLabels[locale].goTo}
          dir={dir}
          className={`mt-8 md:mt-10 ${isConference ? "md:mx-auto md:max-w-3xl" : ""}`}
          grid={isConference ? "md:grid-cols-2 md:gap-5" : "md:grid-cols-2 md:gap-5 lg:grid-cols-3"}
          slideClasses={isConference ? [] : ["", "", "md:max-lg:hidden"]}
        >
          {others.map((entry, index) => (
            <div key={entry.slug} data-reveal className="h-full">
              <ProgramCard
                item={entry}
                logo={(isConference ? conferenceDetails[entry.slug]?.logo : undefined) ?? clubLogos.find((logoEntry) => logoEntry.slug === entry.slug)?.logo}
                locale={locale}
                dir={dir}
                reveal={index + 1}
                open={labels.open}
              />
            </div>
          ))}
        </CardSlider>
        <div data-reveal className="mt-8 flex justify-center md:mt-10">
          <Link
            href={withLocale(labels.index, locale)}
            data-press
            data-reveal-item="1"
            className="group inline-flex items-center gap-2 border border-club px-6 py-3 text-sm font-semibold text-club transition-colors duration-300 hover:bg-club hover:text-white"
          >
            {labels.all}
            {chevron}
          </Link>
        </div>
      </section>
      )}
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
  imagePosition,
  logo,
  back,
  small = false,
  className = "",
  children,
}: {
  id: string;
  image: string;
  // The part of the photo to keep in view when the banner crops it (CSS object-position).
  imagePosition?: string;
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
  // Actions under the subtitle, such as a registration button.
  children?: ReactNode;
}) {
  return (
    <section id={id} className={`relative -mt-[4.5rem] flex min-h-[46vh] items-end overflow-hidden md:min-h-[64vh] ${className}`}>
      <Image
        src={image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover motion-safe:animate-[hero-zoom_3.2s_var(--ease)_both]"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
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
          <Underline onDark>{title}</Underline>
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:mt-7 motion-safe:animate-[hero-rise_1.1s_var(--ease)_420ms_both] md:text-2xl md:leading-snug">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-7 motion-safe:animate-[hero-rise_1.1s_var(--ease)_560ms_both] md:mt-9">{children}</div> : null}
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

const notFoundLabels: Record<Locale, { title: string; line: string; home: string; sections: string; other: string }> = {
  he: {
    title: "העמוד לא נמצא",
    line: "ייתכן שהקישור ישן או שהעמוד עבר למקום אחר. אפשר להמשיך מכאן:",
    home: "לדף הבית",
    sections: "עמודים מרכזיים",
    other: "Page not found? Continue in English",
  },
  en: {
    title: "Page not found",
    line: "The link may be old, or the page may have moved. You can continue from here:",
    home: "Home",
    sections: "Main pages",
    other: "העמוד לא נמצא? המשיכו בעברית",
  },
};

// The page for an address the site doesn't have: the club's night sky with twinkling and rising
// stars, a large 404, the message, a way home and the main sections. The site-wide fallback can't
// tell which language was asked for, so it also offers the other language (`bilingual`).
export function NotFoundView({ locale, bilingual = false }: { locale: Locale; bilingual?: boolean }) {
  const labels = notFoundLabels[locale];
  const other: Locale = locale === "en" ? "he" : "en";
  const dir = locale === "en" ? "ltr" : "rtl";
  const links = [{ href: "/about", label: { he: "אודות", en: "About" } }, ...activityLinks];
  const rise = (step: number) => ({ animationDelay: `${120 + step * 110}ms` });

  return (
    <section className="relative isolate -mt-[4.5rem] flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-[linear-gradient(180deg,#0e1452_0%,#1a1e65_55%,#272d79_100%)] px-5 pt-28 pb-16 text-center text-white md:min-h-[82vh] md:px-8 md:pt-36 md:pb-24">
      <ReadyStars />
      <div className="mx-auto w-full max-w-3xl">
        <p
          aria-hidden="true"
          dir="ltr"
          className="text-[112px] leading-none font-bold tracking-[0.06em] text-white/15 motion-safe:animate-[hero-rise_1.2s_var(--ease)_both] md:text-[200px]"
        >
          404
        </p>
        <h1 className="-mt-6 text-4xl font-bold md:-mt-12 md:text-6xl motion-safe:animate-[hero-rise_1.2s_var(--ease)_both]" style={rise(1)}>
          <Underline onDark>{labels.title}</Underline>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/85 md:mt-8 md:text-xl motion-safe:animate-[hero-rise_1.1s_var(--ease)_both]" style={rise(2)}>
          {labels.line}
        </p>
        <div className="mt-8 motion-safe:animate-[hero-rise_1.1s_var(--ease)_both]" style={rise(3)}>
          <Link
            href={withLocale("/", locale)}
            data-press
            className="group inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-bold whitespace-nowrap text-club transition-colors duration-300 hover:border-[#0a1f6e] hover:bg-[#0a1f6e] hover:text-white"
          >
            {labels.home}
            <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
        <nav aria-label={labels.sections} className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={withLocale(link.href, locale)}
              data-press
              className={`group inline-flex items-center justify-center gap-2 border border-white/35 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-club motion-safe:animate-[hero-rise_1s_var(--ease)_both] ${index === links.length - 1 && links.length % 2 ? "max-sm:col-span-2" : ""}`}
              style={rise(4 + index * 0.5)}
            >
              {pick(link.label, locale) ?? link.label.he}
              <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          ))}
        </nav>
        {bilingual ? (
          <p className="mt-10 border-t border-white/15 pt-6 text-sm motion-safe:animate-[hero-rise_1s_var(--ease)_both]" style={rise(7)}>
            <Link
              href={withLocale("/", other)}
              hrefLang={other}
              dir={other === "en" ? "ltr" : "rtl"}
              lang={other}
              className="text-white/75 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white"
            >
              {notFoundLabels[locale].other}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
