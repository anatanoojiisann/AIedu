"use client";

import { LeadModalTrigger } from "./lead-modal";
import { useLocale } from "./locale-context";

export function ProductPreviewTabs() {
  return (
    <div className="glass-card rounded-xl p-4 text-cosmic-text">
      <div className="mb-3 flex gap-2 text-xs">
        {['Training','Role-play','Analytics'].map((t,i)=><span key={t} className={`rounded px-2 py-1 ${i===0?'bg-cosmic-blue text-cosmic-navy':'border border-cosmic-silver/50 text-cosmic-secondary'}`}>{t}</span>)}
      </div>
      <div className="hex-grid rounded-lg border border-cosmic-silver/20 p-5 text-sm text-cosmic-secondary">Mock panel: Verified training loop progress and score trend lines.</div>
    </div>
  );
}

export function TrustBar() {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {[1,2,3,4,5].map(i=><div key={i} className="light-card rounded-lg p-3 text-sm text-slate-500">Your logo here</div>)}
    </div>
  );
}

export function StateGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="light-card rounded-lg p-4"><p className="mb-2 font-semibold">Loading</p><div className="space-y-2">{[1,2,3].map(i=><div key={i} className="h-4 animate-pulse rounded bg-slate-200"/>)}</div></div>
      <div className="light-card rounded-lg p-4"><p className="mb-2 font-semibold">Empty</p><p className="text-slate-500">— KPI placeholder / no data yet.</p></div>
      <div className="light-card rounded-lg p-4"><p className="mb-2 font-semibold">Success</p><p className="rounded bg-emerald-100 p-2 text-emerald-700">Automation healthy and verified.</p></div>
    </div>
  );
}

export function PageCTA({ type }: { type: "demo" | "pilot" }) {
  const { t } = useLocale();
  return <LeadModalTrigger type={type} label={type === "demo" ? t.cta.demo : t.cta.pilot} />;
}
