import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { joins } from "@/content/copy";
import { JoinPage } from "@/components/pages";

const slugs = ["chair", "programs", "new-program"] as const;

type JoinSlug = (typeof slugs)[number];

function isJoinSlug(slug: string): slug is JoinSlug {
  return slugs.some((item) => item === slug);
}

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isJoinSlug(slug)) return { title: "הצטרפות" };
  return { title: joins[slug].title.he };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isJoinSlug(slug)) notFound();
  return <JoinPage slug={slug} />;
}
