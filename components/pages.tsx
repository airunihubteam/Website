import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accelerator, conferences, findConference, findProgram, programs, type CatalogItem } from "@/content/catalog";
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
import { CatalogCard, PersonCard, Section, StarBullet } from "@/components/ui";
import { pick, withLocale, type Locale } from "@/lib/locale";

export function HomePage({ locale }: { locale: Locale }) {
  const actions =
    locale === "he"
      ? [
          { href: "/join/chair", label: "הרשמה לוועדת האיתור לבחירת יו״ר" },
          { href: "/join/programs", label: "הרשמה לניהול תוכניות" },
          { href: "/join/new-program", label: "יש לכם רעיון למועדון חדש?" },
          { href: "/programs", label: "לתוכניות שלנו" },
        ]
      : [];
  const gates = [
    { href: "/programs", he: "תוכניות", en: "Programs" },
    { href: "/accelerator", he: "אקסלרטור", en: "Accelerator" },
    { href: "/conferences", he: "כנסים", en: "Conferences" },
    { href: "/pitch-night", he: "Pitch Night", en: "Pitch Night" },
    { href: "/internship", he: "מסלול לתעשייה", en: "Industry Internship" },
  ];

  return (
    <>
      <section className="mx-auto grid min-h-[70vh] w-full max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-haze">
            {locale === "en" ? "Entrepreneurship Club" : "מועדון היזמות"}
          </p>
          <h1 className="font-display mt-4 max-w-xl text-5xl font-extrabold leading-none tracking-[0.08em] md:text-7xl">
            {locale === "en" ? "Welcome to the Entrepreneurship Club" : "ברוכים הבאים לאתר מועדון היזמות"}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-8 text-body">{pick(aboutParagraphs[0], locale)}</p>
          <Link
            href={withLocale("/programs", locale)}
            className="font-display mt-8 inline-block border border-star px-5 py-3 text-sm font-extrabold tracking-[0.1em]"
          >
            {locale === "en" ? "Programs" : "לתוכניות שלנו"}
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-night">
          <Image src="/media/building.jpg" alt={locale === "en" ? "Adelson School of Entrepreneurship" : "בניין אדלסון ליזמות"} fill className="object-cover opacity-80" priority sizes="(min-width: 768px) 40vw, 100vw" />
          <div className="absolute inset-0 bg-night/20" />
        </div>
      </section>
      {actions.length > 0 ? (
        <section className="mx-auto grid w-full max-w-6xl gap-3 px-5 md:grid-cols-4 md:px-8">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="border border-white/15 bg-midnight px-4 py-8 text-center font-display text-lg font-bold tracking-[0.04em]">
              {action.label}
            </Link>
          ))}
        </section>
      ) : null}
      <section className="mx-auto grid w-full max-w-6xl gap-3 px-5 py-14 md:grid-cols-4 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label.he} className="border border-white/15 bg-night px-4 py-8 text-center">
            <p className="font-mono text-4xl" dir="ltr">
              {stat.value}
              {"suffix" in stat ? stat.suffix : ""}
            </p>
            <p className="mt-2 font-display text-xs font-semibold tracking-[0.2em] text-haze">{pick(stat.label, locale)}</p>
          </div>
        ))}
      </section>
      <Section title={locale === "en" ? "About Us" : "קצת עלינו"}>
        <div className="max-w-3xl space-y-4 text-lg font-light leading-8 text-body">
          {aboutParagraphs.slice(0, homeAboutCount).map((paragraph) => (
            <p key={paragraph.he}>{pick(paragraph, locale)}</p>
          ))}
        </div>
        <Link href={withLocale("/about", locale)} className="font-display mt-8 inline-block border border-star px-5 py-3 text-sm font-extrabold tracking-[0.1em]">
          {locale === "en" ? "Read More" : "לפרטים נוספים"}
        </Link>
      </Section>
      <section className="mx-auto grid w-full max-w-6xl gap-3 px-5 pb-14 md:grid-cols-5 md:px-8">
        {gates.map((gate) => (
          <Link key={gate.href} href={withLocale(gate.href, locale)} className="border border-white/15 bg-night px-4 py-8 text-center font-display font-bold tracking-[0.04em]">
            {locale === "en" ? gate.en : gate.he}
          </Link>
        ))}
      </section>
      <Section title={locale === "en" ? "The Chairman" : "יו״ר המועדון"}>
        <blockquote className="max-w-3xl border border-white/15 bg-midnight p-6 text-lg font-light leading-8 text-body">{pick(reichmanQuote, locale)}</blockquote>
        <p className="mt-6 font-display text-sm font-semibold tracking-[0.12em]">{pick(chairLine, locale)}</p>
      </Section>
    </>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero title={locale === "en" ? "About" : "אודות"} />
      <Section>
        <div className="max-w-3xl space-y-4 text-lg font-light leading-8 text-body">
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
        <p className="max-w-3xl text-lg font-light leading-8 text-body">{pick(aboutParagraphs[5], locale)}</p>
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
        <p className="max-w-3xl text-lg font-light leading-8 text-body">{pick(pitchIntro, locale)}</p>
        <p className="mt-6 max-w-3xl text-lg font-light leading-8">Are You Ready to Pitch?</p>
        <a href="https://www.linkedin.com/company/ruec/" className="font-display mt-6 inline-block border border-star px-5 py-3 text-sm font-extrabold tracking-[0.1em]" rel="noreferrer">
          Visit Our LinkedIn
        </a>
      </Section>
      <Section title="Our Competition Journey">
        <div className="grid gap-4">
          {pitchStages.map((stage) => (
            <article key={stage.title} className="border border-white/15 bg-night p-5">
              <h3 className="font-display text-2xl font-bold tracking-[0.04em]">{stage.title}</h3>
              <p className="mt-3 text-base font-light leading-7 text-body">{stage.body}</p>
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
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-haze">{copy.kicker}</p>
        <p className="mt-3 font-mono text-sm" dir="ltr">
          {copy.data}
        </p>
        <div className="mt-6 max-w-3xl space-y-4 text-lg font-light leading-8 text-body">
          {copy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h2 className="font-display mt-10 text-2xl font-bold tracking-[0.04em]">{copy.requirementsTitle}</h2>
        <ul className="mt-4 max-w-3xl space-y-3">
          {copy.requirements.map((item) => (
            <li key={item} className="flex gap-3 text-body">
              <StarBullet />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h2 className="font-display mt-10 text-2xl font-bold tracking-[0.04em]">{copy.moreTitle}</h2>
        <div className="mt-4 max-w-3xl space-y-3 text-body">
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
              <blockquote key={item.by} className="border border-white/15 bg-midnight p-5">
                <p className="font-light leading-7 text-body">{item.quote}</p>
                <footer className="mt-4 font-display text-sm font-semibold tracking-[0.06em]">{item.by}</footer>
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
        <div className="max-w-3xl space-y-3 text-lg font-light leading-8 text-body">
          {copy.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="border border-white/15 bg-night p-5">
            <h2 className="font-display text-2xl font-bold tracking-[0.04em]">{copy.studentsTitle}</h2>
            {copy.students.map((paragraph) => (
              <p key={paragraph} className="mt-3 font-light leading-7 text-body">
                {paragraph}
              </p>
            ))}
          </article>
          <article className="border border-white/15 bg-night p-5">
            <h2 className="font-display text-2xl font-bold tracking-[0.04em]">{copy.alumniTitle}</h2>
            {copy.alumni.map((paragraph) => (
              <p key={paragraph} className="mt-3 font-light leading-7 text-body">
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
        <p className="max-w-3xl text-lg font-light leading-8 text-body">{copy.intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.blocks.map((block) => (
            <article key={block.title} className="border border-white/15 bg-night p-5">
              <h2 className="font-display text-xl font-bold tracking-[0.04em]">{block.title}</h2>
              <p className="mt-3 font-light leading-7 text-body">{block.body}</p>
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
        <div className="max-w-3xl space-y-4 text-lg font-light leading-8 text-body">
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
          <div className="relative aspect-[16/10] overflow-hidden border border-white/15 bg-night">
            <Image src={item.image} alt={name} fill className="object-cover opacity-80" sizes="(min-width: 768px) 40vw, 100vw" />
            <div className="absolute inset-0 bg-night/20" />
          </div>
          <p className="text-lg font-light leading-8 text-body">{summary}</p>
        </div>
      </Section>
    </>
  );
}

function PageHero({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-16 md:px-8">
      {eyebrow ? <p className="font-display text-xs font-semibold tracking-[0.2em] text-haze">{eyebrow}</p> : null}
      <h1 className="font-display mt-3 text-5xl font-extrabold tracking-[0.08em] md:text-6xl">{title}</h1>
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
