import type { Metadata } from "next";
import { HomePage } from "@/components/pages";

export const metadata: Metadata = {
  title: { absolute: "מועדון היזמות - אוניברסיטת רייכמן" },
};

export default function Page() {
  return <HomePage locale="he" />;
}
