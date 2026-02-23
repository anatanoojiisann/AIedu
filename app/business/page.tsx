"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LeadModalTrigger } from "@/components/lead-modal";
import { useLocale } from "@/components/locale-context";

type TeamKey = "onboarding" | "support" | "sales" | "ops";

type StepData = {
  title: string;
  input: string;
  output: string;
  proof: string;
  visual: string;
};

const kpis = {
  onboarding: {
    en: [
      ["ROI", "3.2x", "Saved hours + reduced error cost (exportable model)", "Evidence-ready"],
      ["Ramp time", "-41%", "Days from onboarding to first independent SOP pass", "Workflow checkpoints"],
      ["Quality score", "+28%", "Rubric-based scoring (explainable & reviewable)", "Scoring logs"],
      ["Automation coverage", "67%", "Share of workflows connected with training triggers", "Integration events"],
    ],
    zh: [
      ["ROI", "3.2x", "口径：节省工时 + 错误成本下降（支持导出计算表）", "Evidence-ready"],
      ["上岗时间", "-41%", "口径：从入职到首次独立通过关键 SOP 的天数", "Workflow checkpoints"],
      ["质量分", "+28%", "口径：基于 rubric 维度评分（可解释/可复核）", "Scoring logs"],
      ["自动化覆盖", "67%", "口径：可触发训练/复训的工作流覆盖比例", "Integration events"],
    ],
  },
  support: {
    en: [["ROI", "2.9x", "Saved hours + reduced error cost (exportable model)", "Evidence-ready"],["Ramp time", "-35%", "Days from onboarding to first independent SOP pass", "Workflow checkpoints"],["Quality score", "+33%", "Rubric-based scoring (explainable & reviewable)", "Scoring logs"],["Automation coverage", "61%", "Share of workflows connected with training triggers", "Integration events"]],
    zh: [["ROI", "2.9x", "口径：节省工时 + 错误成本下降（支持导出计算表）", "Evidence-ready"],["上岗时间", "-35%", "口径：从入职到首次独立通过关键 SOP 的天数", "Workflow checkpoints"],["质量分", "+33%", "口径：基于 rubric 维度评分（可解释/可复核）", "Scoring logs"],["自动化覆盖", "61%", "口径：可触发训练/复训的工作流覆盖比例", "Integration events"]],
  },
  sales: {
    en: [["ROI", "3.6x", "Saved hours + reduced error cost (exportable model)", "Evidence-ready"],["Ramp time", "-38%", "Days from onboarding to first independent SOP pass", "Workflow checkpoints"],["Quality score", "+31%", "Rubric-based scoring (explainable & reviewable)", "Scoring logs"],["Automation coverage", "64%", "Share of workflows connected with training triggers", "Integration events"]],
    zh: [["ROI", "3.6x", "口径：节省工时 + 错误成本下降（支持导出计算表）", "Evidence-ready"],["上岗时间", "-38%", "口径：从入职到首次独立通过关键 SOP 的天数", "Workflow checkpoints"],["质量分", "+31%", "口径：基于 rubric 维度评分（可解释/可复核）", "Scoring logs"],["自动化覆盖", "64%", "口径：可触发训练/复训的工作流覆盖比例", "Integration events"]],
  },
  ops: {
    en: [["ROI", "2.7x", "Saved hours + reduced error cost (exportable model)", "Evidence-ready"],["Ramp time", "-29%", "Days from onboarding to first independent SOP pass", "Workflow checkpoints"],["Quality score", "+24%", "Rubric-based scoring (explainable & reviewable)", "Scoring logs"],["Automation coverage", "72%", "Share of workflows connected with training triggers", "Integration events"]],
    zh: [["ROI", "2.7x", "口径：节省工时 + 错误成本下降（支持导出计算表）", "Evidence-ready"],["上岗时间", "-29%", "口径：从入职到首次独立通过关键 SOP 的天数", "Workflow checkpoints"],["质量分", "+24%", "口径：基于 rubric 维度评分（可解释/可复核）", "Scoring logs"],["自动化覆盖", "72%", "口径：可触发训练/复训的工作流覆盖比例", "Integration events"]],
  },
};

