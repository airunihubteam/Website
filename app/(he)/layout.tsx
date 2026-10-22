import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { aboutParagraphs } from "@/content/copy";

export const metadata: Metadata = {
  title: {
    default: "מועדון היזמות - אוניברסיטת רייכמן",
    template: "%s - מועדון היזמות - אוניברסיטת רייכמן",
  },
  description: aboutParagraphs[0].he,
};

export default function HebrewLayout({ children }: { children: ReactNode }) {
  return <SiteFrame locale="he">{children}</SiteFrame>;
}
