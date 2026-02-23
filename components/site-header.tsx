"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./locale-context";
import { LeadModalTrigger } from "./lead-modal";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/business", key: "business" as const },
  { href: "/integrations", key: "integrations" as const },
  { href: "/pricing", key: "pricing" as const },
  { href: "/security", key: "security" as const },
  { href: "/resources", key: "resources" as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-cosmic-silver/20 bg-cosmic-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-cosmic-text">
        <Link href="/" className="font-semibold tracking-wide">HexaOrigin AI Skill OS</Link>
        <nav className="hidden gap-4 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "text-cosmic-cyan" : "text-cosmic-secondary"}>
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded border border-cosmic-silver/40 px-2 py-1 text-xs" onClick={() => setLocale(locale === "en" ? "zh" : "en")}>{locale === "en" ? "中文" : "EN"}</button>
          <LeadModalTrigger type="demo" label={t.cta.demo} />
        </div>
      </div>
    </header>
  );
}
