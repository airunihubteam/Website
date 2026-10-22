import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { aboutParagraphs } from "@/content/copy";

export const metadata: Metadata = {
  title: {
    default: "Entrepreneurship Club - Reichman University",
    template: "%s - Entrepreneurship Club - Reichman University",
  },
  description: aboutParagraphs[0].en,
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteFrame locale="en">{children}</SiteFrame>;
}
