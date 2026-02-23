"use client";

import { useLocale } from "./locale-context";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { locale } = useLocale();

  return (
    <footer className="border-t border-cosmic-silver/30 bg-white py-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 text-sm text-slate-600 md:grid-cols-4">
        <div><p className="font-semibold text-slate-800">Product</p><p>AI Skill OS</p></div>
        <div><p className="font-semibold text-slate-800">Solutions</p><p>Onboarding · Sales · Support</p></div>
        <div><p className="font-semibold text-slate-800">Company</p><p>HexaOrigin</p></div>
        <div><p className="font-semibold text-slate-800">Legal</p><p>Privacy · Terms</p></div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl px-4 text-xs text-slate-500">© {year} HexaOrigin {locale === "en" ? "All rights reserved." : "版权所有"} | Privacy | Terms</div>
    </footer>
  );
}
