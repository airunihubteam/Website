import type { Metadata } from "next";
import { NotFoundView } from "@/components/pages";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = { title: "העמוד לא נמצא · Page not found" };

// Any address the site doesn't have. It can't tell which language was asked for, so the Hebrew
// page also offers the English site.
export default function NotFound() {
  return (
    <SiteFrame locale="he">
      <NotFoundView locale="he" bilingual />
    </SiteFrame>
  );
}