const useCases = {
  en: [
    ["Onboarding SOP", "Faster independence, less rework", "Ramp time↓ / Pass rate↑"],
    ["Customer Support QA", "Standardize handling & escalation", "Quality↑ / Complaints↓"],
    ["Sales Enablement", "Objection handling with consistent compliance", "Quality↑ / Compliance↑"],
    ["Ops Playbooks", "Make SOP execution measurable", "Error↓ / Variance↓"],
    ["QA / Compliance", "Audit-ready trails and exportable reports", "Audit pass↑ / Rework↓"],
    ["Manager Coaching", "Visualize gaps and trigger targeted coaching", "Completion↑ / Score↑"],
  ],
  zh: [
    ["Onboarding SOP（入职上岗）", "更快独立上岗，减少新人返工", "Ramp time↓ / Pass rate↑"],
    ["Customer Support QA（客服质检）", "标准化话术与升级流程，提升一次解决率", "Quality↑ / Complaints↓"],
    ["Sales Enablement（销售赋能）", "异议处理训练，提升转化与合规一致性", "Quality↑ / Compliance↑"],
    ["Ops Playbooks（运营流程）", "把 SOP 执行变成可追踪指标", "Error↓ / Variance↓"],
    ["QA / Compliance（合规与审核）", "审计式证据链与可导出报告", "Audit pass↑ / Rework↓"],
    ["Manager Coaching（主管带教）", "团队薄弱项可视化，精准复训与辅导", "Completion↑ / Score↑"],
  ],
};

const stepContent = {
  en: [
    { title: "Connect workflow", input: "SOPs, tasks, checkpoints", output: "triggers + coverage dashboard", proof: "integration events / checkpoints", visual: "I-04 Step Diagram: DingTalk/WeCom/Slack → triggers" },
    { title: "Train & role-play", input: "scenarios + rubrics", output: "scores, gaps, retraining plan", proof: "scoring logs / reviewer checks", visual: "I-04 Step Diagram: rubric + scoring" },
    { title: "Audit & scale", input: "trends + pass/fail logs", output: "dashboards, audit reports, reusable templates", proof: "exportable reports / audit trails", visual: "I-04 Step Diagram: export + dashboard" },
  ],
  zh: [
    { title: "接入工作流", input: "SOP / 任务流 / 关键检查点", output: "触发训练节点 + 覆盖率看板", proof: "integration events / checkpoints", visual: "I-04 三步流程图：钉钉/企微/Slack → triggers" },
    { title: "训练与角色扮演", input: "场景库 + rubric（维度/权重）", output: "个人得分 + 薄弱项 + 复训计划", proof: "scoring logs / reviewer checks", visual: "I-04 三步流程图：rubric + scoring" },
    { title: "审计与规模化", input: "趋势 + 通过/失败记录", output: "管理看板 + 审计报告 + 模板复制", proof: "exportable reports / audit trails", visual: "I-04 三步流程图：export + dashboard" },
  ],
};

