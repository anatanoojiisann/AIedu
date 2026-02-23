"use client";

import { useEffect, useMemo, useState } from "react";
import { LeadModalTrigger } from "@/components/lead-modal";
import { useLocale } from "@/components/locale-context";

type Track = "business" | "individual";

export default function PricingPage() {
  const { locale, t } = useLocale();
  const [track, setTrack] = useState<Track>("business");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    console.log("pricing_track_view", { track, locale });
  }, [track, locale]);

  const switchTrack = (next: Track) => {
    if (next === track) return;
    console.log("pricing_track_toggle", { from: track, to: next });
    setSwitching(true);
    setTimeout(() => {
      setTrack(next);
      setSwitching(false);
    }, 180);
  };

  const c = useMemo(() => {
    if (locale === "en") {
      return {
        eyebrow: "Business-first pricing (scoped to rollout)",
        title: "Pricing that matches your rollout",
        sub: "Business pricing is scoped by seats, modules, integrations, and security/SLA. Individuals can start free and upgrade for higher training volume, advanced scoring, and exports.",
        business: "Business",
        individual: "Individual",
        basisTitle: "Price is based on",
        basisHelper: "We scope a clear quote and delivery boundary based on your rollout plan.",
        compareBusiness: "Compare Business plans",
        compareIndividual: "Compare Individual plans",
        driversTitle: "What drives pricing",
        pilotTitle: "2-week pilot: prove value before scaling",
        procurement: "Procurement & billing",
        upgradeTitle: "Need team rollout and workflow deployment?",
        upgradeBody: "Business plans support integrations, manager dashboards, RBAC, and audit logs—ideal for pilots and multi-team scale.",
        finalBusiness: "Get a scoped quote and rollout plan within 48 hours.",
        finalIndividual: "Start free, find your gaps, then upgrade to Pro for exportable proof.",
      };
    }
    return {
      eyebrow: "Business-first 定价（按落地范围报价）",
      title: "定价匹配你的落地路径",
      sub: "企业客户按席位、模块、集成范围与安全/SLA 要求报价；个人用户可免费开始，订阅解锁更高训练额度、高级评分与报告导出。",
      business: "企业版",
      individual: "个人版",
      basisTitle: "报价依据",
      basisHelper: "基于你的落地范围给出清晰报价与交付边界。",
      compareBusiness: "企业版包含内容对比",
      compareIndividual: "个人版包含内容对比",
      driversTitle: "价格由什么决定",
      pilotTitle: "2 周试点：先证明价值，再决定扩张",
      procurement: "采购与付款",
      upgradeTitle: "需要团队协作与工作流部署？",
      upgradeBody: "企业版支持钉钉/企微/Slack 集成、管理看板、RBAC 与审计日志，适合从试点扩到多团队。",
      finalBusiness: "给我 48 小时，我们给你一份范围清晰的报价与落地计划。",
      finalIndividual: "先免费开始，找到你的薄弱项，再用 Pro 把训练变成可导出的证明。",
    };
  }, [locale]);

  const onPricingCta = (cta: string, section: string) => {
    console.log("pricing_cta_click", { cta, track, section, locale });
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-cosmic-blue">{c.eyebrow}</p>
          <h1 className="mb-3 text-4xl font-bold">{c.title}</h1>
          <p className="mb-4 text-slate-600">{c.sub}</p>
          <div className="mb-4 inline-flex rounded-lg border border-slate-300 bg-white p-1">
            <button onClick={() => switchTrack("business")} className={`rounded px-3 py-1 text-sm ${track === "business" ? "bg-cosmic-navy text-white" : "text-slate-600"}`}>{c.business}</button>
            <button onClick={() => switchTrack("individual")} className={`rounded px-3 py-1 text-sm ${track === "individual" ? "bg-cosmic-navy text-white" : "text-slate-600"}`}>{c.individual}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {track === "business" ? (
              <>
                <LeadModalTrigger source="pricingHero" type="pricing" label={t.cta.requestPricing} onOpen={() => onPricingCta("request_pricing", "hero")} />
                <LeadModalTrigger source="pricingHero" type="pilot" label={t.cta.pilot} onOpen={() => onPricingCta("start_pilot", "hero")} />
              </>
            ) : (
              <>
                <LeadModalTrigger source="pricingHero" type="demo" label={t.cta.startFree} onOpen={() => onPricingCta("start_free", "hero")} />
                <LeadModalTrigger source="pricingHero" type="demo" label={t.cta.upgradePro} onOpen={() => onPricingCta("upgrade_pro", "hero")} />
              </>
            )}
          </div>
        </div>
        <div className="light-card rounded-lg p-4">
          <h2 className="mb-2 text-xl font-semibold">{c.basisTitle}</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Seats", "Modules", "Integrations", "Security & SLA"].map((x) => <div key={x} className="rounded border border-slate-200 p-2">{x}</div>)}
          </div>
          <p className="mt-3 text-sm text-slate-600">{c.basisHelper}</p>
        </div>
      </section>

      <section>
        {switching ? <div className="h-36 animate-pulse rounded-lg bg-slate-100" /> : track === "business" ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Starter", locale === "en" ? "Single-team pilot & lightweight rollout" : "单团队试点与轻量落地", ["Core training loop", "Basic role-play scoring", "Core analytics", "1 standard integration"], locale === "en" ? "Ideal for 1 role / 3–5 scenarios" : "适合 1 个岗位 / 3–5 场景起步", t.cta.requestPricing, "pricing"],
              ["Pro", locale === "en" ? "Multi-team scaling with steady-state metrics" : "多个团队复制扩张，形成常态化指标", ["Advanced rubrics", "Trend & attribution", "Multiple integrations", "Exportable reports"], locale === "en" ? "For multiple roles, scenarios, and teams" : "适合多岗位、多场景、多团队推广", t.cta.requestPricing, "pricing"],
              ["Enterprise", locale === "en" ? "Org-wide rollout with enterprise security & governance" : "企业级安全与组织治理，跨 BU 规模化", ["SSO / RBAC / audit logs", "Data isolation & retention", "Dedicated SLA", "Optional private deployment"], locale === "en" ? "For strict compliance and procurement-heavy orgs" : "适合合规要求高、审批链路长的组织", locale === "en" ? "Contact sales" : "联系销售（获取企业方案）", "demo"],
            ].map(([name,best,includes,scope,cta,leadType]) => (
              <div key={String(name)} className="light-card rounded-lg p-4">
                <h3 className="text-xl font-semibold">{String(name)}</h3>
                <p className="mb-2 text-sm text-slate-600">{String(best)}</p>
                <ul className="mb-2 text-sm text-slate-600">{(includes as string[]).map((x) => <li key={x}>• {x}</li>)}</ul>
                <p className="mb-3 text-xs text-slate-500">{String(scope)}</p>
                <LeadModalTrigger source="plan" type={leadType as "pricing" | "demo"} label={String(cta)} onOpen={() => onPricingCta(name === "Enterprise" ? "book_demo" : "request_pricing", "plans")} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Free", locale === "en" ? "Try the core training loop for free" : "免费体验核心训练闭环", ["Core learning paths", "Weekly role-play limit", "Basic feedback & progress", "Public resources & community"], locale === "en" ? "No exports, audit-grade proof, or workflow integrations" : "不含导出报告、审计级证据链与工作流集成", t.cta.startFree, "start_free"],
              ["Individual Pro", locale === "en" ? "High-volume training + advanced scoring + exportable proof" : "高频训练 + 更强评分 + 可导出证明", ["Higher role-play volume", "Advanced rubrics", "Retraining suggestions & trends", "Exportable personal reports"], locale === "en" ? "No team management, SSO/RBAC, or enterprise workflow deployment" : "不含团队管理、SSO/RBAC 与企业工作流部署", t.cta.upgradePro, "upgrade_pro"],
            ].map(([name,best,includes,limit,cta,metric]) => (
              <div key={String(name)} className="light-card rounded-lg p-4">
                <h3 className="text-xl font-semibold">{String(name)}</h3>
                <p className="mb-2 text-sm text-slate-600">{String(best)}</p>
                <ul className="mb-2 text-sm text-slate-600">{(includes as string[]).map((x) => <li key={x}>• {x}</li>)}</ul>
                <p className="mb-3 text-xs text-slate-500">{String(limit)}</p>
                <LeadModalTrigger source="plan" type="demo" label={String(cta)} onOpen={() => onPricingCta(String(metric), "plans")} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="light-card rounded-lg p-4">
        <h2 className="mb-3 text-xl font-semibold">{track === "business" ? c.compareBusiness : c.compareIndividual}</h2>
        <div className="overflow-x-auto">
          {track === "business" ? (
            <table className="min-w-full text-sm">
              <thead><tr className="border-b"><th className="p-2 text-left">Core platform｜Proof & audit｜Integrations｜Admin & security｜Support</th><th className="p-2">Starter</th><th className="p-2">Pro</th><th className="p-2">Enterprise</th></tr></thead>
              <tbody>
                {[["Training loop","✓","✓","✓"],["Exportable reports","—","✓","✓"],["Custom integrations","Business only","Business only","✓"],["SSO/RBAC","—","—","✓"]].map((r)=> <tr key={r[0]} className="border-b"><td className="p-2">{r[0]}</td><td className="p-2 text-center">{r[1]}</td><td className="p-2 text-center">{r[2]}</td><td className="p-2 text-center">{r[3]}</td></tr>)}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full text-sm">
              <thead><tr className="border-b"><th className="p-2 text-left">Training｜Scoring｜Outputs｜Limits</th><th className="p-2">Free</th><th className="p-2">Pro</th></tr></thead>
              <tbody>
                {[["Role-play volume","Weekly limit","Higher"],["Advanced rubric","—","✓"],["Exports","—","✓"],["Team workflow integration","—","—"]].map((r)=> <tr key={r[0]} className="border-b"><td className="p-2">{r[0]}</td><td className="p-2 text-center">{r[1]}</td><td className="p-2 text-center">{r[2]}</td></tr>)}
              </tbody>
            </table>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">{track === "business" ? (locale === "en" ? "Final scope is defined in the quote (phased expansion supported)." : "具体范围以报价单为准（可按阶段扩容）。") : (locale === "en" ? "For team rollout and integrations, see Business plans." : "需要团队协作与集成能力，请查看企业版。")}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <h2 className="col-span-full text-2xl font-semibold">{c.driversTitle}</h2>
        {(track === "business" ? [
          ["Seats", locale === "en" ? "Scoped by seats with phased expansion" : "按团队规模与席位数，支持分阶段扩容"],
          ["Modules", locale === "en" ? "Modules: Training / Role-play / Analytics" : "按模块组合：Training / Role-play / Analytics"],
          ["Integrations", locale === "en" ? "Standard + custom integrations (triggers/reporting)" : "标准集成 + 可选定制集成（触发/回传/看板）"],
          ["Security & SLA", locale === "en" ? "SSO/RBAC/audit/retention/onboarding SLA" : "SSO/RBAC/审计/留存/上线 SLA 等企业要求"],
        ] : [
          [locale === "en" ? "Training volume" : "训练额度", locale === "en" ? "Higher usage ceilings" : "更高训练额度"],
          [locale === "en" ? "Scoring depth" : "评分深度", locale === "en" ? "Advanced rubric and evidence" : "高级 rubric 与证据片段"],
          [locale === "en" ? "Exports" : "导出能力", locale === "en" ? "PDF/CSV report exports" : "PDF/CSV 报告导出"],
          [locale === "en" ? "Support" : "支持服务", locale === "en" ? "Pro-level enablement" : "Pro 级支持"],
        ]).map(([title, desc]) => <div key={String(title)} className="light-card rounded-lg p-4"><p className="font-semibold">{String(title)}</p><p className="text-sm text-slate-600">{String(desc)}</p></div>)}
      </section>

      {track === "business" && (
        <>
          <section className="light-card rounded-lg p-4">
            <h2 className="mb-3 text-2xl font-semibold">{c.pilotTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div><p>• {locale === "en" ? "Scope: 1 role × 3–5 scenarios" : "范围：1 个岗位 × 3–5 个核心场景"}</p><p>• {locale === "en" ? "Deliverables: rubrics + dashboard + exportable report" : "交付：rubric 模板 + 评分看板 + 试点报告（可导出）"}</p><p>• {locale === "en" ? "Success: completion, SOP error reduction, score lift trend" : "验收：完成率、关键 SOP 错误率下降、得分提升趋势"}</p></div>
              <div className="flex items-center"><LeadModalTrigger source="pilotOffer" type="pilot" label={t.cta.pilot} onOpen={() => onPricingCta("start_pilot", "pilotOffer")} /></div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="light-card rounded-lg p-4"><h3 className="mb-2 text-xl font-semibold">{locale === "en" ? "Add-ons & services" : "增购项与专业服务"}</h3><p className="text-sm text-slate-600">{locale === "en" ? "Extra standard integrations｜Custom integrations｜Scenario packs｜Retention/export upgrades｜Custom domain｜Private deployment" : "额外标准集成｜定制集成｜场景包扩展｜数据留存/导出增强｜专属域名｜私有化部署"}</p></div>
            <div className="light-card rounded-lg p-4"><h3 className="mb-2 text-xl font-semibold">{locale === "en" ? "Services" : "服务"}</h3><p className="text-sm text-slate-600">{locale === "en" ? "Rubric/competency design｜Workflow design｜Enablement & manager coaching" : "rubric/胜任力体系共创｜workflow 设计咨询｜培训运营与管理者辅导"}</p></div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">{c.procurement}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="light-card rounded-lg p-4"><p className="font-semibold">Contract</p><p className="text-sm text-slate-600">{locale === "en" ? "Annual/multi-year with phased expansion" : "年度/多年度合同，支持按阶段扩容"}</p></div>
              <div className="light-card rounded-lg p-4"><p className="font-semibold">Billing</p><p className="text-sm text-slate-600">{locale === "en" ? "Invoice / PO / bank transfer (as supported)" : "支持对公开票/PO/银行转账（按实际能力调整）"}</p></div>
              <div className="light-card rounded-lg p-4"><p className="font-semibold">Security review</p><p className="text-sm text-slate-600">{locale === "en" ? "Security review pack, DPA, access & audit documentation" : "提供安全评审材料、DPA、权限与审计说明"}</p></div>
            </div>
          </section>
        </>
      )}

      {track === "individual" && (
        <section className="light-card rounded-lg p-5">
          <h2 className="mb-2 text-2xl font-semibold">{c.upgradeTitle}</h2>
          <p className="mb-3 text-slate-600">{c.upgradeBody}</p>
          <div className="flex gap-2">
            <button onClick={() => switchTrack("business")} className="rounded border border-slate-300 px-3 py-2 text-sm">{locale === "en" ? "See Business pricing" : "查看企业版定价"}</button>
            <LeadModalTrigger source="upgradeBand" type="demo" label={t.cta.demo} onOpen={() => onPricingCta("book_demo", "upgradeBand")} />
          </div>
        </section>
      )}

      <section className="dark-hero rounded-xl p-6 text-cosmic-text">
        <p className="mb-3 text-xl font-semibold">{track === "business" ? c.finalBusiness : c.finalIndividual}</p>
        <div className="flex flex-wrap gap-2">
          {track === "business" ? (
            <>
              <LeadModalTrigger source="finalBand" type="pricing" label={t.cta.requestPricing} onOpen={() => onPricingCta("request_pricing", "finalBand")} />
              <LeadModalTrigger source="finalBand" type="pilot" label={t.cta.pilot} onOpen={() => onPricingCta("start_pilot", "finalBand")} />
            </>
          ) : (
            <>
              <LeadModalTrigger source="finalBand" type="demo" label={t.cta.startFree} onOpen={() => onPricingCta("start_free", "finalBand")} />
              <LeadModalTrigger source="finalBand" type="demo" label={t.cta.upgradePro} onOpen={() => onPricingCta("upgrade_pro", "finalBand")} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
