import type { Metadata } from "next";
import { ConferenceIndex } from "@/components/pages";

export const metadata: Metadata = { title: "Conferences" };

export default function Page() {
  return <ConferenceIndex locale="en" />;
}
