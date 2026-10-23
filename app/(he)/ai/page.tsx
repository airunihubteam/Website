import type { Metadata } from "next";
import { AiPage } from "@/components/pages";

export const metadata: Metadata = { title: "חדשנות ו-AI" };

export default function Page() {
  return <AiPage locale="he" />;
}
