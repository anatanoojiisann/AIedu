import { PageCTA } from "@/components/blocks";

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Security & Governance</h1>
      <section className="grid gap-4 md:grid-cols-3">{["Tenant isolation and scoped environments","Role-based access control and approvals","Auditability for training, scoring, retraining"].map(p=><div key={p} className="light-card rounded-lg p-4">{p}</div>)}</section>
      <section className="light-card rounded-lg p-4">Data governance placeholders: retention policy, DLP workflow, redaction review, and incident response process.</section>
      <section className="light-card rounded-lg p-4">Error reduction controls: rubric constraints, answer reference checks, and escalation thresholds.</section>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="light-card rounded p-3"><p className="font-semibold">Loading</p><div className="h-4 animate-pulse rounded bg-slate-200"/></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Empty</p><p>Pending SOC docs upload</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Error</p><p className="text-rose-600">Audit export failed</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Success</p><p className="text-emerald-600">Access policy verified</p></div>
      </section>
      <PageCTA type="pilot" />
    </main>
  );
}
