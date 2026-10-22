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
          href: withLocale(catalogPath(accelerator), "he"),
          label: accelerator.name.he,
        },
      ],
    },
    {
      title: locale === "en" ? "Conferences" : "כנסים",
      links: conferences.map((item) => ({
        href: withLocale(catalogPath(item), "he"),
        label: item.name.he,
      })),
    },
  ];

  return (
    <footer className="relative z-10 border-t border-white/15">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-3 md:px-8">
        {columns.map((column) => (
          <div key={column.title}>
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-haze">{column.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-8">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-haze">
          {locale === "en" ? "Entrepreneurship Club · Reichman University" : "מועדון היזמות · אוניברסיטת רייכמן"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {social.map((item) => (
            <a key={item.href} href={item.href} rel="noreferrer">
              {item.label}
            </a>
          ))}
          <a href={privacyHref} rel="noreferrer">
            {locale === "en" ? "Privacy policy" : "מדיניות פרטיות"}
          </a>
        </div>
        <p className="text-sm text-haze">{locale === "en" ? "© Reichman University" : "© כל הזכויות שמורות לאוניברסיטת רייכמן"}</p>
      </div>
    </footer>
  );
}
