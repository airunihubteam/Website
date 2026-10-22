import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <h1 className="text-5xl font-bold text-club">Page not found</h1>
      <Link href="/en" className="mt-8 inline-block border border-club px-5 py-3 text-sm font-semibold text-club">
        Home
      </Link>
    </section>
  );
}
