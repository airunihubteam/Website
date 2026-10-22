import type { Metadata } from "next";
import { programs } from "@/content/catalog";
import { ProgramPage } from "@/components/pages";

export function generateStaticParams() {
  return programs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = programs.find((program) => program.slug === slug);
  if (!item) return { title: "העמוד לא נמצא" };
  return { title: item.name.he };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProgramPage locale="he" slug={slug} />;
}
