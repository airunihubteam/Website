import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <h1 className="font-display text-5xl font-extrabold tracking-[0.08em]">Page not found</h1>
      <Link href="/en" className="font-display mt-8 inline-block border border-star px-5 py-3 text-sm font-extrabold tracking-[0.1em]">
        Home
      </Link>
    </section>
  );
}
