import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-8 text-center">
      <h1 className="mb-3 text-4xl font-bold">404</h1>
      <p className="mb-6 text-slate-600">Page not found.</p>
      <Link href="/" className="rounded bg-cosmic-navy px-4 py-2 text-white">Back Home</Link>
    </main>
  );
}
