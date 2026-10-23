import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/content/people";
import type { CatalogItem } from "@/content/catalog";
import { catalogPath } from "@/content/catalog";
import { pick, withLocale, type Locale } from "@/lib/locale";
import { Underline } from "@/components/underline";

export function Section({ title, children, align = "start" }: { title?: string; children: ReactNode; align?: "start" | "center" }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
      {title ? (
        <h2 className={align === "center" ? "text-center text-[32px] font-bold text-club" : "text-[32px] font-bold text-club"}>
          {align === "center" ? <Underline>{title}</Underline> : title}
        </h2>
      ) : null}
      <div className={title ? "mt-8" : ""}>{children}</div>
    </section>
  );
}

export function StarBullet() {
  return <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-club" aria-hidden="true" />;
}

export function PersonCard({ person, locale }: { person: Person; locale: Locale }) {
  const name = pick(person.name, locale);
  if (!name) return null;
  const role = pick(person.role, locale);
  const bio = pick(person.bio, locale);

  return (
    <article className="border border-[#e6e6e6] bg-white p-5">
      <h3 className="text-xl font-bold text-club">{name}</h3>
      {role ? <p className="mt-1 text-sm font-medium text-muted">{role}</p> : null}
      {bio ? <p className="mt-4 text-base leading-7 text-ink">{bio}</p> : null}
    </article>
  );
}

export function CatalogCard({ item, locale }: { item: CatalogItem; locale: Locale }) {
  const name = pick(item.name, locale) ?? item.name.he;
  const summary = pick(item.summary, locale);
  const target = locale === "en" && !item.summary.en ? "he" : locale;
  const href = withLocale(catalogPath(item), target);

  return (
    <Link href={href} className="block overflow-hidden bg-white shadow-sm">
      <div className="relative aspect-[16/10]">
        <Image src={item.image} alt={name} fill className="object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-club">{name}</h3>
        {summary ? <p className="mt-3 text-base leading-7 text-ink">{summary}</p> : null}
      </div>
    </Link>
  );
}
