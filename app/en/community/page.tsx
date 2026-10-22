import type { Metadata } from "next";
import { CommunityPage } from "@/components/pages";

export const metadata: Metadata = { title: "Community" };

export default function Page() {
  return <CommunityPage locale="en" />;
}
