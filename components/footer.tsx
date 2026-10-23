import Image from "next/image";
import Link from "next/link";
import { accelerator, conferences, programs, catalogPath } from "@/content/catalog";
import { privacyHref, social } from "@/content/nav";
import { SocialIcon } from "@/components/icons";
import { pick, withLocale, type Locale } from "@/lib/locale";

const reichman = {
  he: { src: "/brand/reichman-he-color.png", width: 484, height: 163 },
  en: { src: "/brand/reichman-en-color.png", width: 798, height: 225 },
};

const footerLink =
  "inline-block text-[15px] font-light text-ink transition-[translate,color] duration-300 hover:text-club ltr:hover:translate-x-1 rtl:hover:-translate-x-1";

function FooterHeading({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`text-xl font-medium text-club md:text-2xl ${className}`}>{children}</p>;
}

// The site's footer, laid out like the old site's: the programs; the accelerator, the conferences
// and the club's social accounts; and the Reichman mark above the club's motto, "Bring your dreams
// to life" ("הגשימו את חלומותיכם" in Hebrew). The old footer's thin blue gradient line runs
// along its top. Its parts rise in with the page's reveal (see RevealController).
export function Footer({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const programItems = programs.filter((item) => !en || item.summary.en);
  const conferenceItems = conferences.filter((item) => !en || item.summary.en);
  const link = (item: { name: { he: string; en?: string } } & Parameters<typeof catalogPath>[0]) => ({
    href: withLocale(catalogPath(item), locale),
    label: pick(item.name, locale) ?? item.name.he,
  });
  const mark = reichman[locale];

  return (
    <footer className="bg-white text-ink">
      <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,#46a1d8,#2b68b8_25%,#0f2e96_50%,#2b68b8_75%,#46a1d8)]" />

      <div data-reveal className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 pt-10 pb-8 md:grid-cols-4 md:gap-8 md:px-8 md:pt-14 md:pb-10">
        {/* Phones: the long programs list fills one column and the accelerator and conferences sit
            beside it. */}
        <div data-reveal-item="1" className="row-span-2 md:row-span-1">
          <FooterHeading>{en ? "Programs" : "תוכניות"}</FooterHeading>
          <ul className="mt-3 flex flex-col gap-1.5">
            {programItems.map((item) => {
              const { href, label } = link(item);
              return (
                <li key={href}>
                  <Link href={href} className={footerLink}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-reveal-item="2">
          <FooterHeading>{en ? "Accelerator" : "אקסלרטור"}</FooterHeading>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <Link href={link(accelerator).href} className={footerLink}>
                {link(accelerator).label}
              </Link>
            </li>
          </ul>
          <FooterHeading className="mt-8">{en ? "Conferences" : "כנסים"}</FooterHeading>
          <ul className="mt-3 flex flex-col gap-1.5">
            {conferenceItems.map((item) => {
              const { href, label } = link(item);
              return (
                <li key={href}>
                  <Link href={href} className={footerLink}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <FooterHeading className="mt-8">{en ? "Follow Us" : "עקבו אחרינו"}</FooterHeading>
          <div className="mt-4 flex gap-2.5">
            {social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center border border-club/20 text-club transition-[translate,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-club hover:bg-club hover:text-white"
              >
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* The Reichman mark above the motto, both at the footer's far end. */}
        <div data-reveal-item="3" className="col-span-2 flex flex-col gap-8 md:items-end md:justify-between">
          <a href="https://www.runi.ac.il/" target="_blank" rel="noopener noreferrer" className="block self-start transition-opacity duration-300 hover:opacity-80 md:self-end">
            <Image
              src={mark.src}
              alt={en ? "Reichman University, Adelson School of Entrepreneurship" : "אוניברסיטת רייכמן, בית ספר אדלסון ליזמות"}
              width={mark.width}
              height={mark.height}
              className="h-14 w-auto md:h-16"
            />
          </a>
          {/* The old footer's motto, "Bring your dreams to life" (in Hebrew on the Hebrew site), in light
              lines that rise in one after another. */}
          <p
            className={`text-right text-[44px] leading-[1.02] font-extralight text-club md:text-[56px] ${en ? "tracking-[0.04em] uppercase" : "tracking-[0.01em]"}`}
          >
            {(en ? ["Bring your", "dreams", "to life"] : ["הגשימו", "את חלומותיכם"]).map((line, index) => (
              <span key={line} data-reveal-item={String(index + 4)} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-[#e9ecf6] px-5 py-5 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>{en ? "© All rights reserved to Reichman University" : "© כל הזכויות שמורות לאוניברסיטת רייכמן"}</p>
        <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="text-club transition-colors duration-300 hover:text-club/70">
          {en ? "Privacy Policy" : "מדיניות פרטיות"}
        </a>
      </div>
    </footer>
  );
}
