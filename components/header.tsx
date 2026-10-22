"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/nav";
import { pick, withLocale, type Locale } from "@/lib/locale";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const other = locale === "he" ? "en" : "he";
  const tail = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const switchHref = withLocale(tail, other);
  const home = withLocale("/", locale);
  const reichman = locale === "en" ? "/brand/reichman-en-white.png" : "/brand/reichman-he-white.png";

  return (
    <header className="relative z-10 border-b border-white/15">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 md:gap-6 md:px-8 md:py-5">
        <Link href={home} className="flex min-w-0 items-center gap-2 md:gap-3">
          <Image src="/brand/symbol-white.png" alt="" width={48} height={64} className="h-10 w-auto md:h-14" />
          <Image
            src="/brand/wordmark-white.png"
            alt={locale === "en" ? "Entrepreneurship Club, Reichman University" : "מועדון היזמות, אוניברסיטת רייכמן"}
            width={180}
            height={58}
            className="h-8 w-auto md:h-12"
          />
        </Link>
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <button
            type="button"
            className="font-display text-sm font-semibold tracking-[0.16em] text-haze md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {locale === "en" ? "Menu" : "תפריט"}
          </button>
          <Image src={reichman} alt={locale === "en" ? "Reichman University" : "אוניברסיטת רייכמן"} width={150} height={48} className="h-7 w-auto md:h-10" />
        </div>
      </div>
      <nav id="site-nav" aria-label={locale === "en" ? "Primary" : "ראשי"} className={open ? "block" : "hidden md:block"}>
        <ul className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pb-6 md:flex-row md:flex-wrap md:items-start md:gap-8 md:px-8">
          {nav.map((item) => (
            <li key={item.href + (item.children ? "-group" : "")}>
              <Link href={withLocale(item.href, locale)} className="font-display text-sm font-semibold tracking-[0.16em]" onClick={() => setOpen(false)}>
                {pick(item.label, locale)}
              </Link>
              {item.children ? (
                <ul className="mt-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={withLocale(child.href, locale)} className="text-sm text-haze" onClick={() => setOpen(false)}>
                        {pick(child.label, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li>
            <Link href={switchHref} className="font-display text-sm font-semibold tracking-[0.16em] text-haze" hrefLang={other}>
              {locale === "he" ? "English" : "עברית"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
