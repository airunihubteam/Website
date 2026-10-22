import type { Metadata } from "next";
import { HomePage } from "@/components/pages";

export const metadata: Metadata = {
  title: { absolute: "Entrepreneurship Club - Reichman University" },
};

export default function Page() {
  return <HomePage locale="en" />;
}
