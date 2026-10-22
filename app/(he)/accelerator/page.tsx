import type { Metadata } from "next";
import { AcceleratorIndex } from "@/components/pages";

export const metadata: Metadata = { title: "אקסלרטור" };

export default function Page() {
  return <AcceleratorIndex locale="he" />;
}
