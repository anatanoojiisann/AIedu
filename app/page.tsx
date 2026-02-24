"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { LeadModalTrigger } from "@/components/lead-modal";
import { useLocale } from "@/components/locale-context";

function HeroIllustration({ mobile = false }: { mobile?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);

  if (broken) {
    return <div className={`rounded-xl border border-cosmic-silver/30 bg-cosmic-navy/20 ${mobile ? "h-52" : "h-[520px] lg:h-[580px]"} p-4 text-sm text-cosmic-secondary`}>Illustration unavailable.</div>;
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-cosmic-silver/20 bg-[radial-gradient(circle_at_70%_35%,rgba(10,160,255,0.22),transparent_55%)] ${mobile ? "h-52 max-h-[320px] w-full" : "h-[420px] max-h-[480px] lg:h-[560px] lg:max-h-[600px]"}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}
      <picture>
        <source srcSet="/images/hero-illustration-v1.webp" type="image/webp" />
        <img
          src="/images/hero-illustration-v1.png"
          alt="AI-assisted training session with scorecards and analytics dashboards."
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
          className="h-full w-full object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          style={{ objectPosition: "right center" }}
        />
      </picture>
    </div>
  );
}

function CompareGlowImage({ type }: { type: "before" | "after" }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);

  if (broken) {
    return <div className="flex min-h-[320px] items-center justify-center text-sm text-cosmic-secondary">Image unavailable</div>;
  }

  return (
    <div className={`relative flex min-h-[320px] items-center justify-center py-6 sm:min-h-[380px] lg:min-h-[460px] ${type === "before" ? "before-fog" : "after-glow"}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      <picture>
        <source srcSet={`/images/system-compare-${type}-v1.webp`} type="image/webp" />
        <img
          src={`/images/system-compare-${type}-v1.png`}
          alt={type === "before" ? "Fragmented training system with disconnected signals and no unified scoring." : "Closed-loop training system with continuous assessment, retraining cycle, and workflow execution."}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
          className={`h-full w-full max-h-[60vh] object-contain ${type === "before" ? "brightness-[0.86] saturate-90" : "scale-[1.02] saturate-110"}`}
        />
      </picture>
    </div>
  );
}

function ThirdScreenImage({ kind }: { kind: "hexa" | "workflow" }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const base = kind === "hexa" ? "/images/hexa-loop-v1" : "/images/workflow-native-v1";

  if (broken) {
    return <div className="flex min-h-[320px] items-center justify-center text-sm text-cosmic-secondary">Visual unavailable</div>;
  }

  return (
    <div className={`relative flex items-center justify-center ${kind === "hexa" ? "min-h-[340px] sm:min-h-[420px] lg:min-h-[520px]" : "min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]"}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}
      <picture>
        <source srcSet={`${base}.webp`} type="image/webp" />
        <img
          src={`${base}.png`}
          alt={kind === "hexa" ? "Hexa Loop methodology diagram showing a closed-loop training cycle." : "Workflow-native training flow: trigger, practice, score, and dashboard."}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
          className={`w-full object-contain ${kind === "hexa" ? "max-w-[960px]" : "max-w-[640px]"} max-h-[60vh]`}
        />
      </picture>
    </div>
  );
}

