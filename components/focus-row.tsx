"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const phoneQuery = "(max-width: 767px)";

// On phones, a row of cards that swipes sideways with native scrolling. The card nearest the
// middle stands full size while its neighbours shrink, fade and turn slightly away, like a
// light cover flow; bars underneath show the position and jump to a card. A cousin of the
// home page's club slider, built on scroll-snap instead of a transform track. From md up the
// children simply sit in the grid that `className` describes.
export function FocusRow({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const phone = window.matchMedia(phoneQuery);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Scroll events already arrive at most once a frame, so this runs straight from them.
    const update = () => {
      const items = [...row.children] as HTMLElement[];
      if (!phone.matches) {
        for (const item of items) {
          item.style.transform = "";
          item.style.transformOrigin = "";
          item.style.opacity = "";
        }
        return;
      }
      const box = row.getBoundingClientRect();
      const middle = box.left + box.width / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // Distance from the middle in card widths: 0 centered, about 1 for a neighbour.
        const offset = (rect.left + rect.width / 2 - middle) / rect.width;
        const near = Math.min(Math.abs(offset), 1);
        // Shrink toward the middle, so the edge that peeks in stays in view.
        item.style.transformOrigin = offset < 0 ? "right center" : "left center";
        item.style.transform = still.matches ? "" : `perspective(900px) rotateY(${-offset * 14}deg) scale(${1 - near * 0.08})`;
        item.style.opacity = String(1 - near * 0.45);
        if (Math.abs(offset) < nearestDistance) {
          nearestDistance = Math.abs(offset);
          nearest = index;
        }
      });
      setActive(nearest);
    };

    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    phone.addEventListener("change", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      phone.removeEventListener("change", update);
    };
  }, []);

  const goTo = (index: number) => {
    const item = rowRef.current?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <>
      <div
        ref={rowRef}
        className={className}
        onClick={(event) => {
          // Tapping a card beside the middle brings it to the middle.
          const items = [...(rowRef.current?.children ?? [])];
          const index = items.findIndex((item) => item.contains(event.target as Node));
          if (index !== -1 && index !== active && window.matchMedia(phoneQuery).matches) goTo(index);
        }}
      >
        {children}
      </div>
      <div className="mt-5 flex justify-center gap-2 md:hidden" role="group" aria-label={label}>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1} / ${count}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
            className="flex h-6 items-center"
          >
            <span
              className={`block h-[3px] transition-[width,background-color] duration-500 ${index === active ? "w-10 bg-club" : "w-4 bg-club/20"}`}
              style={{ transitionTimingFunction: "var(--ease)" }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
