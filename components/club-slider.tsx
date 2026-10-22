"use client";

import Image from "next/image";
import Link from "next/link";
import { CarouselBars, useCarousel } from "@/components/carousel";

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

export function ClubSlider({ slides, labels, dir }: { slides: ClubSlide[]; labels: ClubSliderLabels; dir: "rtl" | "ltr" }) {
  const count = slides.length;
  const { active, setActive, go, dragging, running, reduced, place, motion, rootRef, stageRef, cardRef, rootProps, stageProps } = useCarousel<HTMLElement>({
    count,
    dir,
    spacing: SPACING,
    sideScale: SIDE_SCALE,
  });
  const current = slides[active];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={labels.title}
      className="relative overflow-x-clip bg-white py-10 md:py-14"
      {...rootProps}
    >
      {/* Heading stays centered; from md the "all programs" link sits on the same line at the end side. */}
      <div data-reveal-item="0" className="relative mx-auto grid w-full max-w-7xl px-5 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <span aria-hidden="true" className="hidden md:block" />
        <h2 className="text-center text-[32px] font-bold text-club">
          <span className="club-underline">{labels.title}</span>
        </h2>
        <Link
          href={labels.allHref}
          data-press
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
                    <p className="mx-auto mt-2 max-w-xl text-justify text-base leading-7 text-ink [text-align-last:center] lg:mx-0 lg:mt-4 lg:line-clamp-4 lg:text-lg lg:leading-8 lg:[text-align-last:auto]">
                      {slide.summary}
                    </p>
                  ) : null}
                  <Link
                    href={slide.href}
                    data-press
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
            data-press
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
            {...stageProps}
          >
            {slides.map((slide, index) => {
              const { offset, near, isActive, shown, x, scale, opacity, zIndex } = place(index);

              return (
                <div
                  key={slide.slug}
                  ref={index === 0 ? cardRef : undefined}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slide.name}, ${index + 1} ${labels.of} ${count}`}
                  aria-hidden={!isActive}
                  inert={!shown}
                  className="relative w-[min(580px,66vw,60vh)] [grid-area:1/1] sm:w-[min(580px,80vw,60vh)] lg:w-[min(640px,71%,62vh)]"
                  style={{
                    transform: `translate3d(${x}%, 0, 0) scale(${scale})`,
                    opacity,
                    zIndex,
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

          <CarouselBars
            className="-mt-4"
            count={count}
            active={active}
            running={running}
            dir={dir}
            label={(index) => `${labels.goTo} ${slides[index].name}`}
            onSelect={setActive}
            onNext={() => go(1)}
          />
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
