"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, Link2, ChartNoAxesColumn, Workflow, CheckCircle2 } from "lucide-react";
import { LeadModalTrigger } from "@/components/lead-modal";
import { useLocale } from "@/components/locale-context";

const loop = ["Learn", "Practice", "Assess", "Retrain", "Prove", "Scale"];

function HeroIllustration({ mobile = false }: { mobile?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className={`rounded-xl border border-cosmic-silver/30 bg-cosmic-navy/20 ${mobile ? "h-52" : "h-[520px] lg:h-[580px]"} p-4 text-sm text-cosmic-secondary`}>
        Illustration unavailable.
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-cosmic-silver/20 bg-[radial-gradient(circle_at_70%_35%,rgba(10,160,255,0.22),transparent_55%)] ${mobile ? "h-52 max-h-[320px] w-full" : "h-[420px] max-h-[480px] lg:h-[560px] lg:max-h-[600px]"}`}
    >
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
          className="h-full w-full object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]" style={{ objectPosition: "right center" }}
        />
      </picture>
    </div>
  );
}

export default function HomePage() {
  const { locale, t } = useLocale();
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLElement>(null);
  const pilotRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [
      { key: "Hero", ref: heroRef },
      { key: "HexaLoop", ref: loopRef },
      { key: "Pilot", ref: pilotRef },
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
    problem: "Enterprise training breaks at the loop—and deployment.",
    hexa: "Hexa Loop: turn training into a continuously improving system",
    workflow: "Training happens where work happens.",
    security: "Enterprise-grade controls",
    pilot: "2-week pilot: from training to proven impact",
    faq: [
      ["Do you need internal data?", "No for MVP. Start with approved SOP content."],
      ["Can we review scoring evidence?", "Yes, every score has dimensions and evidence snippets."],
      ["Can we start small?", "Yes, one role pilot is default."],
    ]
  } : {
    eyebrow: "Verified training loop + workflow-native integrations",
    title: "面向企业团队的 AI Skill OS：训练更快、效果可证、落地到工作流",
    sub: "用经理可验证的角色扮演评分 + 数据看板，缩短上岗时间并降低流程错误。",
    works: "适配你的现有业务流程与企业治理要求。",
    problem: "企业培训的瓶颈，不在内容，在闭环和落地。",
    hexa: "Hexa Loop：把培训变成持续可优化系统",
    workflow: "训练不脱离工作流：在团队每天用的地方发生",
    security: "企业级管理控制",
    pilot: "2 周试点：把岗位培训跑到可证明效果",
    faq: [
      ["需要接入内部数据吗？", "MVP 不强制，可先用 SOP 内容。"],
      ["评分是否可复核？", "可以，每条评分都有证据片段。"],
      ["可以从小范围开始吗？", "可以，默认单岗位试点。"],
    ]
  };

  const badges = useMemo(() => ["SSO", "RBAC", "Audit Logs", "Data Isolation", "Export Reports", "Admin Controls"], []);

  return (
    <main>
      <section ref={heroRef} className="dark-hero py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-cosmic-text">
            <p className="mb-3 text-cosmic-cyan">{text.eyebrow}</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight">{text.title}</h1>
            <div className="mb-4 block lg:hidden">
              <HeroIllustration mobile />
            </div>
            <p className="mb-4 text-cosmic-secondary">{text.sub}</p>
            <ul className="mb-5 space-y-2 text-sm text-cosmic-text">
              {["Closed-loop training", "Proof with scorecards & trends", "Workflow-native deployment"].map((bullet) => <li key={bullet} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-cosmic-cyan"/>{bullet}</li>)}
            </ul>
            <div className="mb-3 flex flex-wrap gap-2 text-cosmic-text">
              <LeadModalTrigger source="hero" type="demo" label={t.cta.demo} />
              <LeadModalTrigger source="hero" type="pilot" label={t.cta.pilot} />
            </div>
            <p className="text-xs text-cosmic-secondary">{text.works}</p>
          </div>
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 md:grid-cols-6">{badges.map((b) => <div key={b} className="light-card rounded-lg p-3 text-center text-sm text-slate-600">{b}</div>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[{title:"Go live in 24 hours",sub:"From workflow import to first manager report",icon:<Workflow size={16}/>},{title:"92% scenario completion",sub:"Verified role-play scoring",icon:<ChartNoAxesColumn size={16}/>},{title:"34% fewer onboarding errors",sub:"Measured on SOP checkpoints",icon:<ShieldCheck size={16}/>}].map((k) => (<div key={k.title} className="light-card rounded-lg p-4"><div className="mb-2 inline-flex rounded bg-slate-100 p-2">{k.icon}</div><p className="kpi-num text-2xl font-bold">{k.title}</p><p className="text-sm text-slate-600">{k.sub}</p></div>))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-2xl font-semibold">{text.problem}</h2><div className="grid gap-4 md:grid-cols-2"><div className="light-card rounded-lg p-4">• No proof of impact<br/>• Managers can’t trust skill levels<br/>• Training is disconnected from workflows</div><div className="light-card rounded-lg p-4">• Scorecards + trends + exportable proof<br/>• Role-play + spot checks + retraining<br/>• Integrations with your workflow stack</div></div></section>
      <section ref={loopRef} className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-2xl font-semibold">{text.hexa}</h2><div className="grid gap-3 md:grid-cols-6">{loop.map((s, i)=><div key={s} className="light-card rounded-lg p-3 text-center"><p className="text-xs text-slate-500">0{i+1}</p><p>{s}</p></div>)}</div></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-2xl font-semibold">{text.workflow}</h2><div className="grid gap-4 md:grid-cols-2"><div className="light-card rounded-lg p-4"><div className="flex items-center justify-between text-sm"><span>Trigger</span><Link2 size={14}/><span>Practice</span><Link2 size={14}/><span>Score</span><Link2 size={14}/><span>Dashboard</span></div></div><div className="light-card rounded-lg p-4 text-slate-600">Onboarding SOP, support scenarios, sales enablement.</div></div></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="text-2xl font-semibold">{text.security}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{["RBAC", "Audit logs", "Data isolation"].map(i=><div key={i} className="light-card rounded-lg p-3">{i}</div>)}</div></section>
      <section ref={pilotRef} className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-2xl font-semibold">{text.pilot}</h2><div className="light-card rounded-lg p-4"><p className="mb-3 text-slate-600">Deliverables: scenario pack, scorecards, manager dashboard, pilot report.</p><LeadModalTrigger source="pilot" type="pilot" label={t.cta.pilot} /></div></section>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6"><h2 className="mb-4 text-2xl font-semibold">FAQ</h2><div className="space-y-2">{text.faq.map(([q,a],i)=><div key={q} className="light-card rounded-lg p-3"><button className="flex w-full items-center justify-between text-left font-medium" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{q}<span>{openFaq===i?"−":"+"}</span></button>{openFaq===i && <p className="pt-2 text-sm text-slate-600">{a}</p>}</div>)}</div></section>
    </main>
  );
}
