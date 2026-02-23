import { PageCTA } from "@/components/blocks";

export default function BusinessPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <section>
        <h1 className="mb-3 text-3xl font-bold">Business Outcomes</h1>
        <div className="grid gap-4 md:grid-cols-4">
          {[["ROI", "3.2x"],["Ramp time", "-41%"],["Quality score", "+28%"],["Automation coverage", "67%"]].map(([k,v])=><div key={k} className="light-card rounded-lg p-4"><p className="text-slate-500">{k}</p><p className="kpi-num text-2xl font-bold">{v}</p></div>)}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">{["1) Connect workflow","2) Train and role-play","3) Audit and scale"].map((s)=><div key={s} className="light-card rounded-lg p-4">{s}</div>)}</section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="light-card rounded-lg p-4"><h2 className="font-semibold">Dashboard preview</h2><div className="mt-2 h-24 animate-pulse rounded bg-slate-200"/></div>
        <div className="light-card rounded-lg p-4"><h2 className="font-semibold">Role-play scoring</h2><p className="text-slate-600">Competency heatmap, rubric alignment, pass/fail audit logs.</p></div>
      </section>
      <section className="light-card rounded-lg p-4"><h2 className="font-semibold">FAQ</h2><p className="mt-2 text-slate-600">Q: Can we start with one team? A: Yes, pilot can run in one BU with RBAC.</p></section>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="light-card rounded p-3"><p className="font-semibold">Loading</p><div className="h-4 w-full animate-pulse rounded bg-slate-200"/></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Empty</p><p>—</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Error</p><p className="text-rose-600">ROI data unavailable</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Success</p><p className="text-emerald-600">Rollout completed</p></div>
      </section>
      <PageCTA type="demo" />
    </main>
  );
}
