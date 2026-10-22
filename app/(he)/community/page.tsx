import type { Metadata } from "next";
import { CommunityPage } from "@/components/pages";

export const metadata: Metadata = { title: "קהילה" };

export default function Page() {
  return <CommunityPage locale="he" />;
}
