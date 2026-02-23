"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, Link2, ChartNoAxesColumn, Workflow, CheckCircle2 } from "lucide-react";
import { LeadModalTrigger } from "@/components/lead-modal";
import { useLocale } from "@/components/locale-context";

type Copy = {
  hero: { eyebrow: string; title: string; subhead: string; bullets: string[]; worksWith: string };
  integrations: string;
  trustTitle: string;
  problemTitle: string;
  problems: string[];
  solutions: string[];
  hexaTitle: string;
  workflowTitle: string;
  workflowUseCases: string;
  securityTitle: string;
  pilotTitle: string;
  pilotDeliverables: string[];
  week1: string;
  week2: string;
  faq: Array<{ q: string; a: string }>;
};

const content: Record<"en" | "zh", Copy> = {
  en: {
    hero: {
      eyebrow: "Verified training loop + workflow-native integrations",
      title: "The AI Skill OS for enterprise teams—train faster, prove impact, deploy into workflows.",
      subhead: "Manager-verified role-play scoring + analytics to cut ramp time, reduce workflow errors, and deploy to DingTalk / WeCom / Slack.",
      bullets: [
        "Closed-loop training with retraining triggers",
        "Proof you can share: scorecards, trends, audit trails",
        "Workflow-native deployment into daily tools",
      ],
      worksWith: "Works with: DingTalk / WeCom / Slack (extensible)",
    },
    integrations: "Embed training into daily work: triggers, nudges, reporting, dashboards.",
    trustTitle: "Procurement-ready capabilities",
    problemTitle: "Enterprise training breaks at the loop—and deployment.",
    problems: ["No proof of impact", "Managers can’t trust skill levels", "Training is disconnected from workflows"],
    solutions: ["Scorecards + trends + exportable proof", "Role-play + spot checks + retraining triggers", "Workflow-native integrations"],
    hexaTitle: "Hexa Loop: turn training into a continuously improving system",
    workflowTitle: "Training happens where work happens.",
    workflowUseCases: "Onboarding SOP, support scenarios, sales enablement",
    securityTitle: "Enterprise-grade security & controls",
    pilotTitle: "2-week pilot: from training to proven impact",
    pilotDeliverables: ["Role + 3-5 scenarios", "Scorecards + spot-check process", "Manager dashboard", "Pilot report with expansion plan"],
    week1: "Week 1: scenario design, rubric, integration, first assessment",
    week2: "Week 2: retraining, second assessment, trend validation, report",
    faq: [
      { q: "Do you need access to internal data?", a: "No for MVP. We can start with synthetic or approved SOP-only content." },
      { q: "Is scoring explainable and reviewable?", a: "Yes, every score maps to dimensions, weight and evidence snippets." },
      { q: "Do you support private deployments?", a: "Private options can be scoped for enterprise requirements." },
      { q: "Can we start with one role?", a: "Yes, one-role pilot is the default onboarding path." },
      { q: "How do we measure ROI?", a: "Ramp time, SOP error rate, completion and score lift are tracked in pilot report." },
    ],
  },
  zh: {
    hero: {
      eyebrow: "Verified training loop + workflow-native integrations",
      title: "面向企业团队的 AI Skill OS：训练更快、效果可证、落地到工作流",
      subhead: "用经理可验证的角色扮演评分 + 数据看板，缩短上岗时间，降低流程错误，并部署到钉钉 / 企微 / Slack。",
      bullets: ["训练闭环：学习→演练→评估→复训（自动追踪）", "可证明：评分卡、趋势、审计式记录", "可落地：接入协作工具嵌入日常任务"],
      worksWith: "已适配：钉钉 / 企业微信 / Slack（可扩展）",
    },
    integrations: "把训练嵌入日常协作：任务触发、提醒、结果回传、管理看板。",
    trustTitle: "采购关键信息",
    problemTitle: "企业培训的瓶颈，不在内容，在闭环和落地。",
    problems: ["培训后无法证明效果", "经理不知道谁真正会做", "培训与工作流割裂"],
    solutions: ["评分卡 + 趋势 + 证据链（可导出）", "Role-play + 抽检 + 复训触发", "Workflow-native integrations"],
    hexaTitle: "Hexa Loop：把培训变成持续可优化系统",
    workflowTitle: "训练不脱离工作流：在团队每天用的地方发生",
    workflowUseCases: "新员工入职 SOP、客服话术演练、销售跟进标准化",
    securityTitle: "企业级安全与管理控制",
    pilotTitle: "2 周试点：把一个岗位从培训跑到可证明效果",
    pilotDeliverables: ["1 个岗位 × 3–5 个核心场景", "评分卡 + 抽检流程", "管理看板", "试点报告 + 扩展建议"],
    week1: "第 1 周：场景定义、评分表、集成上线、首轮评估",
    week2: "第 2 周：复训触发、二轮评估、趋势验证、交付报告",
    faq: [
      { q: "需要接入内部数据吗？", a: "MVP 不强制，可先用脱敏或 SOP 内容启动。" },
      { q: "评分是否可解释、可复核？", a: "可以，每条评分都对应维度、权重与证据片段。" },
      { q: "是否支持私有化部署？", a: "可按企业合规需求评估私有化方案。" },
      { q: "可以先从一个岗位开始吗？", a: "可以，默认就是单岗位试点。" },
      { q: "如何衡量 ROI？", a: "以完成率、错误率、评分提升和上岗时间衡量。" },
    ],
  },
};

