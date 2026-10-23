"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { CarouselBars, useCarousel, useMediaQuery } from "@/components/carousel";

// Same spread as the home page's club slider.
const SPACING = 76;
const SIDE_SCALE = 0.64;

// Cards that sit in a three-column grid from md up and, on phones, become the home page's club
// slider: the active card in the middle, its neighbours small and faded at the sides, swiped,
// tapped or autoplayed in a loop. The active card's wrapper carries data-active, so the card can
// play there the animation hover plays on desktop. Its position lives in CSS variables that only
// phones apply, so the server-rendered grid never flashes on wide screens.
export function CardSlider({
  children,
  titles,
  label,
  goTo,
  dir,
  className = "",
  grid = "md:grid-cols-3 md:gap-5",
  slideClasses = [],
}: {
  children: ReactNode;
  titles: string[];
  label: string;
  goTo: string;
  dir: "rtl" | "ltr";
  className?: string;
  // The grid the cards sit in from md up.
  grid?: string;
  // Extra classes for each card's wrapper, by position, such as hiding one where a row would
  // leave it alone. Plain strings, so a server page can pass them.
  slideClasses?: string[];
}) {
  const phone = useMediaQuery("(max-width: 767px)");
  const cards = Children.toArray(children);
  const count = cards.length;
  const { active, setActive, go, dragging, running, place, motion, rootRef, stageRef, cardRef, rootProps, stageProps } = useCarousel<HTMLDivElement>({
    count,
    dir,
    spacing: SPACING,
    sideScale: SIDE_SCALE,
    enabled: phone,
  });

  return (
    <div
      ref={rootRef}
      aria-roledescription={phone ? "carousel" : undefined}
      aria-label={phone ? label : undefined}
      className={`max-md:overflow-x-clip ${className}`}
      {...rootProps}
    >
      <div
        ref={stageRef}
        className={`grid max-md:-mx-5 max-md:touch-pan-y max-md:py-4 max-md:select-none max-md:[mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)] ${grid}`}
        {...stageProps}
      >
        {cards.map((card, index) => {
          const { offset, isActive, x, scale, opacity, zIndex } = place(index);
          return (
            <div
              key={index}
              ref={index === 0 ? cardRef : undefined}
              role={phone ? "group" : undefined}
              aria-roledescription={phone ? "slide" : undefined}
              aria-label={phone ? titles[index] : undefined}
              aria-hidden={phone && !isActive ? true : undefined}
              data-active={phone && isActive ? "" : undefined}
              onClick={phone && !isActive ? () => go(offset) : undefined}
              className={`group max-md:mx-auto max-md:w-[min(360px,78vw)] max-md:opacity-(--fade) max-md:[grid-area:1/1] max-md:[transform:var(--slide)] ${slideClasses[index] ?? ""}`}
              style={
                {
                  "--slide": `translate3d(${x}%, 0, 0) scale(${scale})`,
                  "--fade": opacity,
                  zIndex,
                  transition: dragging ? "none" : `transform ${motion(900)}, opacity ${motion(700)}`,
                } as CSSProperties
              }
            >
              {card}
            </div>
          );
        })}
      </div>
      <CarouselBars
        className="mt-2 md:hidden"
        count={count}
        active={active}
        running={running}
        dir={dir}
        label={(index) => `${goTo} ${titles[index]}`}
        onSelect={setActive}
        onNext={() => go(1)}
      />
    </div>
  );
}
