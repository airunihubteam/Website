import type { Metadata } from "next";
import { PitchPage } from "@/components/pages";

export const metadata: Metadata = { title: "Pitch Night" };

export default function Page() {
  return <PitchPage locale="he" />;
}
