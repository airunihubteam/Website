import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <SiteFrame locale="he">
      <section className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
        <h1 className="text-5xl font-bold text-club">העמוד לא נמצא</h1>
        <Link href="/" className="mt-8 inline-block border border-club px-5 py-3 text-sm font-semibold text-club">
          לבית
        </Link>
      </section>
    </SiteFrame>
  );
}
