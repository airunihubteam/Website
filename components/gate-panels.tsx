"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FocusEvent, type MouseEvent } from "react";

export type GatePanel = {
  href: string;
  title: string;
  summary?: string;
  image: string;
};

export type GatePanelsLabels = {
  title: string;
  more: string;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const desktopQuery = "(min-width: 1024px)";

export function GatePanels({ items, labels, dir }: { items: GatePanel[]; labels: GatePanelsLabels; dir: "rtl" | "ltr" }) {
  // null is the resting state: equal panels on desktop, the first one open on phones.
  const [active, setActive] = useState<number | null>(null);
  const lastPointer = useRef("mouse");

  const onClick = (event: MouseEvent, index: number, open: { phone: boolean; desktop: boolean }) => {
    const desktop = window.matchMedia(desktopQuery).matches;
    const opened = desktop ? open.desktop : open.phone;
    // Without hover, the first tap opens a panel and the second one follows its link.
    if (!opened && (!desktop || lastPointer.current !== "mouse")) {
      event.preventDefault();
      setActive(index);
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null);
  };

  return (
    <section className="relative bg-white py-12 md:py-14">
      <h2 data-reveal-item="0" className="px-5 text-center text-[32px] font-bold text-club">
        <span className="club-underline">{labels.title}</span>
      </h2>

      <div
        className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-3 px-5 md:px-8 lg:h-[min(60vh,600px)] lg:min-h-[420px] lg:flex-row"
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setActive(null);
        }}
        onBlur={onBlur}
      >
        {items.map((item, index) => {
          const phoneOpen = (active ?? 0) === index;
          const desktopOpen = active === index;
          const dimmed = active !== null && active !== index;

          return (
            <Link
              key={item.href}
              href={item.href}
              data-reveal-item={String(index + 1)}
              data-phone-open={phoneOpen}
              data-desktop-open={desktopOpen}
              data-dimmed={dimmed}
              className="group/panel relative isolate block overflow-hidden rounded-[24px] bg-club text-white max-lg:h-28 max-lg:data-[phone-open=true]:h-[22rem] lg:min-w-0 lg:flex-1 lg:data-[desktop-open=true]:flex-[2.6]"
              style={{ transition: `flex-grow 850ms ${EASE}, height 750ms ${EASE}` }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index);
              }}
              onPointerDown={(event) => {
                lastPointer.current = event.pointerType;
              }}
              onFocus={() => setActive(index)}
              onClick={(event) => onClick(event, index, { phone: phoneOpen, desktop: desktopOpen })}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="-z-10 scale-[1.12] object-cover transition-transform duration-[1400ms] group-data-[desktop-open=true]/panel:scale-[1.02] max-lg:group-data-[phone-open=true]/panel:scale-[1.02]"
                style={{ transitionTimingFunction: EASE }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-club/55 transition-opacity duration-700 group-data-[desktop-open=true]/panel:opacity-25 max-lg:group-data-[phone-open=true]/panel:opacity-25"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061347]/90 via-[#0b2370]/30 to-transparent opacity-50 transition-opacity duration-700 group-data-[desktop-open=true]/panel:opacity-100 max-lg:group-data-[phone-open=true]/panel:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[#061347]/45 opacity-0 transition-opacity duration-700 group-data-[dimmed=true]/panel:opacity-100"
              />

              <span aria-hidden="true" className="absolute start-5 top-5 text-sm font-semibold tracking-[0.2em] text-white/75 tabular-nums lg:start-7 lg:top-7">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="absolute inset-x-0 bottom-0 block p-5 lg:p-7">
                <span
                  className="inline-block border-b-2 border-white pb-1 text-2xl font-bold whitespace-nowrap transition-transform duration-700 ltr:origin-bottom-left rtl:origin-bottom-right lg:text-[clamp(18px,1.8vw,26px)] lg:group-data-[desktop-open=true]/panel:scale-[1.12] lg:group-data-[dimmed=true]/panel:scale-[0.74]"
                  style={{ transitionTimingFunction: EASE }}
                >
                  {item.title}
                </span>

                {/* Rows animate from 0fr to 1fr so the text opens without measuring its height. */}
                <span
                  className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 max-lg:group-data-[phone-open=true]/panel:grid-rows-[1fr] lg:group-data-[desktop-open=true]/panel:grid-rows-[1fr]"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <span className="block overflow-hidden">
                    <span className="block w-full pt-4 opacity-0 transition-opacity duration-500 max-lg:group-data-[phone-open=true]/panel:opacity-100 max-lg:group-data-[phone-open=true]/panel:delay-200 lg:w-[300px] lg:group-data-[desktop-open=true]/panel:opacity-100 lg:group-data-[desktop-open=true]/panel:delay-300 xl:w-[360px]">
                      {item.summary ? (
                        <span dir="auto" className="block text-justify text-[15px] leading-7 text-white/90">
                          {item.summary}
                        </span>
                      ) : null}
                      <span className="mt-4 inline-flex items-center gap-2 border border-white px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-club hover:bg-club">
                        {labels.more}
                        <Chevron dir={dir} />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Points towards the reading direction's end: right in LTR, left in RTL.
function Chevron({ dir }: { dir: "rtl" | "ltr" }) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
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
