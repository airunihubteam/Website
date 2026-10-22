import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound() {
  return (
    <SiteFrame locale="he">
      <section className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
        <h1 className="font-display text-5xl font-extrabold tracking-[0.08em]">העמוד לא נמצא</h1>
        <Link href="/" className="font-display mt-8 inline-block border border-star px-5 py-3 text-sm font-extrabold tracking-[0.1em]">
          לבית
        </Link>
      </section>
    </SiteFrame>
  );
}
