"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Line = { x: number; w: number };

// The longest line of an element's text, relative to the element's left edge.
function widestLine(element: HTMLElement): Line | null {
  const box = element.getBoundingClientRect();
  if (!box.width) return null;
  const range = document.createRange();
  range.selectNodeContents(element);
  // Fragments of text on the same line share roughly the same top; merge them into lines.
  const lines: { top: number; left: number; right: number }[] = [];
  for (const rect of range.getClientRects()) {
    if (!rect.width || !rect.height) continue;
    const line = lines.find((entry) => Math.abs(entry.top - rect.top) < rect.height / 2);
    if (line) {
      line.left = Math.min(line.left, rect.left);
      line.right = Math.max(line.right, rect.right);
    } else {
      lines.push({ top: rect.top, left: rect.left, right: rect.right });
    }
  }
  range.detach();
  let widest: Line | null = null;
  for (const line of lines) {
    const w = line.right - line.left;
    if (!widest || w > widest.w) widest = { x: line.left - box.left, w };
  }
  return widest;
}

// A heading's text with the club's line under it (the club-underline style in globals.css). The
// line sits under the longest line of the text: when a heading wraps on a narrow screen, its box
// is as wide as the space it sits in, not its words, so the line is measured after the heading
// renders and again when it resizes or the web font arrives. Until then it spans the box.
export function Underline({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [line, setLine] = useState<Line | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const next = widestLine(element);
      setLine((current) => (next && (!current || Math.abs(current.x - next.x) > 0.5 || Math.abs(current.w - next.w) > 0.5) ? next : current));
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) measure();
    });
    return () => {
      live = false;
      resize.disconnect();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={onDark ? "club-underline on-dark" : "club-underline"}
      style={line ? ({ "--underline-x": `${line.x}px`, "--underline-w": `${line.w}px` } as CSSProperties) : undefined}
    >
      {children}
    </span>
  );
}
