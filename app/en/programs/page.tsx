import type { Metadata } from "next";
import { ProgramIndex } from "@/components/pages";

export const metadata: Metadata = { title: "Programs" };

export default function Page() {
  return <ProgramIndex locale="en" />;
}
