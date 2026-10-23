import { catalogPath, conferences } from "@/content/catalog";
import type { Localized } from "@/lib/locale";

export type NavItem = {
  label: Localized;
  href: string;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  { label: { he: "אודות", en: "About" }, href: "/about" },
  {
    label: { he: "התוכניות שלנו", en: "Our Programs" },
    href: "/programs",
    children: [
      { label: { he: "תוכניות", en: "Programs" }, href: "/programs" },
      { label: { he: "אקסלרטור", en: "Accelerator" }, href: "/accelerator" },
      { label: { he: "Pitch Night", en: "Pitch Night" }, href: "/pitch-night" },
      { label: { he: "מסלול לתעשייה", en: "Internship" }, href: "/internship" },
    ],
  },
  {
    label: { he: "כנסים", en: "Conferences" },
    href: "/conferences",
    children: [
      { label: { he: "כל הכנסים", en: "All conferences" }, href: "/conferences" },
      ...conferences.map((item) => ({ label: item.name, href: catalogPath(item) })),
    ],
  },
  { label: { he: "קהילה", en: "Community" }, href: "/community" },
  { label: { he: "חדשנות ו-AI", en: "Innovation & AI" }, href: "/ai" },
];

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/IECIDC" },
  { label: "Instagram", href: "https://www.instagram.com/ruec_il/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ruec/" },
];

export const privacyHref = "https://www.runi.ac.il/privacy-policy";
