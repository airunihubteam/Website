import type { Metadata } from "next";
import { conferences } from "@/content/catalog";
import { ConferencePage } from "@/components/pages";

export function generateStaticParams() {
  return conferences.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = conferences.find((conference) => conference.slug === slug);
  if (!item) return { title: "העמוד לא נמצא" };
  return { title: item.name.he };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ConferencePage locale="he" slug={slug} />;
}