const hexa = ["Learn", "Practice", "Assess", "Retrain", "Prove", "Scale"];

export default function HomePage() {
  const { locale, t } = useLocale();
  const c = content[locale];
  const [visualLoading, setVisualLoading] = useState(true);
  const [visualError, setVisualError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLElement>(null);
  const pilotRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisualLoading(false), 650);
    const errorTimer = setTimeout(() => setVisualError(Math.random() < 0.08), 700);
    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
    };
  }, []);

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

  const badges = useMemo(() => ["SSO", "RBAC", "Audit Logs", "Data Isolation", "Export Reports", "Admin Controls"], []);

  return (
    <main>
      <section ref={heroRef} className="dark-hero py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div className="text-cosmic-text">
            <p className="mb-3 text-cosmic-cyan">{c.hero.eyebrow}</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight">{c.hero.title}</h1>
            <p className="mb-4 text-cosmic-secondary">{c.hero.subhead}</p>
            <ul className="mb-5 space-y-2 text-sm text-cosmic-text">
              {c.hero.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-cosmic-cyan"/>{bullet}</li>)}
            </ul>
            <div className="mb-3 flex flex-wrap gap-2 text-cosmic-text">
              <LeadModalTrigger source="hero" type="demo" label={t.cta.demo} />
              <LeadModalTrigger source="hero" type="pilot" label={t.cta.pilot} />
            </div>
            <p className="text-xs text-cosmic-secondary">{c.hero.worksWith}</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-cosmic-text">
            {visualLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded bg-white/10" />)}</div>
            ) : visualError ? (
              <div className="rounded border border-cosmic-silver/40 p-6 text-sm text-cosmic-secondary">{locale === "en" ? "Preview unavailable, fallback visual loaded." : "主视觉加载失败，已切换静态占位。"}</div>
            ) : (
              <div className="space-y-3">
                {[
                  "Training: Scenario library · completion",
                  "Role-play: weighted scorecard · evidence",
                  "Analytics: trend up · error rate down",
                ].map((item, i) => <div key={item} className={`rounded-lg border border-cosmic-silver/40 p-3 ${i===1?"translate-x-3":""}`}>{item}</div>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 text-sm text-slate-700">
          <span className="font-medium">DingTalk</span><span>•</span><span className="font-medium">WeCom</span><span>•</span><span className="font-medium">Slack</span>
          <span className="text-slate-500">{c.integrations}</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-3 text-xl font-semibold">{c.trustTitle}</h2>
        <div className="grid gap-3 md:grid-cols-6">{badges.map((b) => <div key={b} className="light-card rounded-lg p-3 text-center text-sm text-slate-600">{b}</div>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[{title:"Go live in 24 hours",sub:locale==="en"?"From workflow import to first manager report":"从工作流导入到第一份管理报告",icon:<Workflow size={16}/>},
          {title:"92% scenario completion",sub:locale==="en"?"Verified role-play scoring":"经理可验证的角色扮演评分",icon:<ChartNoAxesColumn size={16}/>},
          {title:"34% fewer onboarding errors",sub:locale==="en"?"Measured on SOP checkpoints":"基于 SOP 关键检查点统计",icon:<ShieldCheck size={16}/>}].map((k) => (
            <div key={k.title} className="light-card rounded-lg p-4">
              <div className="mb-2 inline-flex rounded bg-slate-100 p-2">{k.icon}</div>
              <p className="kpi-num text-2xl font-bold">{k.title}</p>
              <p className="text-sm text-slate-600">{k.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{c.problemTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4"><h3 className="mb-2 font-semibold">Problem</h3><ul className="space-y-2 text-slate-600">{c.problems.map((p)=><li key={p}>• {p}</li>)}</ul></div>
          <div className="light-card rounded-lg p-4"><h3 className="mb-2 font-semibold">Solution</h3><ul className="space-y-2 text-slate-600">{c.solutions.map((p)=><li key={p}>• {p}</li>)}</ul></div>
        </div>
      </section>

      <section ref={loopRef} className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{c.hexaTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-3 gap-3">{hexa.map((s, i) => <div key={s} className={`rounded-lg border p-3 text-center ${i===2 ? "border-cosmic-blue bg-cyan-50" : "light-card"}`}><p className="text-xs text-slate-500">0{i+1}</p><p>{s}</p></div>)}</div>
          <ul className="light-card space-y-2 rounded-lg p-4 text-slate-600">
            <li>Learn: SOP modules</li><li>Practice: reusable role-play scenarios</li><li>Assess: scorecards + gaps</li><li>Retrain: auto trigger weak spots</li><li>Prove: report + audit trail</li><li>Scale: replicate across teams</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Product Modules</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[{t:"Training",d:locale==="en"?"Scenario-based learning with task-driven training":"场景化学习与任务化训练",b:["Scenario library","Assignments","Completion tracking"]},
          {t:"Role-play",d:locale==="en"?"Explainable scoring with manager spot checks":"可解释评分 + 经理抽检",b:["Dimensions & weights","Evidence snippets","Review workflow"]},
          {t:"Analytics",d:locale==="en"?"Trends & attribution for retraining":"趋势与归因，指导复训",b:["Improvement trends","Error clusters","Retraining priorities"]}].map((m)=><div key={m.t} className="light-card rounded-lg p-4"><h3 className="text-xl font-semibold">{m.t}</h3><p className="mb-2 text-sm text-slate-600">{m.d}</p><ul className="mb-2 text-sm text-slate-600">{m.b.map(x=><li key={x}>• {x}</li>)}</ul><div className="h-20 rounded bg-slate-100"/></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{c.workflowTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4">
            <div className="flex items-center justify-between text-sm"><span>Trigger</span><Link2 size={14}/><span>Practice</span><Link2 size={14}/><span>Score</span><Link2 size={14}/><span>Dashboard</span><Link2 size={14}/><span>Retrain</span></div>
          </div>
          <div className="light-card rounded-lg p-4 text-slate-600">{c.workflowUseCases}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-2xl font-semibold">{c.securityTitle}</h2><a href="/security" className="text-sm text-cosmic-blue underline">{t.cta.viewSecurity}</a></div>
        <div className="grid gap-3 md:grid-cols-2">
          {["RBAC", "Audit logs", "Data isolation", "Export & retention", "Admin console", "Compliance-ready"].map((i) => <div key={i} className="light-card rounded-lg p-3 text-slate-700">{i}</div>)}
        </div>
        <div className="mt-4"><LeadModalTrigger source="security" type="demo" label={t.cta.demo} /></div>
      </section>

      <section ref={pilotRef} className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{c.pilotTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4"><h3 className="mb-2 font-semibold">Deliverables</h3><ul className="space-y-2 text-slate-600">{c.pilotDeliverables.map((d)=><li key={d}>• {d}</li>)}</ul></div>
          <div className="light-card rounded-lg p-4"><h3 className="mb-2 font-semibold">Timeline</h3><p className="mb-2 text-slate-600">{c.week1}</p><p className="mb-2 text-slate-600">{c.week2}</p><p className="text-sm text-slate-500">{locale==="en"?"Success criteria: completion ≥ X%, SOP errors ↓ ≥ Y%, score lift ≥ Z":"验收指标：完成率 ≥ X%，SOP 错误率下降 ≥ Y%，评分提升 ≥ Z"}</p></div>
        </div>
        <div className="mt-4 flex gap-2">
          <LeadModalTrigger source="pilot" type="pilot" label={t.cta.pilot} />
          <LeadModalTrigger source="pilot" type="demo" label={locale === "en" ? "Talk to sales" : "联系销售"} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
        <div className="space-y-2">{c.faq.map((f, i)=><div key={f.q} className="light-card rounded-lg p-3"><button className="flex w-full items-center justify-between text-left font-medium" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span>{openFaq===i?"−":"+"}</span></button>{openFaq===i && <p className="pt-2 text-sm text-slate-600">{f.a}</p>}</div>)}</div>
      </section>
    </main>
  );
}
