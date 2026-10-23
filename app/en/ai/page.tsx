import type { Metadata } from "next";
import { AiPage } from "@/components/pages";

export const metadata: Metadata = { title: "Innovation & AI" };

export default function Page() {
  return <AiPage locale="en" />;
}