export default function HomePage() {
  const { locale, t } = useLocale();
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const compareRef = useRef<HTMLElement>(null);
  const thirdRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [
      { key: "Hero", ref: heroRef },
      { key: "Compare", ref: compareRef },
      { key: "ThirdScreen", ref: thirdRef },
    ];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) console.log("section_view", { section: entry.target.getAttribute("data-section"), locale });
      });
    }, { threshold: 0.5 });
    refs.forEach(({ key, ref }) => {
      if (ref.current) {
        ref.current.setAttribute("data-section", key);
        obs.observe(ref.current);
      }
    });
    return () => obs.disconnect();
  }, [locale]);

  const text = locale === "en" ? {
    eyebrow: "Verified training loop + workflow-native integrations",
    title: "The AI Skill OS for enterprise teams—train faster, prove impact, deploy into workflows.",
    sub: "Manager-verified role-play scoring + analytics to cut ramp time and reduce workflow errors.",
    works: "Works with your current business processes and enterprise governance.",
    compareTitle: "Training breaks when systems don’t close the loop.",
    compareSub: "Fragmented signals. No proof. No workflow execution.",
    micro: "See how HexaOrigin connects every signal →",
    thirdTitle: "Hexa Loop methodology: one system, continuous improvement",
    thirdSub: "A closed-loop approach that translates training into measurable, operational performance.",
    workflowTitle: "Training happens where work happens.",
    workflowSub: "Auto-triggered deployment inside daily workflows.",
    controlsTitle: "Enterprise-grade controls",
    pilotTitle: "2-week pilot: from training to proven impact",
    faq: [["Do you need internal data?", "No for MVP. Start with approved SOP content."], ["Can we review scoring evidence?", "Yes, every score has dimensions and evidence snippets."], ["Can we start small?", "Yes, one role pilot is default."]],
  } : {
    eyebrow: "Verified training loop + workflow-native integrations",
    title: "面向企业团队的 AI Skill OS：训练更快、效果可证、落地到工作流",
    sub: "用经理可验证的角色扮演评分 + 数据看板，缩短上岗时间并降低流程错误。",
    works: "适配你的现有业务流程与企业治理要求。",
    compareTitle: "Training breaks when systems don’t close the loop.",
    compareSub: "Fragmented signals. No proof. No workflow execution.",
    micro: "查看 HexaOrigin 如何连接每个信号 →",
    thirdTitle: "Hexa Loop 方法论：同一系统持续优化",
    thirdSub: "用闭环方法把训练转化为可衡量、可执行的业务表现。",
    workflowTitle: "训练发生在工作发生的地方",
    workflowSub: "Auto-triggered 自动触发，融入日常流程。",
    controlsTitle: "企业级管理控制",
    pilotTitle: "2 周试点：从训练到可证明效果",
    faq: [["需要接入内部数据吗？", "MVP 不强制，可先用 SOP 内容。"], ["评分是否可复核？", "可以，每条评分都有证据片段。"], ["可以从小范围开始吗？", "可以，默认单岗位试点。"]],
  };

  return (
    <main>
      <section ref={heroRef} className="dark-hero py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-cosmic-text">
            <p className="mb-3 text-cosmic-cyan">{text.eyebrow}</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight">{text.title}</h1>
            <div className="mb-4 block lg:hidden"><HeroIllustration mobile /></div>
            <p className="mb-4 text-cosmic-secondary">{text.sub}</p>
            <ul className="mb-5 space-y-2 text-sm text-cosmic-text">{["Closed-loop training", "Proof with scorecards & trends", "Workflow-native deployment"].map((bullet) => <li key={bullet} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-cosmic-cyan"/>{bullet}</li>)}</ul>
            <div className="mb-3 flex flex-wrap gap-2 text-cosmic-text"><LeadModalTrigger source="hero" type="demo" label={t.cta.demo} /><LeadModalTrigger source="hero" type="pilot" label={t.cta.pilot} /></div>
            <p className="text-xs text-cosmic-secondary">{text.works}</p>
          </div>
          <div className="hidden lg:block"><HeroIllustration /></div>
        </div>
      </section>

      <section ref={compareRef} className="relative overflow-hidden bg-[linear-gradient(160deg,#05091f_0%,#0a1a42_45%,#071433_100%)] py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(10,160,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(0,229,255,0.16),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 text-cosmic-text">
          <h2 className="mb-2 text-3xl font-semibold">{text.compareTitle}</h2>
          <p className="mb-8 text-cosmic-secondary">{text.compareSub}</p>
          <div className="grid items-center gap-8 lg:grid-cols-[48fr_52fr] lg:gap-12">
            <div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-cosmic-secondary">System Breakdown</p><CompareGlowImage type="before" /><ul className="mt-2 space-y-2 text-sm text-cosmic-secondary"><li>• Disconnected signals</li><li>• No unified scoring</li><li>• No operational deployment</li></ul></div>
            <div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-cosmic-cyan">Closed-Loop System</p><CompareGlowImage type="after" /><ul className="mt-2 space-y-2 text-sm text-cosmic-text"><li>• Continuous assessment loop</li><li>• Spot-check → retrain feedback cycle</li><li>• Workflow-native execution</li><li>• Exportable governance proof</li></ul></div>
          </div>
          <div className="mt-8 flex justify-center"><Link href="/business" className="rounded-full border border-cosmic-silver/40 bg-cosmic-navy/40 px-5 py-2 text-sm text-cosmic-cyan hover:bg-cosmic-navy/70">{text.micro}</Link></div>
        </div>
      </section>

      <section ref={thirdRef}>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(10,160,255,0.28),transparent_48%),linear-gradient(180deg,#041027_0%,#08183b_100%)] py-16 text-cosmic-text">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-2 text-center text-3xl font-semibold">{text.thirdTitle}</h2>
            <p className="mx-auto mb-10 max-w-3xl text-center text-cosmic-secondary">{text.thirdSub}</p>
            <ThirdScreenImage kind="hexa" />
            <div className="mt-6 grid gap-2 text-sm text-cosmic-secondary md:grid-cols-3 lg:grid-cols-6">
              {[
                "Structured scenario pack",
                "Real-world simulations",
                "Verified scoring",
                "Gap correction",
                "Exportable proof",
                "Org-wide rollout",
              ].map((item) => <div key={item} className="rounded bg-cosmic-navy/40 px-3 py-2 text-center">{item}</div>)}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="order-1"><ThirdScreenImage kind="workflow" /></div>
            <div className="order-2">
              <h3 className="mb-2 text-3xl font-semibold text-slate-900">{text.workflowTitle}</h3>
              <p className="mb-5 text-slate-600">{text.workflowSub}</p>
              <div className="space-y-3 text-sm text-slate-700">
                <p><strong>Trigger</strong> — Auto-triggered by real tasks</p>
                <p><strong>Practice & Score</strong> — Simulate → Score → Identify gaps</p>
                <p><strong>Dashboard</strong> — Managers see verified performance trends</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-200 py-10">
          <div className="mx-auto max-w-6xl px-4">
            <h3 className="mb-4 text-2xl font-semibold text-slate-900">{text.controlsTitle}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4"><p className="font-semibold text-slate-900">RBAC</p><p className="text-sm text-slate-600">Role-scoped access for managers and teams.</p></div>
              <div className="rounded-lg bg-white p-4"><p className="font-semibold text-slate-900">Audit Logs</p><p className="text-sm text-slate-600">Traceable records for training and reviews.</p></div>
              <div className="rounded-lg bg-white p-4"><p className="font-semibold text-slate-900">Data Isolation</p><p className="text-sm text-slate-600">Tenant boundaries and controlled data access.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#0a1f54] to-[#0b2a73] py-12 text-cosmic-text">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h3 className="mb-3 text-2xl font-semibold">{text.pilotTitle}</h3>
            <ul className="mb-5 grid gap-2 text-sm text-cosmic-secondary sm:grid-cols-2 lg:grid-cols-4">
              <li>Scenario pack</li><li>Scorecards</li><li>Manager dashboard</li><li>Pilot report</li>
            </ul>
            <div className="flex justify-center"><LeadModalTrigger source="pilot" type="pilot" label={t.cta.pilot} /></div>
          </div>
        </section>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6"><h2 className="mb-4 text-2xl font-semibold">FAQ</h2><div className="space-y-2">{text.faq.map(([q,a],i)=><div key={q} className="light-card rounded-lg p-3"><button className="flex w-full items-center justify-between text-left font-medium" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{q}<span>{openFaq===i?"−":"+"}</span></button>{openFaq===i && <p className="pt-2 text-sm text-slate-600">{a}</p>}</div>)}</div></section>
    </main>
  );
}
