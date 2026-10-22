"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/nav";
import { pick, withLocale, type Locale } from "@/lib/locale";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname() || "/";
  const other = locale === "he" ? "en" : "he";
  const tail = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const switchHref = withLocale(tail, other);
  const home = withLocale("/", locale);
  const isHome = pathname === home;
  const reichman = locale === "en" ? "/brand/reichman-en-white.png" : "/brand/wp/logo.webp";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header className={`fixed inset-x-0 top-0 z-30 text-white ${isHome && !solid ? "bg-transparent" : "bg-club"}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href={home} className="flex items-center gap-2">
          <Image src="/brand/wp/logo.png" alt="" width={40} height={50} className="h-11 w-auto" style={{ width: "auto" }} />
          <span className="hidden text-sm leading-tight font-medium sm:block">
            {locale === "en" ? (
              <>
                Entrepreneurship Club
                <br />
                Reichman University
              </>
            ) : (
              <>
                מועדון היזמות
                <br />
                אוניברסיטת רייכמן
              </>
            )}
          </span>
        </Link>
        <nav id="site-nav" aria-label={locale === "en" ? "Primary" : "ראשי"} className={open ? "absolute inset-x-0 top-full bg-club px-4 py-4 md:static md:bg-transparent md:p-0" : "hidden md:block"}>
          <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link href={withLocale(item.href, locale)} className="text-base text-white" onClick={() => setOpen(false)}>
                  {pick(item.label, locale)}
                  {item.children ? <span aria-hidden="true"> ▾</span> : null}
                </Link>
                {item.children ? (
                  <ul className="mt-2 flex flex-col gap-2 bg-white p-3 text-club md:absolute md:top-full md:hidden md:min-w-44 md:shadow md:group-hover:flex md:group-focus-within:flex">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={withLocale(child.href, locale)} className="text-sm text-club" onClick={() => setOpen(false)}>
                          {pick(child.label, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li>
              <Link href={switchHref} className="text-base text-white" hrefLang={other} onClick={() => setOpen(false)}>
                {locale === "he" ? "English" : "עברית"}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-sm text-white md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {locale === "en" ? "Menu" : "תפריט"}
          </button>
          <Image src={reichman} alt={locale === "en" ? "Reichman University" : "אוניברסיטת רייכמן, בית ספר אדלסון ליזמות"} width={150} height={48} className="h-10 w-auto md:h-12" style={{ width: "auto" }} />
        </div>
      </div>
    </header>
  );
}
