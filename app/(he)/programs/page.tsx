import type { Metadata } from "next";
import { ProgramIndex } from "@/components/pages";

export const metadata: Metadata = { title: "תוכניות" };

export default function Page() {
  return <ProgramIndex locale="he" />;
}
