"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { Chevron } from "@/components/icons";

export type ImpactStat = {
  value: number;
  prefix?: string;
  label: string;
};

export type JoinIconName = "search" | "checklist" | "bulb" | "rocket";

export type JoinCard = {
  href: string;
  title: string;
  summary: string;
  cta: string;
  icon: JoinIconName;
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
        <p data-reveal-item="0" className="text-center text-sm font-semibold text-club/60 ltr:tracking-[0.2em] ltr:uppercase">
          {label}
        </p>

        <div
          ref={panelRef}
          data-reveal-item="1"
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
        <h2 data-reveal-item="0" className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{title}</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              data-reveal-item={String(index + 1)}
              onPointerMove={spotlight}
              className={`group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border p-6 lg:min-h-[360px] xl:min-h-[300px] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 ${
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
              <JoinIcon name={card.icon} featured={card.featured} />
              <span className="text-xl font-bold">{card.title}</span>
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

const line = { fill: "none", stroke: "currentColor", strokeWidth: 0.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
// A check or similar mark that draws itself along its length on hover.
const drawOnHover = "[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 group-hover:[stroke-dashoffset:0]";
const STAR = "M12 1.8l2.9 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.3 5.7 21l1.6-7.1L1.9 9.1l7.2-.7z";

// Six stars on an arc around the lens, largest first and shrinking as they curve down,
// like the star arc in the Reichman University mark: [x, y, size, tilt].
const logoArc: [number, number, number, number][] = [
  [14.6, 2, 3, -14],
  [8.4, 0.9, 2.5, -24],
  [3, 4.1, 2.1, -34],
  [0.9, 11.6, 1.7, -44],
  [3, 15.9, 1.3, -54],
  [6.9, 18.6, 1, -64],
];

// A line icon in the card's corner, behind the text, that acts out its meaning on hover.
// The color is solid and the whole icon fades as one layer, so where lines meet or
// overlap they stay the same shade.
function JoinIcon({ name, featured }: { name: JoinIconName; featured?: boolean }) {
  return (
    <svg
      viewBox="-4 -4 32 32"
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-4 -z-10 h-36 w-36 transition-opacity duration-500 lg:bottom-[76px] lg:h-24 lg:w-24 xl:bottom-4 xl:h-36 xl:w-36 ${
        // The rocket sits beside the widest button, so it moves further into the corner;
        // the box may overhang the edge, but the drawing itself stays inside the card.
        featured ? "-end-3 text-white opacity-30 group-hover:opacity-80" : "end-4 text-club opacity-20 group-hover:opacity-60"
      }`}
    >
      {name === "search" ? (
        <>
          {/* The search committee: the lens scans, and the stars of the Reichman mark rise around it. */}
          <g className="motion-safe:group-hover:animate-[lens-scan_2.4s_ease-in-out_infinite]">
            <circle cx="10" cy="10" r="6.5" {...line} />
            <path d="M14.6 14.6l5.6 5.6" {...line} strokeWidth={1.6} />
            <circle cx="10" cy="8.3" r="1.9" {...line} />
            <path d="M6.8 13.6c.6-1.9 1.8-2.9 3.2-2.9s2.6 1 3.2 2.9" {...line} />
          </g>
          {logoArc.map(([x, y, size, tilt], index) => (
            <g
              key={`${x}-${y}`}
              className="scale-0 transition-[scale] duration-500 group-hover:scale-100"
              style={{ transformOrigin: `${x}px ${y}px`, transitionDelay: `${120 + index * 80}ms`, transitionTimingFunction: EASE }}
            >
              <path d={STAR} transform={`translate(${x} ${y}) rotate(${tilt}) scale(${size / 20}) translate(-12 -12)`} fill="currentColor" />
            </g>
          ))}
        </>
      ) : null}

      {name === "bulb" ? (
        <>
          {/* Lights up: the glass fills with light, glows, and rays appear around it. */}
          <path
            d="M12 2.5a6.5 6.5 0 0 0-3.9 11.7c.7.5 1.1 1.3 1.1 2.1v.7h5.6v-.7c0-.8.4-1.6 1.1-2.1A6.5 6.5 0 0 0 12 2.5z"
            fill="#9fb3ff"
            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:drop-shadow-[0_0_3px_rgba(15,45,150,0.5)]"
          />
          <path d="M12 2.5a6.5 6.5 0 0 0-3.9 11.7c.7.5 1.1 1.3 1.1 2.1v.7h5.6v-.7c0-.8.4-1.6 1.1-2.1A6.5 6.5 0 0 0 12 2.5z" {...line} />
          <path d="M10 12.6l1-1.5 1 1.5 1-1.5 1 1.5M12 12.6v4.4" {...line} />
          <path d="M9.6 19.4h4.8M10.4 21.8h3.2" {...line} />
          <g
            className="scale-75 opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100"
            style={{ transformOrigin: "12px 9px" }}
          >
            <path d="M12 0.7v-2M17.9 3.1l1.4-1.4M6.1 3.1L4.7 1.7M20.3 9h2M3.7 9h-2" {...line} />
          </g>
        </>
      ) : null}

      {name === "checklist" ? (
        <>
          {/* The checklist ticks itself off, one line after another. */}
          <path d="M9 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" {...line} />
          <rect x="9" y="2.5" width="6" height="3" rx="1" {...line} />
          <path d="M11.2 10.2h5M11.2 14.2h5M11.2 18.2h3.4" {...line} />
          {[10.2, 14.2, 18.2].map((y, index) => (
            <path
              key={y}
              d={`M7.2 ${y}l.9.9 1.6-1.8`}
              {...line}
              pathLength={1}
              className={drawOnHover}
              style={{ transitionDelay: `${index * 160}ms` }}
            />
          ))}
        </>
      ) : null}

      {name === "rocket" ? (
        <>
          {/* Lifts off: the rocket rises on a flickering flame. */}
          <g className="transition-[translate] duration-700 group-hover:-translate-y-[2.5px]">
            <path
              d="M10.6 18.3c0 1.8 1.4 3.6 1.4 3.6s1.4-1.8 1.4-3.6z"
              fill="#ffffff"
              className="scale-y-50 opacity-0 transition-[opacity,scale] duration-500 group-hover:scale-y-100 group-hover:opacity-90 motion-safe:group-hover:animate-[flame-flicker_0.35s_ease-in-out_infinite_alternate]"
              style={{ transformOrigin: "12px 18.3px" }}
            />
            <path d="M12 2C14.9 4.4 16.3 7.8 16.3 11.6V13.2L18.8 15.8V19L16.3 17.6H7.7L5.2 19V15.8L7.7 13.2V11.6C7.7 7.8 9.1 4.4 12 2Z" {...line} />
            <circle cx="12" cy="9.4" r="1.7" {...line} />
          </g>
          <path d="M7.2 20.8v1.4M16.8 20.8v1.4M12 23.4v1.2" {...line} className="opacity-0 transition-opacity delay-150 duration-500 group-hover:opacity-100" />
        </>
      ) : null}
    </svg>
  );
}

function Star({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path d="M12 1.8l2.9 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.3 5.7 21l1.6-7.1L1.9 9.1l7.2-.7z" fill="currentColor" />
    </svg>
  );
}
