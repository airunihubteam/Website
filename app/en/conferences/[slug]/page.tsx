import type { Metadata } from "next";
import { conferences } from "@/content/catalog";
import { ConferencePage } from "@/components/pages";

export function generateStaticParams() {
  return conferences.filter((item) => item.summary.en).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = conferences.find((conference) => conference.slug === slug);
  if (!item?.summary.en) return { title: "Page not found" };
  return { title: item.name.en ?? item.name.he };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ConferencePage locale="en" slug={slug} />;
}
