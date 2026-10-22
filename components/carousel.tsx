"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

// The motion behind the home page's club slider, shared by every slider built like it: cards
// stacked in one spot and spread out by transforms, with drag and trackpad swipes, arrow keys,
// and an autoplay that waits while the slider is hovered, focused, dragged or off screen.

export const CAROUSEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
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

// Whether a media query matches; false while rendering on the server.
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
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

export function useCarousel<Root extends HTMLElement>({
  count,
  dir,
  spacing,
  sideScale,
  enabled = true,
}: {
  count: number;
  dir: "rtl" | "ltr";
  // Distance between neighbouring cards, as a percentage of the card width.
  spacing: number;
  // How small the cards beside the active one are.
  sideScale: number;
  // Off, the slider holds still and ignores input (for layouts that show every card at once).
  enabled?: boolean;
}) {
  // In RTL the next card sits to the left, so screen motion is mirrored.
  const sign = dir === "rtl" ? -1 : 1;
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<Root>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback((delta: number) => setActive((current) => wrap(current + delta, count)), [count]);
  const running = enabled && !reduced && !hovered && !focused && !dragging && inView;

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
    if (!stage || !enabled) return;
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
  }, [go, sign, enabled]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    pointer.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastT: event.timeStamp,
      velocity: 0,
      step: ((cardRef.current?.offsetWidth ?? 400) * spacing) / 100,
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
    if (!enabled) return;
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

  // Where a card sits: its signed distance from the active card (following a drag), and the scale
  // and opacity that go with it. Neighbours shrink and fade; cards further out fade away.
  const place = (index: number) => {
    const offset = relativeOffset(index, active, count);
    const rel = offset + drag;
    const distance = Math.abs(rel);
    const near = Math.min(distance, 1);
    return {
      offset,
      near,
      isActive: offset === 0,
      shown: Math.abs(offset) <= 1,
      x: rel * spacing * sign,
      scale: 1 - near * (1 - sideScale) - Math.max(0, Math.min(distance - 1, 1)) * 0.08,
      opacity: distance <= 1 ? 1 - near * 0.45 : Math.max(0, 0.55 - (distance - 1) * 0.9),
      zIndex: 100 - Math.round(distance * 10),
    };
  };

  const motion = (duration: number) => (dragging ? "none" : `${reduced ? 1 : duration}ms ${CAROUSEL_EASE}`);

  return {
    active,
    setActive,
    go,
    dragging,
    running,
    reduced,
    place,
    motion,
    rootRef,
    stageRef,
    cardRef,
    rootProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur,
      onKeyDown,
    },
    stageProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: (event: PointerEvent<HTMLDivElement>) => endDrag(event, true),
      onPointerCancel: (event: PointerEvent<HTMLDivElement>) => endDrag(event, false),
      onDragStart: (event: MouseEvent<HTMLDivElement>) => event.preventDefault(),
      onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      },
    },
  };
}

// The position bars under a slider. While autoplay runs, the active bar fills as a countdown to
// the next card; whenever it is paused (hover, focus, drag, off screen) it shows solid dark blue.
export function CarouselBars({
  count,
  active,
  running,
  dir,
  label,
  onSelect,
  onNext,
  className = "",
}: {
  count: number;
  active: number;
  running: boolean;
  dir: "rtl" | "ltr";
  label: (index: number) => string;
  onSelect: (index: number) => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === active;
        return (
          <button
            key={index}
            type="button"
            aria-label={label(index)}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(index)}
            className="group flex h-6 items-center"
          >
            <span
              className={`relative block h-[3px] overflow-hidden rounded-full transition-[width,background-color] duration-700 group-hover:bg-club/30 ${isActive ? "bg-club/30" : "bg-club/15"}`}
              style={{ width: isActive ? 44 : 14, transitionTimingFunction: CAROUSEL_EASE }}
            >
              {isActive ? (
                <span
                  key={active}
                  className="absolute inset-0 rounded-full bg-club"
                  style={{
                    transformOrigin: dir === "rtl" ? "right" : "left",
                    transform: running ? undefined : "scaleX(1)",
                    animation: running ? `club-progress ${AUTOPLAY_MS}ms linear forwards` : undefined,
                  }}
                  onAnimationEnd={onNext}
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
