import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-cosmic-silver/30 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} HexaOrigin AI Skill OS</p>
        <div className="flex gap-3">
          <Link href="/security">Security</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
