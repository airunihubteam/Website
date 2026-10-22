import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accelerator, catalogPath, conferences, findConference, findProgram, programs, type CatalogItem } from "@/content/catalog";
import {
  aboutParagraphs,
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
} from "@/content/copy";
import { advisoryTeam, aboutTeam, peopleByIds, peopleIn, pitchTeam, type Person } from "@/content/people";
import { ClubSlider, type ClubSlide, type ClubSliderLabels } from "@/components/club-slider";
import { GatePanels, type GatePanel, type GatePanelsLabels } from "@/components/gate-panels";
import { CatalogCard, PersonCard, Section, StarBullet } from "@/components/ui";
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
  he: { title: "מוקדי העיסוק שלנו", more: "לפרטים נוספים" },
  en: { title: "Our Activity Centers", more: "Read More" },
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

export function HomePage({ locale }: { locale: Locale }) {
  const actions =
    locale === "he"
      ? [
          { href: "/join/chair", label: "הרשמה לוועדת האיתור לבחירת יו״ר" },
          { href: "/join/programs", label: "הרשמה לניהול תוכניות" },
          { href: "/join/new-program", label: "יש לכם רעיון למועדון חדש? לחצו כאן" },
          { href: "/programs", label: "לתוכניות שלנו - לחצו כאן" },
        ]
      : [];

  return (
    <>
      <section className="relative -mt-[4.5rem] flex min-h-[100vh] items-center">
        <Image
          src="/media/building.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-club/60" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 md:px-8">
          <h1 className="max-w-4xl text-5xl leading-tight font-extralight text-white md:text-[72px] md:leading-[1.15]">
            {locale === "en" ? (
              "Welcome to the Entrepreneurship Club"
            ) : (
              <>
                ברוכים הבאים
                <br />
                לאתר מועדון היזמות
              </>
            )}
          </h1>
          <Link href={withLocale("/programs", locale)} className="mt-8 inline-block border border-white px-5 py-2 text-base text-white">
            {locale === "en" ? "Our programs" : "לתוכניות שלנו - לחצו כאן"}
          </Link>
        </div>
      </section>
      {actions.length > 0 ? (
        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1 px-4 py-8 sm:grid-cols-2 md:px-8">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="flex min-h-32 items-center justify-center bg-tile px-6 py-8 text-center text-2xl font-bold text-white">
              {action.label}
            </Link>
          ))}
        </section>
      ) : null}
      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 px-5 py-10 md:grid-cols-4 md:px-8">
          {stats.map((stat) => (
            <div key={stat.label.he} className="bg-white px-3 py-6 text-center">
              <p className="text-5xl font-bold text-club md:text-6xl" dir="ltr">
                {stat.value === "1500" ? "+1,500" : stat.value}
              </p>
              <p className="mt-2 text-lg text-muted">{pick(stat.label, locale)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <h2 className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{locale === "en" ? "About Us" : "קצת עלינו"}</span>
        </h2>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4 text-base leading-8 text-ink">
            {aboutParagraphs.slice(0, homeAboutCount).map((paragraph) => (
              <p key={paragraph.he}>{pick(paragraph, locale)}</p>
            ))}
            <p className="text-end">
              <Link href={withLocale("/about", locale)} className="font-semibold text-club underline">
                {locale === "en" ? "Read More" : "לפרטים נוספים"}
              </Link>
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
            <Image src="/media/wp/about-team.jpg" alt={locale === "en" ? "Club students" : "סטודנטים במועדון היזמות"} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>
      <GatePanels items={gatePanels(locale)} labels={gatePanelsLabels[locale]} dir={locale === "en" ? "ltr" : "rtl"} />
      <ClubSlider slides={clubSlides(locale)} labels={clubSliderLabels[locale]} dir={locale === "en" ? "ltr" : "rtl"} />
      <section className="bg-gradient-to-b from-band to-club px-5 py-16 text-white md:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center text-[32px] font-bold">{locale === "en" ? "The Chairman" : "יו״ר המועדון"}</h2>
          <blockquote className="mt-8 text-lg leading-8">{pick(reichmanQuote, locale)}</blockquote>
          <p className="mt-6 font-medium">{pick(chairLine, locale)}</p>
        </div>
      </section>
    </>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero title={locale === "en" ? "About" : "אודות"} />
      <Section>
        <div className="max-w-3xl space-y-4 text-lg font-light leading-8 text-ink">
          {aboutParagraphs.map((paragraph) => {
            const text = pick(paragraph, locale);
            return text ? <p key={paragraph.he}>{text}</p> : null;
          })}
        </div>
      </Section>
      <Section title={locale === "en" ? "The Management Team" : "צוות הניהול"}>
        <PeopleGrid people={aboutTeam()} locale={locale} />
      </Section>
      <Section title={locale === "en" ? "Advisory Committee & Academic Support" : "ועדה מייעצת וליווי אקדמי"}>
        <PeopleGrid people={advisoryTeam()} locale={locale} />
      </Section>
    </>
  );
}

export function ProgramIndex({ locale }: { locale: Locale }) {
  const items = locale === "en" ? programs.filter((item) => item.summary.en) : programs;
  return (
    <>
      <PageHero title={locale === "en" ? "Programs" : "תוכניות"} />
      <Section>
        <p className="max-w-3xl text-lg font-light leading-8 text-ink">{pick(aboutParagraphs[5], locale)}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <CatalogCard key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      </Section>
    </>
  );
}

export function ProgramPage({ locale, slug }: { locale: Locale; slug: string }) {
  const item = findProgram(slug);
  if (!item || (locale === "en" && !item.summary.en)) notFound();
  return <ItemPage locale={locale} item={item} />;
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

export function JoinPage({ slug }: { slug: "chair" | "programs" | "new-program" }) {
  const page = joins[slug];
  return (
    <>
      <PageHero title={page.title.he} />
      <Section>
        <div className="max-w-3xl space-y-4 text-lg font-light leading-8 text-ink">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
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
