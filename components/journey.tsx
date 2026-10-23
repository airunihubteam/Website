"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { useMediaQuery } from "@/components/carousel";

const STEP_MS = 6500;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export type JourneyStep = { title: string; body: string; image: string };

// A journey told one stage at a time: numbered squares on a line above a panel with the stage's
// photo and text. It moves on by itself while in view, a thin bar counting down to the next
// stage, and holds still while hovered or focused. The squares are tabs, so arrow keys move
// between stages, and on phones the panel can be swiped. Every stage's text sits in the same
// cell, so the panel keeps the height of the longest one instead of jumping; on phones the text
// starts at the top, under the photo, and on wider screens it sits centered beside it.
export function Journey({ steps, label, stage, dir }: { steps: JourneyStep[]; label: string; stage: string; dir: "rtl" | "ltr" }) {
  const count = steps.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  const running = !reduced && !hovered && !focused && inView;
  const go = (index: number) => setActive(((index % count) + count) % count);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const onTabsKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    let next: number | null = null;
    if (event.key === forward) next = (active + 1) % count;
    else if (event.key === back) next = (active - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    go(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  const endSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(event.clientY - start.y)) return;
    // Swiping toward the reading direction's start brings the next stage.
    go(active + ((dx < 0) === (dir === "ltr") ? 1 : -1));
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <div ref={tabsRef} role="tablist" aria-label={label} onKeyDown={onTabsKey} className="relative grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
        {/* The line runs between the first and last squares' centers and fills up to the current one. */}
        <span aria-hidden="true" className="absolute top-5 h-[2px] bg-club/15" style={{ insetInline: `${50 / count}%` }} />
        <span
          aria-hidden="true"
          className="absolute top-5 h-[2px] bg-club transition-[width] duration-700"
          style={{ insetInlineStart: `${50 / count}%`, width: `${(active / (count - 1)) * (100 - 100 / count)}%`, transitionTimingFunction: EASE }}
        />
        {steps.map((step, index) => {
          const isActive = index === active;
          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => go(index)}
              className="group relative flex flex-col items-center gap-2"
            >
              <span
                className={`relative flex h-10 w-10 items-center justify-center border text-sm font-bold transition-[background-color,border-color,color,scale] duration-500 ${
                  isActive
                    ? "scale-110 border-club bg-club text-white"
                    : index < active
                      ? "border-club bg-[#dbe3ff] text-club"
                      : "border-club/25 bg-white text-club/70 group-hover:border-club group-hover:text-club"
                }`}
                style={{ transitionTimingFunction: EASE }}
              >
                {index + 1}
              </span>
              <span className={`hidden px-1 text-center text-sm leading-tight font-semibold transition-colors duration-300 md:block ${isActive ? "text-club" : "text-club/55 group-hover:text-club"}`}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        onPointerDown={(event) => {
          swipe.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={endSwipe}
        onPointerCancel={() => {
          swipe.current = null;
        }}
        className="relative mt-6 grid touch-pan-y overflow-hidden rounded-[28px] border border-[#e6e9f5] bg-white shadow-[0_24px_48px_-36px_rgba(15,45,150,0.5)] md:mt-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
      >
        <div className="relative aspect-[2/1] overflow-hidden bg-club md:aspect-auto md:min-h-[300px]">
          {steps.map((step, index) => (
            <Image
              key={step.image}
              src={step.image}
              alt=""
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className={`object-cover transition-[opacity,scale] duration-[1100ms] ${index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
              style={{ transitionTimingFunction: EASE }}
            />
          ))}
        </div>
        <div className="grid p-5 md:p-8 lg:px-10">
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <div
                key={step.title}
                aria-hidden={!isActive}
                className={`[grid-area:1/1] self-start transition-[opacity,translate] md:self-center duration-700 ${isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
                style={{ transitionTimingFunction: EASE, transitionDelay: isActive ? "120ms" : "0ms" }}
              >
                <p className="text-sm font-semibold text-club/60">
                  {stage} {index + 1}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-club lg:text-[28px]">{step.title}</h3>
                <span aria-hidden="true" className="mt-3 block h-[3px] w-12 bg-club" />
                <p className="mt-3 text-justify text-sm leading-6 text-ink/85 md:text-[15px] md:leading-7">{step.body}</p>
              </div>
            );
          })}
        </div>
        {/* Counts down to the next stage while the journey plays; still when it is held. */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-club/10">
          <span
            key={active}
            className="block h-full bg-club"
            style={{
              transformOrigin: dir === "rtl" ? "right" : "left",
              transform: running ? undefined : "scaleX(0)",
              animation: running ? `club-progress ${STEP_MS}ms linear forwards` : undefined,
            }}
            onAnimationEnd={() => go(active + 1)}
          />
        </span>
      </div>
    </div>
  );
}
