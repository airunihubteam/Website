"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Chevron } from "@/components/icons";

export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
  position?: string;
  linkedin?: string;
  group?: string;
};

export type TeamGroup = { key: string; label: string };

export type TeamLabels = {
  title: string;
  all: string;
  profile: string;
  close: string;
  previous: string;
  next: string;
  linkedin: string;
  of: string;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function initials(name: string) {
  return name
    .replace(/[״"']/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 1 || /[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function Portrait({ member, sizes, className = "" }: { member: TeamMember; sizes: string; className?: string }) {
  if (!member.photo) {
    return (
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-club to-[#061347] text-5xl font-bold text-white/90">
        {initials(member.name)}
      </span>
    );
  }
  return (
    <Image
      src={member.photo}
      alt=""
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      style={{ objectPosition: member.position ?? "50% 25%", transitionTimingFunction: EASE }}
    />
  );
}

// Portrait cards for a team. With groups, tabs above the grid filter it and a pill slides to the
// chosen tab; any card opens a profile panel with the bio and LinkedIn link, and the panel can
// step through the people currently shown.
export function TeamSection({
  members,
  groups = [],
  labels,
  dir,
  variant = "grid",
}: {
  members: TeamMember[];
  groups?: TeamGroup[];
  labels: TeamLabels;
  dir: "rtl" | "ltr";
  variant?: "grid" | "pair";
}) {
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const visible = filter === "all" ? members : members.filter((member) => member.group === filter);
  const current = openIndex === null ? null : visible[openIndex];
  const groupLabel = (key?: string) => groups.find((group) => group.key === key)?.label;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  // The pill follows the active tab; it is placed directly so it can glide between tabs. Where
  // the tabs scroll sideways (phones), the chosen tab also glides to the middle.
  useEffect(() => {
    const tabs = tabsRef.current;
    const pill = pillRef.current;
    if (!tabs || !pill) return;
    const place = () => {
      const active = tabs.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
    };
    place();
    const active = tabs.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (active && filtered) {
      tabs.scrollTo({ left: active.offsetLeft + active.offsetWidth / 2 - tabs.clientWidth / 2, behavior: "smooth" });
    }
    const observer = new ResizeObserver(place);
    observer.observe(tabs);
    return () => observer.disconnect();
  }, [filter, filtered]);

  const step = (delta: number) => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + delta + visible.length) % visible.length);
  };

  const onDialogKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward) step(1);
    else if (event.key === back) step(-1);
    else return;
    event.preventDefault();
  };

  return (
    <>
      {groups.length > 0 ? (
        <div data-reveal-item="1" className="mt-6 flex justify-center md:mt-10">
          <div
            ref={tabsRef}
            role="group"
            aria-label={labels.title}
            className="relative flex max-w-full gap-1 overflow-x-auto border border-[#e3e7f3] bg-white p-1 shadow-[0_10px_30px_-22px_rgba(15,45,150,0.5)] [scrollbar-width:none]"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-0 bg-club transition-[transform,width] duration-500"
              style={{ transitionTimingFunction: EASE }}
            />
            {[{ key: "all", label: labels.all }, ...groups].map((group) => {
              const active = filter === group.key;
              return (
                <button
                  key={group.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(group.key);
                    setFiltered(true);
                  }}
                  className={`relative z-10 shrink-0 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                    active ? "text-white" : "text-club/70 hover:text-club"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* The outer box takes part in the section's reveal; the inner grid is rebuilt per filter
          so its cards can rise in again. */}
      <div data-reveal-item={groups.length > 0 ? "2" : "1"} className="mt-6 md:mt-10">
      <div
        key={filter}
        className={`grid gap-3 sm:gap-5 ${variant === "pair" ? "mx-auto max-w-2xl grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}
      >
        {visible.map((member, index) => (
          <button
            key={member.id}
            type="button"
            aria-haspopup="dialog"
            aria-label={`${member.name}${member.role ? `, ${member.role}` : ""}: ${labels.profile}`}
            onClick={() => setOpenIndex(index)}
            className={`group relative block aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-club text-start shadow-[0_18px_40px_-28px_rgba(15,45,150,0.7)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(15,45,150,0.8)] ${
              filtered ? "motion-safe:animate-[team-in_700ms_var(--ease)_backwards]" : ""
            }`}
            style={{ transitionTimingFunction: EASE, animationDelay: `${index * 55}ms` }}
          >
            <Portrait
              member={member}
              sizes="(min-width: 1280px) 240px, (min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
              className="transition-[scale] duration-[1200ms] group-hover:scale-[1.06]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-club/20 transition-opacity duration-500 group-hover:opacity-0" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#061347]/95 via-[#061347]/45 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-[rotate,background-color] duration-500 group-hover:rotate-90 group-hover:bg-white/35"
            >
              <svg viewBox="0 0 20 20" width="14" height="14">
                <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-3 text-white sm:p-4">
              {groupLabel(member.group) && filter === "all" ? (
                <span className="mb-1.5 inline-block bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                  {groupLabel(member.group)}
                </span>
              ) : null}
              <span className="block text-base leading-tight font-bold sm:text-lg">{member.name}</span>
              {member.role ? <span className="mt-0.5 block text-xs leading-snug text-white/80 sm:text-sm">{member.role}</span> : null}
              <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]" style={{ transitionTimingFunction: EASE }}>
                <span className="block overflow-hidden">
                  <span className="group/profile mt-3 inline-flex items-center gap-2 border border-white/70 px-3 py-1.5 text-xs font-semibold transition-colors duration-300 hover:border-club hover:bg-club">
                    {labels.profile}
                    <Chevron dir={dir} className="transition-transform duration-500 group-hover/profile:translate-x-1 rtl:group-hover/profile:-translate-x-1" />
                  </span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="team-profile-name"
        onClose={() => setOpenIndex(null)}
        onKeyDown={onDialogKey}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpenIndex(null);
        }}
        className="team-dialog m-auto w-[min(940px,calc(100%-1.5rem))] max-w-none overflow-hidden rounded-[28px] bg-white p-0 text-ink shadow-[0_40px_120px_-40px_rgba(6,19,71,0.8)]"
      >
        {current ? (
          <div key={current.id} className="grid motion-safe:animate-[profile-swap_500ms_var(--ease)_backwards] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative aspect-[16/11] bg-club md:aspect-auto md:min-h-[480px]">
              <Portrait member={current} sizes="(min-width: 768px) 400px, 100vw" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#061347]/40 to-transparent md:hidden" />
            </div>
            <div className="flex max-h-[55dvh] flex-col p-6 md:max-h-[80dvh] md:p-9">
              <div className="overflow-y-auto pe-1">
                {groupLabel(current.group) ? <p className="text-sm font-semibold text-club/60">{groupLabel(current.group)}</p> : null}
                <h3 id="team-profile-name" className="mt-1 text-2xl font-bold text-club md:text-3xl">
                  {current.name}
                </h3>
                {current.role ? <p className="mt-1 text-base font-medium text-ink/80">{current.role}</p> : null}
                <span aria-hidden="true" className="mt-4 block h-[3px] w-12 bg-club" />
                {current.bio ? <p className="mt-5 text-justify text-[15px] leading-8 text-ink/85">{current.bio}</p> : null}
              </div>
              <div className="mt-6 flex flex-col items-center gap-4 border-t border-[#e9ecf6] pt-5 md:flex-row md:flex-wrap md:justify-between">
                {current.linkedin ? (
                  <a
                    href={current.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 border border-club px-4 py-2 text-sm font-semibold text-club transition-colors duration-300 hover:bg-club hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"
                      />
                    </svg>
                    {labels.linkedin}
                    <Chevron dir={dir} className="transition-transform duration-500 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
                  </a>
                ) : (
                  <span className="hidden md:block" />
                )}
                {visible.length > 1 ? (
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className="flex h-10 w-10 items-center justify-center border border-club/20 text-club transition-colors duration-300 hover:bg-club hover:text-white">
                      <Chevron dir={dir === "rtl" ? "ltr" : "rtl"} />
                    </button>
                    <span className="text-sm text-ink/60 tabular-nums" dir="ltr">
                      {(openIndex ?? 0) + 1} / {visible.length}
                    </span>
                    <button type="button" onClick={() => step(1)} aria-label={labels.next} className="flex h-10 w-10 items-center justify-center border border-club/20 text-club transition-colors duration-300 hover:bg-club hover:text-white">
                      <Chevron dir={dir} />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpenIndex(null)}
          aria-label={labels.close}
          className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-club text-white shadow-md transition-[rotate,background-color] duration-300 hover:rotate-90 hover:bg-[#0a1f6e]"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
