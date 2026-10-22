import type { Metadata } from "next";
import { AboutPage } from "@/components/pages";

export const metadata: Metadata = { title: "אודות" };

export default function Page() {
  return <AboutPage locale="he" />;
}