export default function BusinessPage() {
  const { locale, t } = useLocale();
  const [team, setTeam] = useState<TeamKey>("onboarding");
  const [step, setStep] = useState(0);
  const copy = useMemo(() => {
    if (locale === "en") {
      return {
        eyebrow: "Verified training loop for business outcomes",
        title: "Business outcomes you can prove—turn training into productivity",
        subhead: "Use role-play scoring, retraining loops, and workflow-native deployment to cut ramp time, reduce errors, and improve quality & compliance.",
        bullets: [
          "Outcome-driven: faster ramp, fewer errors, higher quality",
          "Audit-ready: scorecards, proof trails, exportable trends",
          "Workflow-native: trigger training and report back via DingTalk/WeCom/Slack",
        ],
        worksWith: "Works with: DingTalk / WeCom / Slack (extensible)",
        kpiTitle: "Key metrics (defined, measurable, exportable)",
        kpiBadge: "Pilot benchmark",
        useCaseTitle: "Start with one role. Scale across teams.",
        howTitle: "Connect → Train & score → Audit & scale",
        proofTitle: "Manager-verifiable scoring and proof trails (not a black box)",
        proofBullets: [
          "Explainable scoring: dimensions, weights, evidence",
          "Spot checks: manager review and calibration",
          "Audit logs: who passed which SOP and when",
          "Exportable reports for reviews and compliance",
        ],
        implementationTitle: "Prove value in 2 weeks. Scale in 30 days.",
        integrationTitle: "Workflow-native integrations + enterprise controls",
        integrationSummary: "Trigger training, send nudges, report back, and aggregate results in manager dashboards.",
        controlsSummary: "RBAC, audit logs, data isolation, export & retention, admin controls (as supported).",
        roiTitle: "How ROI is calculated (exportable)",
        roiFormula: "ROI = saved hours × labor cost + reduced error/rework cost − subscription cost",
        roiExplain: "Break down by team/role/scenario and export the model with linked evidence.",
        faqTitle: "FAQ",
        finalBand: "Prove value in 2 weeks. Scale across teams in 30 days.",
      };
    }
    return {
      eyebrow: "可验证的业务训练闭环",
      title: "可证明的业务结果：把培训变成生产力",
      subhead: "用角色扮演评分、复训闭环与工作流部署，直接缩短上岗时间、降低流程错误、提升服务与合规质量。",
      bullets: [
        "结果导向：上岗更快、错误更少、质量更高",
        "可信可审计：评分卡、证据链、趋势报表可导出",
        "落地到协作：钉钉/企微/Slack 触发训练与回传看板",
      ],
      worksWith: "适配：钉钉 / 企业微信 / Slack（可扩展）",
      kpiTitle: "核心指标（可定义口径，可导出证明）",
      kpiBadge: "试点基准示例",
      useCaseTitle: "从一个岗位开始，快速复制到更多团队",
      howTitle: "三步跑通：接入 → 训练与评估 → 审计与规模化",
      proofTitle: "经理可验证的评分与证据链（不是黑箱）",
      proofBullets: [
        "可解释评分：维度/权重/证据片段",
        "抽检复核：经理可审阅与纠偏",
        "审计日志：谁在何时通过了哪条 SOP",
        "可导出报告：用于验收/内审/合规",
      ],
      implementationTitle: "两周证明价值，三十天复制扩张",
      integrationTitle: "嵌入协作工具与企业级控制",
      integrationSummary: "在钉钉/企微/Slack 中触发训练、发送提醒、回传结果并汇总到管理看板。",
      controlsSummary: "权限与角色（RBAC）、审计日志、数据隔离、导出与留存、管理员控制台（按实际支持能力展示）。",
      roiTitle: "ROI 如何计算（可导出）",
      roiFormula: "ROI =（节省工时 × 人力成本）+（错误/返工成本下降）− 订阅/试点成本",
      roiExplain: "支持按团队、岗位与场景拆分口径，导出计算表与证据链接。",
      faqTitle: "FAQ",
      finalBand: "用两周证明价值，用三十天复制到更多团队。",
    };
  }, [locale]);

  const steps = stepContent[locale];
  const activeStep = steps[step];
  const teamLabels: [TeamKey, string][] = [
    ["onboarding", locale === "en" ? "Onboarding" : "入职"],
    ["support", locale === "en" ? "Support" : "客服"],
    ["sales", locale === "en" ? "Sales" : "销售"],
    ["ops", locale === "en" ? "Ops/QA" : "运营/质检"],
  ];

  const faqs = locale === "en"
    ? [
        "Can we start with one team/BU?",
        "Is scoring explainable and reviewable?",
        "Who defines rubrics and aligns them to SOPs?",
        "How much integration work is required?",
        "Do you support RBAC, audit logs, data isolation?",
        "How do we scale after the pilot?",
        "How do we export reports for reviews and audits?",
        "Do you support private deployments?",
      ]
    : [
        "可以只从一个团队/BU 开始吗？",
        "评分是否可解释、可复核？",
        "rubric（评分标准）由谁定义？如何对齐 SOP？",
        "接入钉钉/企微/Slack 需要多大改造？",
        "是否支持 RBAC / 审计日志 / 数据隔离？",
        "试点结束后如何扩展到更多岗位？",
        "如何导出报告用于验收/内审？",
        "是否支持私有化/专有部署？",
      ];

  return (
    <main className="pb-12">
      <section className="dark-hero py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div className="text-cosmic-text">
            <p className="mb-2 text-cosmic-cyan">{copy.eyebrow}</p>
            <h1 className="mb-3 text-4xl font-bold">{copy.title}</h1>
            <p className="mb-4 text-cosmic-secondary">{copy.subhead}</p>
            <ul className="mb-4 space-y-2 text-sm">{copy.bullets.map((b)=><li key={b}>• {b}</li>)}</ul>
            <div className="mb-3 flex gap-2">
              <LeadModalTrigger source="hero" type="demo" label={t.cta.demo} />
              <LeadModalTrigger source="hero" type="pilot" label={t.cta.pilot} />
            </div>
            <p className="text-xs text-cosmic-secondary">{copy.worksWith}</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-cosmic-text">
            <div className="mb-2 text-xs text-cosmic-secondary">I-01 Hero visual placeholder</div>
            <div className="h-36 animate-pulse rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-cosmic-silver/40 p-2">Ramp time↓</div>
              <div className="rounded border border-cosmic-silver/40 p-2">Errors↓</div>
              <div className="rounded border border-cosmic-silver/40 p-2">Quality↑</div>
              <div className="rounded border border-cosmic-silver/40 p-2">Export report</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">{copy.kpiTitle}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {teamLabels.map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setTeam(key);
                  console.log("toggle_change", { whichTeam: key, sourcePage: "/business" });
                }}
                className={`rounded px-2 py-1 text-xs ${team === key ? "bg-cosmic-navy text-white" : "border border-slate-300 bg-white text-slate-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(kpis[team][locale] as string[][]).map(([label, value, def, tag]) => (
            <div key={label} className="light-card rounded-lg p-4">
              <p className="mb-1 text-sm text-slate-500">{label}</p>
              <div className="mb-2 flex items-center justify-between">
                <p className="kpi-num text-3xl font-bold">{value || "—"}</p>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">{copy.kpiBadge}</span>
              </div>
              <p className="mb-2 text-xs text-slate-600">{def}</p>
              <span className="rounded bg-cyan-100 px-2 py-0.5 text-[10px] text-cyan-700">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.useCaseTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(useCases[locale] as string[][]).map(([title, desc, tags]) => (
            <div key={title} className="light-card rounded-lg p-4">
              <p className="font-semibold">{title}</p>
              <p className="my-2 text-sm text-slate-600">{desc}</p>
              <p className="text-xs text-slate-500">{tags}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.howTitle}</h2>
        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          <div className="space-y-2">
            {steps.map((s, i) => (
              <button
                key={s.title}
                onClick={() => {
                  setStep(i);
                  console.log("step_change", { stepIndex: i, sourcePage: "/business" });
                }}
                className={`w-full rounded-lg border p-3 text-left ${i === step ? "border-cosmic-blue bg-cyan-50" : "border-slate-300 bg-white"}`}
              >
                <p className="text-xs text-slate-500">STEP {i + 1}</p>
                <p className="font-medium">{s.title}</p>
              </button>
            ))}
          </div>
          <div className="light-card rounded-lg p-4">
            <div className="mb-3 rounded border border-slate-200 bg-slate-100 p-3 text-sm text-slate-700">{activeStep.visual}</div>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded border border-slate-200 p-3"><p className="mb-1 text-xs text-slate-500">Input</p><p className="text-sm">{activeStep.input}</p></div>
              <div className="rounded border border-slate-200 p-3"><p className="mb-1 text-xs text-slate-500">Output</p><p className="text-sm">{activeStep.output}</p></div>
              <div className="rounded border border-slate-200 p-3"><p className="mb-1 text-xs text-slate-500">Proof</p><p className="text-sm">{activeStep.proof}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.proofTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4">
            <div className="mb-2 text-xs text-slate-500">I-05 Proof layer placeholder</div>
            <div className="mb-2 h-24 animate-pulse rounded bg-slate-200" />
            <div className="rounded border border-slate-200 p-3 text-sm text-slate-700">Scorecard: Accuracy / Tone / Policy / Resolution · Evidence trail · Manager review</div>
          </div>
          <div className="light-card rounded-lg p-4">
            <ul className="space-y-2 text-slate-700">{copy.proofBullets.map((b) => <li key={b}>• {b}</li>)}</ul>
            <div className="mt-4 flex gap-2">
              <Link href="/security" className="rounded border border-slate-300 px-3 py-2 text-sm">{t.cta.viewSecurity}</Link>
              <Link href="/security" className="rounded border border-slate-300 px-3 py-2 text-sm">Learn scoring</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.implementationTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4">
            <h3 className="mb-2 text-xl font-semibold">2-week pilot</h3>
            <p className="text-sm text-slate-600">{locale === "en" ? "Scope: one role × 3–5 scenarios" : "范围：1 个岗位 × 3–5 个核心场景"}</p>
            <p className="text-sm text-slate-600">{locale === "en" ? "Deliverables: rubrics, dashboard, pilot report" : "交付：rubric + 评分看板 + 试点报告"}</p>
            <p className="mb-3 text-sm text-slate-600">{locale === "en" ? "Success: completion, error reduction, score lift" : "验收：完成率 / 错误率下降 / 得分提升"}</p>
            <LeadModalTrigger source="implementationA" type="pilot" label={t.cta.pilot} />
          </div>
          <div className="light-card rounded-lg p-4">
            <h3 className="mb-2 text-xl font-semibold">30-day rollout</h3>
            <p className="text-sm text-slate-600">{locale === "en" ? "Scope: expand across roles/teams" : "范围：扩展到多岗位/多团队"}</p>
            <p className="text-sm text-slate-600">{locale === "en" ? "Deliverables: templates, steady-state metrics, governance" : "交付：模板复制 + 指标常态化 + 管理机制固化"}</p>
            <p className="mb-3 text-sm text-slate-600">{locale === "en" ? "Success: coverage, stable improvements, automated retraining" : "验收：覆盖率提升 / 指标稳定 / 复训自动化"}</p>
            <LeadModalTrigger source="implementationB" type="demo" label={t.cta.demo} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.integrationTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4">
            <p className="mb-2 font-semibold">Integration</p>
            <p className="mb-3 text-sm text-slate-600">{copy.integrationSummary}</p>
            <div className="rounded border border-slate-200 p-3 text-xs text-slate-600">Trigger → Nudge → Report back</div>
          </div>
          <div className="light-card rounded-lg p-4">
            <p className="mb-2 font-semibold">Controls</p>
            <p className="text-sm text-slate-600">{copy.controlsSummary}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">{["SSO", "RBAC", "Audit logs", "Data isolation", "Export", "Admin controls"].map((i) => <div key={i} className="rounded border border-slate-200 p-2">{i}</div>)}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href="/integrations" className="rounded border border-slate-300 px-3 py-2 text-sm">{locale === "en" ? "View integrations" : "查看集成"}</Link>
          <Link href="/security" className="rounded border border-slate-300 px-3 py-2 text-sm">{locale === "en" ? "View security" : "查看安全"}</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.roiTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="light-card rounded-lg p-4">
            <p className="mb-2 text-sm text-slate-500">Formula</p>
            <p className="mb-3 font-medium">{copy.roiFormula}</p>
            <p className="text-sm text-slate-600">{copy.roiExplain}</p>
          </div>
          <div className="light-card rounded-lg p-4">
            <p className="mb-2 font-semibold">{locale === "en" ? "Example assumptions" : "示例假设"}</p>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>{locale === "en" ? "Employees: 80" : "员工数：80"}</li>
              <li>{locale === "en" ? "Labor cost/hour: ¥120" : "工时成本：¥120/小时"}</li>
              <li>{locale === "en" ? "Error/rework cost: ¥180,000 / quarter" : "错误/返工成本：¥180,000/季度"}</li>
            </ul>
            <div className="mt-3 rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              {locale === "en" ? "Output: saved 520 hours, errors -34%, modeled ROI 3.2x" : "输出：节省 520 工时，错误率 -34%，模型 ROI 3.2x"}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">{copy.faqTitle}</h2>
        <div className="space-y-2">
          {faqs.map((q, i) => (
            <details key={q} className="light-card rounded-lg p-3" open={i === 0}>
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="pt-2 text-sm text-slate-600">{locale === "en" ? "Covered in implementation and security review during demo/pilot kickoff." : "可在演示和试点启动时结合实施与安全评审详细确认。"}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="dark-hero rounded-xl p-6 text-cosmic-text">
          <p className="mb-3 text-xl font-semibold">{copy.finalBand}</p>
          <div className="flex gap-2">
            <LeadModalTrigger source="finalBand" type="demo" label={t.cta.demo} />
            <LeadModalTrigger source="finalBand" type="pilot" label={t.cta.pilot} />
          </div>
        </div>
      </section>
    </main>
  );
}
