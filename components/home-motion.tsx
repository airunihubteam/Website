"use client";

import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

// Sections below the fold start hidden and rise in the first time they enter the viewport.
// Anything already on screen when the page hydrates is left alone, and without JS nothing is hidden.
export function RevealController() {
  useEffect(() => {
    if (reducedMotion()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      element.classList.add("reveal-pending");
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}

export type RailSection = { id: string; label: string };

// A quiet column of markers on the page edge that shows only while the page scrolls:
// the current section grows into a bar, its name shows for a moment whenever it changes,
// and every marker jumps to its section.
export function SectionRail({ sections, label }: { sections: RailSection[]; label: string }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [flash, setFlash] = useState<string | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const flashTimer = useRef(0);
  const hideTimer = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setScrolling(false), 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id);
          setFlash(id);
          window.clearTimeout(flashTimer.current);
          flashTimer.current = window.setTimeout(() => setFlash(null), 1400);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => {
      observer.disconnect();
      window.clearTimeout(flashTimer.current);
    };
  }, [sections]);

  return (
    <nav
      aria-label={label}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setEngaged(false);
      }}
      className={`fixed end-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 transition-[opacity,translate] xl:flex ${
        scrolling || engaged ? "translate-x-0 opacity-100 duration-300" : "pointer-events-none opacity-0 duration-500 ltr:translate-x-2 rtl:-translate-x-2"
      }`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={isActive ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(section.id);
            }}
            className="group relative flex h-7 w-5 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`block w-1.5 rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.85)] transition-[height,background-color] duration-500 ${isActive ? "h-7 bg-club" : "h-1.5 bg-club/35 group-hover:bg-club/70"}`}
              style={{ transitionTimingFunction: "var(--ease)" }}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute end-full me-2 rounded-md bg-white px-3 py-1 text-sm font-semibold whitespace-nowrap text-club shadow-[0_10px_30px_-12px_rgba(6,19,71,0.45)] transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                flash === section.id ? "translate-x-0 opacity-100" : "opacity-0 ltr:-translate-x-1 rtl:translate-x-1"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
