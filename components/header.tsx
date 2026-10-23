"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { nav } from "@/content/nav";
import { pick, withLocale, type Locale } from "@/lib/locale";

// A thin line that grows from the middle of a link on hover or keyboard focus.
const linkLine =
  "relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

// On desktop the header's parts drop in one after another on first load.
const dropIn = "md:motion-safe:animate-[header-drop_700ms_var(--ease)_both]";
const dropDelay = (index: number) => ({ animationDelay: `${120 + index * 70}ms` });

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The phone menu's open submenu, by its item's href; closed whenever the menu is toggled.
  const [subOpen, setSubOpen] = useState<string | null>(null);
  // The desktop submenu just used to pick a page. Hover and focus would otherwise keep it open
  // after the page changes underneath, so it stays shut until the pointer leaves its item.
  const [dismissed, setDismissed] = useState<string | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname() || "/";
  const other = locale === "he" ? "en" : "he";
  const tail = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const switchHref = withLocale(tail, other);
  const home = withLocale("/", locale);
  const isHome = pathname === home;

  const choose = (event: MouseEvent<HTMLAnchorElement>, menu?: string) => {
    setOpen(false);
    setSubOpen(null);
    if (menu) setDismissed(menu);
    event.currentTarget.blur();
  };
  const reichman = locale === "en" ? "/brand/reichman-en-white.png" : "/brand/wp/logo.webp";
  // The university mark leads to the university's own site, in a new tab; the club logo leads home.
  const universityHref = locale === "en" ? "https://www.runi.ac.il/en/" : "https://www.runi.ac.il/";
  const universityLabel =
    locale === "en" ? "Reichman University website (opens in a new tab)" : "אתר אוניברסיטת רייכמן (נפתח בכרטיסייה חדשה)";

  // Solid once the page moves, tucked away while scrolling down, back on the way up,
  // with a reading-progress line along its bottom edge.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.scale = `${max > 0 ? Math.min(y / max, 1) : 0} 1`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const transparent = isHome && !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 text-white transition-[background-color,box-shadow,translate] duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${
        transparent ? "bg-transparent" : "bg-club/95 shadow-[0_10px_30px_-14px_rgba(6,19,71,0.55)] backdrop-blur-md"
      }`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        {/* On phones both logos sit together and the menu button takes the other side. */}
        <div className="flex items-center gap-3">
          <Link
            href={home}
            aria-label={locale === "en" ? "Entrepreneurship Club, home page" : "מועדון היזמות, דף הבית"}
            className={`flex items-center gap-2 ${dropIn}`}
            style={dropDelay(0)}
          >
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
          <span aria-hidden="true" className="h-8 w-px bg-white/30 md:hidden" />
          {/* The university mark without the Adelson School lines: the image is cropped to its
              stars and name, which sit on the right of the Hebrew file and the left of the English one. */}
          <a
            href={universityHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={universityLabel}
            className="relative block aspect-[8/5] h-10 overflow-hidden md:hidden"
          >
            <Image
              src={locale === "en" ? "/brand/reichman-en-white.png" : "/brand/reichman-he-white.png"}
              alt=""
              fill
              // The whole image renders about 120-140px wide before the crop, so request that
              // width; asking for the visible 64px made the browser load a blurry small copy.
              sizes="160px"
              className={`object-cover ${locale === "en" ? "object-left" : "object-right"}`}
            />
          </a>
        </div>
        <nav
          id="site-nav"
          aria-label={locale === "en" ? "Primary" : "ראשי"}
          className={`absolute inset-x-0 top-full bg-club px-4 py-4 transition-[opacity,translate,visibility] duration-300 md:visible md:static md:translate-y-0 md:bg-transparent md:p-0 md:opacity-100 ${
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {/* Phones only: desktop reaches the home page through the logo. */}
            <li
              className={`max-md:transition-[opacity,translate] max-md:duration-500 md:hidden ${open ? "max-md:translate-y-0 max-md:opacity-100" : "max-md:-translate-y-2 max-md:opacity-0"}`}
            >
              <Link
                href={home}
                aria-current={isHome ? "page" : undefined}
                className={`text-base text-white ${linkLine}`}
                onClick={() => setOpen(false)}
              >
                {locale === "en" ? "Home" : "ראשי"}
              </Link>
            </li>
            {[...nav, null].map((item, index) => (
              <li
                key={item?.href ?? "language"}
                className={`group relative max-md:transition-[opacity,translate] max-md:duration-500 ${dropIn} ${open ? "max-md:translate-y-0 max-md:opacity-100" : "max-md:-translate-y-2 max-md:opacity-0"}`}
                style={{ ...dropDelay(index + 1), transitionDelay: open ? `${(index + 1) * 45}ms` : "0ms" }}
                onMouseLeave={item?.children ? () => setDismissed(null) : undefined}
              >
                {item ? (
                  <>
                    {/* On phones the row also holds a toggle for the submenu; on desktop it opens on hover. */}
                    <div className="flex items-center justify-between md:contents">
                      <Link
                        href={withLocale(item.href, locale)}
                        className={`text-base text-white ${linkLine}`}
                        onClick={(event) => choose(event, item.children ? item.href : undefined)}
                      >
                        {pick(item.label, locale)}
                        {item.children ? (
                          <span
                            aria-hidden="true"
                            className={`ms-1 inline-block text-xs transition-transform duration-300 max-md:hidden ${dismissed === item.href ? "" : "group-hover:rotate-180 group-focus-within:rotate-180"}`}
                          >
                            ▾
                          </span>
                        ) : null}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          className="-my-1 flex h-9 w-9 items-center justify-center text-white md:hidden"
                          aria-expanded={subOpen === item.href}
                          aria-controls={`submenu-${index}`}
                          aria-label={`${pick(item.label, locale)}: ${locale === "en" ? "submenu" : "תפריט משנה"}`}
                          onClick={() => setSubOpen((current) => (current === item.href ? null : item.href))}
                        >
                          <svg
                            viewBox="0 0 20 20"
                            width="16"
                            height="16"
                            aria-hidden="true"
                            className={`transition-transform duration-300 ${subOpen === item.href ? "rotate-180" : ""}`}
                          >
                            <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      ) : null}
                    </div>
                    {item.children ? (
                      // Phones: rows animate from 0fr to 1fr to fold the submenu open; desktop ignores both wrappers.
                      <div
                        id={`submenu-${index}`}
                        className={`grid transition-[grid-template-rows] duration-300 md:contents ${subOpen === item.href ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      >
                        <div className={`min-h-0 overflow-hidden md:contents ${subOpen === item.href ? "" : "max-md:invisible"}`}>
                          <ul
                            className={`mt-2 flex flex-col gap-2 bg-white p-3 text-club md:invisible md:absolute md:top-[calc(100%+0.75rem)] md:mt-0 md:min-w-48 md:translate-y-2 md:rounded-md md:opacity-0 md:shadow-[0_24px_50px_-20px_rgba(6,19,71,0.5)] md:transition-[opacity,translate,visibility] md:duration-300 md:before:absolute md:before:inset-x-0 md:before:-top-3 md:before:h-3 ${
                              dismissed === item.href
                                ? ""
                                : "md:group-focus-within:visible md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100"
                            }`}
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={withLocale(child.href, locale)}
                                  className="inline-block text-sm text-club transition-[translate,color] duration-300 hover:text-club/70 ltr:hover:translate-x-1 rtl:hover:-translate-x-1"
                                  onClick={(event) => choose(event, item.href)}
                                >
                                  {pick(child.label, locale)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link href={switchHref} className={`text-base text-white ${linkLine}`} hrefLang={other} onClick={() => setOpen(false)}>
                    {locale === "he" ? "English" : "עברית"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={`flex items-center gap-3 ${dropIn}`} style={dropDelay(nav.length + 2)}>
          {/* Three lines; when open, the middle one fades and the outer two cross into an X. */}
          <button
            type="button"
            className="-m-2 flex h-10 w-10 items-center justify-center text-white md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? (locale === "en" ? "Close menu" : "סגירת התפריט") : locale === "en" ? "Open menu" : "פתיחת התפריט"}
            onClick={() => {
              setOpen((value) => !value);
              setSubOpen(null);
            }}
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span className={`absolute inset-x-0 h-0.5 rounded bg-current transition-[top,rotate] duration-300 ${open ? "top-[7px] rotate-45" : "top-0"}`} />
              <span className={`absolute inset-x-0 top-[7px] h-0.5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute inset-x-0 h-0.5 rounded bg-current transition-[top,rotate] duration-300 ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
            </span>
          </button>
          <a href={universityHref} target="_blank" rel="noopener noreferrer" aria-label={universityLabel} className="hidden md:block">
            <Image src={reichman} alt="" width={150} height={48} className="h-12 w-auto" style={{ width: "auto" }} />
          </a>
        </div>
      </div>
      <span ref={progressRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/70 ltr:origin-left rtl:origin-right" style={{ scale: "0 1" }} />
    </header>
  );
}
