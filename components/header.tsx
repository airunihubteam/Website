"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname() || "/";
  const other = locale === "he" ? "en" : "he";
  const tail = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const switchHref = withLocale(tail, other);
  const home = withLocale("/", locale);
  const isHome = pathname === home;
  const reichman = locale === "en" ? "/brand/reichman-en-white.png" : "/brand/wp/logo.webp";

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
          <Link href={home} className={`flex items-center gap-2 ${dropIn}`} style={dropDelay(0)}>
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
          <span className="relative block aspect-[8/5] h-10 overflow-hidden md:hidden">
            <Image
              src={locale === "en" ? "/brand/reichman-en-white.png" : "/brand/reichman-he-white.png"}
              alt={locale === "en" ? "Reichman University" : "אוניברסיטת רייכמן"}
              fill
              // The whole image renders about 120-140px wide before the crop, so request that
              // width; asking for the visible 64px made the browser load a blurry small copy.
              sizes="160px"
              className={`object-cover ${locale === "en" ? "object-left" : "object-right"}`}
            />
          </span>
        </div>
        <nav
          id="site-nav"
          aria-label={locale === "en" ? "Primary" : "ראשי"}
          className={`absolute inset-x-0 top-full bg-club px-4 py-4 transition-[opacity,translate,visibility] duration-300 md:visible md:static md:translate-y-0 md:bg-transparent md:p-0 md:opacity-100 ${
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {[...nav, null].map((item, index) => (
              <li
                key={item?.href ?? "language"}
                className={`group relative max-md:transition-[opacity,translate] max-md:duration-500 ${dropIn} ${open ? "max-md:translate-y-0 max-md:opacity-100" : "max-md:-translate-y-2 max-md:opacity-0"}`}
                style={{ ...dropDelay(index + 1), transitionDelay: open ? `${index * 45}ms` : "0ms" }}
              >
                {item ? (
                  <>
                    <Link href={withLocale(item.href, locale)} className={`text-base text-white ${linkLine}`} onClick={() => setOpen(false)}>
                      {pick(item.label, locale)}
                      {item.children ? (
                        <span aria-hidden="true" className="ms-1 inline-block text-xs transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
                          ▾
                        </span>
                      ) : null}
                    </Link>
                    {item.children ? (
                      <ul className="mt-2 flex flex-col gap-2 bg-white p-3 text-club md:invisible md:absolute md:top-[calc(100%+0.75rem)] md:mt-0 md:min-w-48 md:translate-y-2 md:rounded-md md:opacity-0 md:shadow-[0_24px_50px_-20px_rgba(6,19,71,0.5)] md:transition-[opacity,translate,visibility] md:duration-300 md:group-focus-within:visible md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100 md:before:absolute md:before:inset-x-0 md:before:-top-3 md:before:h-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={withLocale(child.href, locale)}
                              className="inline-block text-sm text-club transition-[translate,color] duration-300 hover:text-club/70 ltr:hover:translate-x-1 rtl:hover:-translate-x-1"
                              onClick={() => setOpen(false)}
                            >
                              {pick(child.label, locale)}
                            </Link>
                          </li>
                        ))}
                      </ul>
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
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-white md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute inset-x-0 h-0.5 rounded bg-current transition-[top,rotate] duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute inset-x-0 h-0.5 rounded bg-current transition-[top,rotate] duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
            {open ? (locale === "en" ? "Close" : "סגירה") : locale === "en" ? "Menu" : "תפריט"}
          </button>
          <Image src={reichman} alt={locale === "en" ? "Reichman University" : "אוניברסיטת רייכמן, בית ספר אדלסון ליזמות"} width={150} height={48} className="hidden h-12 w-auto md:block" style={{ width: "auto" }} />
        </div>
      </div>
      <span ref={progressRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/70 ltr:origin-left rtl:origin-right" style={{ scale: "0 1" }} />
    </header>
  );
}
