import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Any /en address the site doesn't have gets the English page-not-found (app/en/not-found.tsx)
// instead of the site-wide Hebrew one. Like the program and conference routes, it lists one
// address for the build and reads its params before answering, so every other address is
// rendered on request, where it turns into the 404 page.
export const metadata: Metadata = { title: "Page not found" };

export function generateStaticParams() {
  return [{ missing: ["404"] }];
}

export default async function Missing({ params }: { params: Promise<{ missing: string[] }> }) {
  await params;
  notFound();
}
