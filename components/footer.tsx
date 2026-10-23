import Link from "next/link";
import { accelerator, conferences, programs, catalogPath } from "@/content/catalog";
import { privacyHref, social } from "@/content/nav";
import { pick, withLocale, type Locale } from "@/lib/locale";

export function Footer({ locale }: { locale: Locale }) {
  const programItems = programs.filter((item) => locale === "he" || item.summary.en);
  const columns = [
    {
      title: locale === "en" ? "Programs" : "תוכניות",
      links: programItems.map((item) => ({
        href: withLocale(catalogPath(item), locale),
        label: pick(item.name, locale) ?? item.name.he,
      })),
    },
    {
      title: locale === "en" ? "Accelerator" : "אקסלרטור",
      links: [
        {
          href: withLocale(catalogPath(accelerator), locale),
          label: pick(accelerator.name, locale) ?? accelerator.name.he,
        },
      ],
    },
    {
      title: locale === "en" ? "Conferences" : "כנסים",
      links: conferences
        .filter((item) => locale === "he" || item.summary.en)
        .map((item) => ({
          href: withLocale(catalogPath(item), locale),
          label: pick(item.name, locale) ?? item.name.he,
        })),
    },
  ];

  return (
    <footer className="border-t border-[#e6e6e6] bg-white text-ink">
      {/* Phones: the long programs list fills one column and the two short lists stack beside it. */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 md:grid-cols-3 md:gap-8 md:px-8">
        {columns.map((column, index) => (
          <div key={column.title} className={index === 0 ? "row-span-2 md:row-span-1" : undefined}>
            <p className="text-xl font-medium text-club md:text-2xl">{column.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-ink hover:text-club">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-8">
        <p className="text-sm text-muted">
          {locale === "en" ? "Entrepreneurship Club · Reichman University" : "מועדון היזמות · אוניברסיטת רייכמן"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {social.map((item) => (
            <a key={item.href} href={item.href} className="text-club" rel="noreferrer">
              {item.label}
            </a>
          ))}
          <a href={privacyHref} className="text-club" rel="noreferrer">
            {locale === "en" ? "Privacy policy" : "מדיניות פרטיות"}
          </a>
        </div>
        <p className="text-sm text-muted">{locale === "en" ? "© Reichman University" : "© כל הזכויות שמורות לאוניברסיטת רייכמן"}</p>
      </div>
    </footer>
  );
}
