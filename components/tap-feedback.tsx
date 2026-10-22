"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

// How long a tapped button shows its hover animation before the page changes.
const PRESS_MS = 520;

// Phones have no hover, so a tap used to jump straight to the next page. For links marked
// with data-press, a touch tap first marks the link (and everything inside it) as pressed,
// which plays its hover styles, and navigates once the animation has had time to show.
export function TapFeedback() {
  const router = useRouter();

  useEffect(() => {
    let touch = false;
    const onPointerDown = (event: PointerEvent) => {
      touch = event.pointerType !== "mouse";
    };
    // Capture on window runs before React and Next's Link see the click.
    const onClick = (event: MouseEvent) => {
      if (!touch || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-press]");
      if (!anchor || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      event.stopPropagation();
      for (const element of [anchor, ...anchor.querySelectorAll("*")]) element.setAttribute("data-pressed", "");
      window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        window.setTimeout(() => {
          for (const element of [anchor, ...anchor.querySelectorAll("*")]) element.removeAttribute("data-pressed");
        }, 600);
      }, PRESS_MS);
    };
    window.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    window.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("click", onClick, { capture: true });
    };
  }, [router]);

  return null;
}

// Each new page eases in instead of appearing at once. The animation only fills backwards,
// so nothing stays applied afterwards that could affect fixed elements on the page.
export function PageEnter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="motion-safe:animate-[page-enter_600ms_var(--ease)_backwards]">
      {children}
    </div>
  );
}
