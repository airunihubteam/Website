import type { Metadata } from "next";
import { InternshipPage } from "@/components/pages";

export const metadata: Metadata = { title: "Industry Internship" };

export default function Page() {
  return <InternshipPage locale="en" />;
}
