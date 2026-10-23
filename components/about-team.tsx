"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
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

// The portraits are already small WebP files (public/media/team), so they are served as they are:
// one file per person, fetched with the page at low priority so each photo is there when its card
// appears.
function Portrait({ member, className = "", fetchPriority }: { member: TeamMember; className?: string; fetchPriority?: "low" | "high" }) {
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
      unoptimized
      loading="eager"
      fetchPriority={fetchPriority}
      className={`object-cover ${className}`}
      style={{ objectPosition: member.position ?? "50% 25%", transitionTimingFunction: EASE }}
    />
  );
}

// One portrait card, after the old site's team cards: the front shows the photo with the name and
// role; the back fades in over the same photo in the club's blue with the bio and LinkedIn link.
// Hover or keyboard focus shows the back on desktop; on phones a tap shows it and another hides it.
function TeamCard({
  member,
  groupText,
  labels,
  dir,
  open,
  onToggle,
  infoId,
}: {
  member: TeamMember;
  groupText?: string;
  labels: TeamLabels;
  dir: "rtl" | "ltr";
  open: boolean;
  onToggle: () => void;
  infoId: string;
}) {
  // The back's lines rise in one after another as it fades in.
  const rise = (step: number, transitions = "") =>
    `translate-y-2 opacity-0 transition-[translate,opacity${transitions}] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-has-focus-visible:translate-y-0 group-has-focus-visible:opacity-100 group-data-open:translate-y-0 group-data-open:opacity-100 ${
      ["delay-75", "delay-150", "delay-200", "delay-300"][step]
    }`;

  return (
    <div
      data-open={open ? "" : undefined}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-club shadow-[0_18px_40px_-28px_rgba(15,45,150,0.7)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(15,45,150,0.8)]"
      style={{ transitionTimingFunction: EASE }}
    >
      <Portrait
        member={member}
        fetchPriority="low"
        className="transition-[scale] duration-[1200ms] group-hover:scale-[1.08] group-has-focus-visible:scale-[1.08] group-data-open:scale-[1.08]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-club/20" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#061347]/95 via-[#061347]/45 to-transparent" />
      <span
        aria-hidden="true"
        className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
      >
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="absolute inset-x-0 bottom-0 block p-3 text-white sm:p-4">
        {groupText ? (
          <span className="mb-1.5 inline-block bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">{groupText}</span>
        ) : null}
        <span className="block text-base leading-tight font-bold sm:text-lg">{member.name}</span>
        {member.role ? <span className="mt-0.5 block text-xs leading-snug text-white/80 sm:text-sm">{member.role}</span> : null}
      </span>

      {/* The whole front is one button: it opens the back for touch and keyboard users. */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={infoId}
        aria-label={`${member.name}${member.role ? `, ${member.role}` : ""}: ${labels.profile}`}
        onClick={onToggle}
        className="absolute inset-0 z-10 rounded-[22px]"
      />

      <div
        id={infoId}
        onClick={(event) => {
          if (open && !(event.target as Element).closest("a")) onToggle();
        }}
        className="invisible absolute inset-0 z-20 flex flex-col bg-club/85 p-3 text-white opacity-0 transition-[opacity,visibility] duration-500 group-hover:visible group-hover:opacity-100 group-has-focus-visible:visible group-has-focus-visible:opacity-100 group-data-open:visible group-data-open:opacity-100 sm:p-4"
        style={{ transitionTimingFunction: EASE }}
      >
        <p className={`text-sm leading-tight font-bold sm:text-base ${rise(0)}`}>{member.name}</p>
        {/* Without a bio, the role fills the back instead. */}
        {!member.bio && member.role ? <p className={`mt-1 text-xs text-white/80 sm:text-sm ${rise(0)}`}>{member.role}</p> : null}
        <span aria-hidden="true" className={`mt-2 block h-[2px] w-8 bg-white/70 ${rise(1)}`} />
        {member.bio ? (
          // Long bios scroll inside the card; the scroll area reaches into the padding so its
          // scrollbar keeps clear of the text.
          <p
            className={`-me-3 mt-2 min-h-0 flex-1 overflow-y-auto pe-3 text-justify text-xs leading-5 text-white/95 [scrollbar-color:rgba(255,255,255,0.45)_transparent] [scrollbar-width:thin] sm:-me-4 sm:pe-4 sm:text-[13px] ${rise(2)}`}
          >
            {member.bio}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/link mt-3 inline-flex items-center gap-1.5 self-start border border-white/80 px-3 py-1.5 text-xs font-semibold hover:bg-white hover:text-club ${rise(3, ",background-color,color")}`}
          >
            LinkedIn
            <Chevron dir={dir} className="transition-transform duration-500 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

// Portrait cards for a team. With groups, tabs above the grid filter it and a bar slides to the
// chosen tab. Each card shows its person's bio on hover (or on tap on phones; one at a time).
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
  // "center" sets a few cards in a centered row, whatever their number.
  variant?: "grid" | "pair" | "center";
}) {
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const uid = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const visible = filter === "all" ? members : members.filter((member) => member.group === filter);
  const groupLabel = (key?: string) => groups.find((group) => group.key === key)?.label;

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
                    setOpenId(null);
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
          className={
            variant === "center"
              ? "flex flex-wrap justify-center gap-3 sm:gap-5"
              : `grid gap-3 sm:gap-5 ${variant === "pair" ? "mx-auto max-w-2xl grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`
          }
        >
          {visible.map((member, index) => (
            <div
              key={member.id}
              className={`${variant === "center" ? "w-[calc(50%-0.375rem)] sm:w-56" : ""} ${filtered ? "motion-safe:animate-[team-in_700ms_var(--ease)_backwards]" : ""}`}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <TeamCard
                member={member}
                groupText={filter === "all" ? groupLabel(member.group) : undefined}
                labels={labels}
                dir={dir}
                open={openId === member.id}
                onToggle={() => setOpenId((current) => (current === member.id ? null : member.id))}
                infoId={`${uid}-${member.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
