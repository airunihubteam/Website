import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/content/people";
import type { CatalogItem } from "@/content/catalog";
import { catalogPath } from "@/content/catalog";
import { pick, withLocale, type Locale } from "@/lib/locale";

export function Section({ eyebrow, title, children }: { eyebrow?: string; title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
      {eyebrow ? <p className="font-display text-xs font-semibold tracking-[0.2em] text-haze">{eyebrow}</p> : null}
      {eyebrow ? <div className="mt-3 h-px bg-white/15" /> : null}
      {title ? <h2 className="font-display mt-6 text-3xl font-bold tracking-[0.06em] md:text-4xl">{title}</h2> : null}
      <div className={title || eyebrow ? "mt-6" : ""}>{children}</div>
    </section>
  );
}

export function StarBullet() {
  return <span className="star-mark mt-2 inline-block h-3 w-3 shrink-0" aria-hidden="true" />;
}

export function PersonCard({ person, locale }: { person: Person; locale: Locale }) {
  const name = pick(person.name, locale);
  if (!name) return null;
  const role = pick(person.role, locale);
  const bio = pick(person.bio, locale);

  return (
    <article className="border border-white/15 bg-night p-5">
      <span className="star-mark mb-4 block h-5 w-5" aria-hidden="true" />
      <h3 className="font-display text-xl font-bold tracking-[0.04em]">{name}</h3>
      {role ? <p className="mt-1 font-display text-xs font-semibold tracking-[0.16em] text-haze">{role}</p> : null}
      {bio ? <p className="mt-4 text-base font-light leading-7 text-body">{bio}</p> : null}
    </article>
  );
}

export function CatalogCard({ item, locale }: { item: CatalogItem; locale: Locale }) {
  const name = pick(item.name, locale) ?? item.name.he;
  const summary = pick(item.summary, locale);
  const target = locale === "en" && !item.summary.en ? "he" : locale;
  const href = withLocale(catalogPath(item), target);

  return (
    <Link href={href} className="block border border-white/15 bg-night">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={item.image} alt={name} fill className="object-cover opacity-80" sizes="(min-width: 768px) 30vw, 100vw" />
        <div className="absolute inset-0 bg-night/20" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-bold tracking-[0.04em]">{name}</h3>
        {summary ? <p className="mt-3 text-base font-light leading-7 text-body">{summary}</p> : null}
      </div>
    </Link>
  );
}
