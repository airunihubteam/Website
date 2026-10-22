"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

export type ClubSlide = {
  slug: string;
  name: string;
  summary?: string;
  logo: string;
  href: string;
  kind: string;
};

export type ClubSliderLabels = {
  title: string;
  all: string;
  allHref: string;
  open: string;
  of: string;
  goTo: string;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
// Distance between neighbouring cards, as a percentage of the card width.
const SPACING = 76;
const SIDE_SCALE = 0.64;
const AUTOPLAY_MS = 5200;

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

// Signed distance from the active card, taking the short way around the loop.
function relativeOffset(index: number, active: number, length: number) {
  let distance = wrap(index - active, length);
  if (distance > length / 2) distance -= length;
  return distance;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

type PointerState = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  velocity: number;
  step: number;
  engaged: boolean;
};

export function ClubSlider({ slides, labels, dir }: { slides: ClubSlide[]; labels: ClubSliderLabels; dir: "rtl" | "ltr" }) {
  const count = slides.length;
  // In RTL the next card sits to the left, so screen motion is mirrored.
  const sign = dir === "rtl" ? -1 : 1;
  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback((delta: number) => setActive((current) => wrap(current + delta, count)), [count]);
  const running = !reduced && !hovered && !focused && !dragging && inView;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Trackpad swipes. Vertical wheel still scrolls the page.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let accumulated = 0;
    let lockedUntil = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) {
        lockedUntil = now + 180;
        return;
      }
      accumulated += event.deltaX;
      if (Math.abs(accumulated) > 36) {
        go(accumulated > 0 ? sign : -sign);
        accumulated = 0;
        lockedUntil = now + 420;
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [go, sign]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastT: event.timeStamp,
      velocity: 0,
      step: ((cardRef.current?.offsetWidth ?? 400) * SPACING) / 100,
      engaged: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = pointer.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.engaged) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        pointer.current = null;
        return;
      }
      if (Math.abs(dx) < 6) return;
      state.engaged = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // The pointer may already be gone; the drag still works without capture.
      }
      setDragging(true);
    }
    const dt = event.timeStamp - state.lastT;
    if (dt > 0) state.velocity = (event.clientX - state.lastX) / dt;
    state.lastX = event.clientX;
    state.lastT = event.timeStamp;
    setDrag((dx * sign) / state.step);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>, commit: boolean) => {
    const state = pointer.current;
    pointer.current = null;
    if (!state || !state.engaged) return;
    suppressClick.current = true;
    setDragging(false);
    setDrag(0);
    if (!commit) return;
    const travelled = ((event.clientX - state.startX) * sign) / state.step;
    const velocity = state.velocity * sign;
    let moved = -Math.round(travelled);
    if (moved === 0 && (Math.abs(travelled) > 0.12 || Math.abs(velocity) > 0.35)) {
      moved = Math.abs(velocity) > 0.35 ? -Math.sign(velocity) : -Math.sign(travelled);
    }
    if (moved) go(moved);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") go(sign);
    else if (event.key === "ArrowLeft") go(-sign);
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(count - 1);
    else return;
    event.preventDefault();
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  const motion = (duration: number) => (dragging ? "none" : `${reduced ? 1 : duration}ms ${EASE}`);
  const current = slides[active];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={labels.title}
      className="relative overflow-x-clip bg-white py-10 md:py-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      {/* Heading stays centered; from md the "all programs" link sits on the same line at the end side. */}
      <div data-reveal-item="0" className="relative mx-auto grid w-full max-w-7xl px-5 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <span aria-hidden="true" className="hidden md:block" />
        <h2 className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{labels.title}</span>
        </h2>
        <Link
          href={labels.allHref}
          className="group hidden items-center gap-2 self-center justify-self-end pb-[9px] text-base font-semibold text-club/80 transition-colors duration-300 hover:text-club md:inline-flex"
        >
          {labels.all}
          <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      {/* Phones and tablets stack slider, then text; from lg the text column sits beside the slider. */}
      <div className="relative mx-auto mt-4 flex w-full max-w-7xl flex-col px-5 md:px-8 lg:mt-6 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-10">
        <div className="contents lg:flex lg:flex-col lg:items-start lg:gap-8">
          <div data-reveal-item="2" className="order-2 grid text-center lg:order-none lg:self-stretch lg:text-start">
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <div
                  key={slide.slug}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="[grid-area:1/1]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
                    transition: `opacity ${reduced ? 1 : 600}ms ${EASE} ${isActive ? 180 : 0}ms, transform ${reduced ? 1 : 800}ms ${EASE} ${isActive ? 180 : 0}ms`,
                  }}
                >
                  <p className="text-center text-sm font-semibold text-club/60 ltr:text-xs ltr:tracking-[0.24em] ltr:uppercase">{slide.kind}</p>
                  <h3 className="mt-1 text-center text-2xl font-bold text-club lg:mt-2 lg:text-4xl">{slide.name}</h3>
                  {slide.summary ? (
                    <p className="mx-auto mt-2 line-clamp-2 max-w-xl text-justify text-base leading-7 text-ink [text-align-last:center] lg:mx-0 lg:mt-4 lg:line-clamp-4 lg:text-lg lg:leading-8 lg:[text-align-last:auto]">
                      {slide.summary}
                    </p>
                  ) : null}
                  <Link
                    href={slide.href}
                    className="group mx-auto mt-4 flex w-fit items-center gap-2 border border-club px-5 py-2 text-sm font-semibold text-club transition-colors duration-300 hover:bg-club hover:text-white lg:mt-6"
                  >
                    {labels.open}
                    <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>

          <Link
            href={labels.allHref}
            className="group order-3 mt-5 inline-flex items-center gap-2 self-center text-sm font-semibold text-club/70 transition-colors duration-300 hover:text-club md:hidden"
          >
            {labels.all}
            <Chevron dir={dir} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <div data-reveal-item="1" className="relative order-1 lg:order-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[560px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(15,45,150,0.08),transparent)]"
          />
          <div
            ref={stageRef}
            className="relative grid touch-pan-y select-none place-items-center py-12 [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => endDrag(event, true)}
            onPointerCancel={(event) => endDrag(event, false)}
            onDragStart={(event) => event.preventDefault()}
            onClickCapture={(event) => {
              if (!suppressClick.current) return;
              suppressClick.current = false;
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {slides.map((slide, index) => {
              const offset = relativeOffset(index, active, count);
              const rel = offset + drag;
              const distance = Math.abs(rel);
              const near = Math.min(distance, 1);
              const isActive = offset === 0;
              const shown = Math.abs(offset) <= 1;
              const scale = 1 - near * (1 - SIDE_SCALE) - Math.max(0, Math.min(distance - 1, 1)) * 0.08;
              const opacity = distance <= 1 ? 1 - near * 0.45 : Math.max(0, 0.55 - (distance - 1) * 0.9);

              return (
                <div
                  key={slide.slug}
                  ref={index === 0 ? cardRef : undefined}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slide.name}, ${index + 1} ${labels.of} ${count}`}
                  aria-hidden={!isActive}
                  inert={!shown}
                  className="relative w-[min(580px,80vw,60vh)] [grid-area:1/1] lg:w-[min(640px,71%,62vh)]"
                  style={{
                    transform: `translate3d(${rel * SPACING * sign}%, 0, 0) scale(${scale})`,
                    opacity,
                    zIndex: 100 - Math.round(distance * 10),
                    transition: dragging ? "none" : `transform ${motion(900)}, opacity ${motion(700)}`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[28px] shadow-[0_2px_6px_rgba(15,45,150,0.06),0_24px_50px_-22px_rgba(15,45,150,0.4)]"
                    style={{ opacity: 1 - near, transition: `opacity ${motion(700)}` }}
                  />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-white ring-1 ring-[#e9ebf5]">
                    <div
                      className="absolute inset-[16%_12%]"
                      style={{ filter: `grayscale(${near}) contrast(${1 - near * 0.1})`, transition: `filter ${motion(700)}` }}
                    >
                      <Image
                        src={slide.logo}
                        alt=""
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 480px, 64vw"
                        className="object-contain"
                      />
                    </div>
                    {isActive ? (
                      <Link href={slide.href} className="absolute inset-0 rounded-[28px]" aria-label={`${labels.open}: ${slide.name}`} />
                    ) : (
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute inset-0 cursor-pointer rounded-[28px]"
                        aria-label={`${labels.goTo} ${slide.name}`}
                        onClick={() => go(offset)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="-mt-4 flex items-center justify-center gap-2">
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <button
                  key={slide.slug}
                  type="button"
                  aria-label={`${labels.goTo} ${slide.name}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={`relative block h-[3px] overflow-hidden rounded-full transition-[width,background-color] duration-700 group-hover:bg-club/30 ${isActive ? "bg-club/30" : "bg-club/15"}`}
                    style={{ width: isActive ? 44 : 14, transitionTimingFunction: EASE }}
                  >
                    {isActive ? (
                      // While autoplay runs the bar fills as a countdown to the next club; whenever it is
                      // paused (hover, focus, drag, off screen) the selected bar shows solid dark blue.
                      <span
                        key={active}
                        className="absolute inset-0 rounded-full bg-club"
                        style={{
                          transformOrigin: dir === "rtl" ? "right" : "left",
                          transform: running ? undefined : "scaleX(1)",
                          animation: running ? `club-progress ${AUTOPLAY_MS}ms linear forwards` : undefined,
                        }}
                        onAnimationEnd={() => go(1)}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic="true">
        {`${current.name}, ${active + 1} ${labels.of} ${count}`}
      </p>
    </section>
  );
}

// Points towards the reading direction's end: right in LTR, left in RTL.
function Chevron({ dir, className = "" }: { dir: "rtl" | "ltr"; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className={className}>
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={dir === "rtl" ? undefined : "rotate(180 10 10)"}
      />
    </svg>
  );
}
