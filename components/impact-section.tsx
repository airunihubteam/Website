"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { Chevron } from "@/components/icons";

export type ImpactStat = {
  value: number;
  prefix?: string;
  label: string;
};

export type JoinCard = {
  href: string;
  title: string;
  summary: string;
  cta: string;
  featured?: boolean;
};

export type ImpactLabels = {
  stats: string;
  join: string;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const COUNT_MS = 1800;
const STAGGER_MS = 140;

// Exponential ease-out: fast start, long soft landing on the final number.
function easeOut(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function subscribeNothing() {
  return () => {};
}

// Decorative stars: [inline-start %, top %, size px, opacity, delay s].
type StarSpot = [number, number, number, number, number];

const statStars: StarSpot[] = [
  [6, 14, 18, 0.16, 0],
  [92, 10, 12, 0.14, 1.6],
  [28, 6, 10, 0.12, 4],
];

const joinStars: StarSpot[] = [
  [86, 10, 14, 0.12, 0.8],
  [10, 16, 12, 0.14, 2.6],
  [3, 70, 20, 0.1, 1.2],
  [95, 78, 12, 0.12, 3.4],
];

function FloatingStars({ spots }: { spots: StarSpot[] }) {
  return spots.map(([start, top, size, opacity, delay]) => (
    <Star
      key={`${start}-${top}`}
      className="pointer-events-none absolute text-club motion-safe:animate-[impact-float_8s_ease-in-out_infinite]"
      style={{ insetInlineStart: `${start}%`, top: `${top}%`, width: size, height: size, opacity, animationDelay: `${delay}s` }}
    />
  ));
}

export function ImpactStats({ stats, label }: { stats: ImpactStat[]; label: string }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  // The server renders the final numbers; once hydrated they wait at zero until the panel is seen.
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduced) return;
    let frame = 0;
    const total = COUNT_MS + STAGGER_MS * stats.length;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          setElapsed(Math.min(now - start, total));
          if (now - start < total) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(panel);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, stats.length]);

  const shown = (stat: ImpactStat, index: number) => {
    if (!hydrated || reduced) return stat.value;
    if (elapsed === null) return 0;
    const t = Math.min(Math.max((elapsed - index * STAGGER_MS) / COUNT_MS, 0), 1);
    return Math.round(stat.value * easeOut(t));
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <FloatingStars spots={statStars} />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="text-center text-sm font-semibold text-club/60 ltr:tracking-[0.2em] ltr:uppercase">{label}</p>

        <div
          ref={panelRef}
          className="relative mt-3 overflow-hidden rounded-[28px] bg-gradient-to-l from-club to-[#0a1f6e] px-4 py-7 text-white shadow-[0_30px_60px_-30px_rgba(15,45,150,0.6)] md:px-6"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 ${elapsed !== null ? "animate-[impact-shine_1.8s_ease-out_forwards]" : ""}`}
          />
          <Star className="pointer-events-none absolute -bottom-6 end-6 h-24 w-24 text-white/[0.06]" />
          <dl className="relative grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center text-center md:border-s md:border-white/15 md:first:border-s-0">
                <dt className="order-2 mt-1 text-base text-white/75">{stat.label}</dt>
                <dd className="order-1 text-4xl font-bold tabular-nums sm:text-5xl md:text-6xl" dir="ltr">
                  {stat.prefix}
                  {shown(stat, index).toLocaleString("en-US")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function JoinSection({ cards, title, dir }: { cards: JoinCard[]; title: string; dir: "rtl" | "ltr" }) {
  const spotlight = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <FloatingStars spots={joinStars} />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <h2 className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{title}</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              onPointerMove={spotlight}
              className={`group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border p-6 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 ${
                card.featured
                  ? "border-club bg-club text-white shadow-[0_24px_50px_-28px_rgba(15,45,150,0.7)]"
                  : "border-[#e6e9f5] bg-white text-club hover:border-club/30 hover:shadow-[0_24px_50px_-28px_rgba(15,45,150,0.45)]"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), ${card.featured ? "rgba(255,255,255,0.16)" : "rgba(15,45,150,0.08)"}, transparent 70%)`,
                }}
              />
              <span
                aria-hidden="true"
                className={`text-5xl leading-none font-bold text-transparent tabular-nums transition-colors duration-500 ${
                  card.featured ? "[-webkit-text-stroke:1.5px_rgba(255,255,255,0.45)] group-hover:text-white" : "[-webkit-text-stroke:1.5px_rgba(15,45,150,0.3)] group-hover:text-club"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-5 text-xl font-bold">{card.title}</span>
              <span className={`mt-2 line-clamp-4 text-justify text-[15px] leading-6 ${card.featured ? "text-white/80" : "text-ink/80"}`}>{card.summary}</span>
              <span className="mt-auto block pt-5">
                <span
                  className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    card.featured ? "border-white hover:bg-white hover:text-club" : "border-club hover:bg-club hover:text-white"
                  }`}
                >
                  {card.cta}
                  <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-[3px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ltr:origin-left rtl:origin-right ${card.featured ? "bg-white" : "bg-club"}`}
                style={{ transitionTimingFunction: EASE }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path d="M12 1.8l2.9 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.3 5.7 21l1.6-7.1L1.9 9.1l7.2-.7z" fill="currentColor" />
    </svg>
  );
}
