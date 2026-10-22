// Points towards the reading direction's end: right in LTR, left in RTL.
export function Chevron({ dir, className = "" }: { dir: "rtl" | "ltr"; className?: string }) {
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
