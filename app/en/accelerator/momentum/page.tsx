import type { Metadata } from "next";
import { MomentumPage } from "@/components/pages";

export const metadata: Metadata = { title: "Momentum" };

export default function Page() {
  return <MomentumPage locale="en" />;
}
