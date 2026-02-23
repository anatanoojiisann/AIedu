"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "./locale-context";
import { LeadModalTrigger } from "./lead-modal";

const navItems = [
  { href: "/", labelEn: "Product", labelZh: "产品" },
  { href: "/business", labelEn: "Solutions", labelZh: "解决方案" },
  { href: "/integrations", labelEn: "Integrations", labelZh: "集成" },
  { href: "/pricing", labelEn: "Pricing", labelZh: "定价" },
  { href: "/security", labelEn: "Security", labelZh: "安全" },
  { href: "/resources", labelEn: "Resources", labelZh: "资源" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-cosmic-silver/20 bg-cosmic-navy/95 backdrop-blur transition-all ${compact ? "py-1" : "py-2"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-cosmic-text">
        <Link href="/" className="font-semibold tracking-wide">HexaOrigin AI Skill OS</Link>
        <nav className="hidden gap-4 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "text-cosmic-cyan" : "text-cosmic-secondary"}>
              {locale === "en" ? item.labelEn : item.labelZh}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-cosmic-text">
          <button className="rounded border border-cosmic-silver/40 px-2 py-1 text-xs" onClick={() => setLocale(locale === "en" ? "zh" : "en")}>{locale === "en" ? "中文" : "EN"}</button>
          <LeadModalTrigger source="nav" type="demo" label={t.cta.demo} />
          <LeadModalTrigger source="nav" type="pilot" label={locale === "en" ? "Start a 2-week pilot" : "开启 2 周试点"} />
        </div>
      </div>
    </header>
  );
}
