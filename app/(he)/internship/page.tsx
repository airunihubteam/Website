import type { Metadata } from "next";
import { InternshipPage } from "@/components/pages";

export const metadata: Metadata = { title: "מסלול לתעשייה" };

export default function Page() {
  return <InternshipPage locale="he" />;
}
