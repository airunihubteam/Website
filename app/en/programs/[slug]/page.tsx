import type { Metadata } from "next";
import { programs } from "@/content/catalog";
import { ProgramPage } from "@/components/pages";

export function generateStaticParams() {
  return programs.filter((item) => item.summary.en).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = programs.find((program) => program.slug === slug);
  if (!item?.summary.en) return { title: "Page not found" };
  return { title: item.name.en ?? item.name.he };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProgramPage locale="en" slug={slug} />;
}
