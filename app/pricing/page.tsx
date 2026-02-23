import { PageCTA } from "@/components/blocks";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Business-first Pricing</h1>
      <section className="grid gap-4 md:grid-cols-3">{["Starter","Pro","Enterprise"].map(p=><div key={p} className="light-card rounded-lg p-4"><h2 className="text-xl font-semibold">{p}</h2><p className="text-slate-600">No fixed public price. Scoped by seats, modules, and security requirements.</p></div>)}</section>
      <section className="light-card rounded-lg p-4">Customization boundary: workflow automations, rubric templates, governance controls, onboarding SLA.</section>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="light-card rounded p-3"><p className="font-semibold">Loading</p><div className="h-4 animate-pulse rounded bg-slate-200"/></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Empty</p><p>—</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Error</p><p className="text-rose-600">Quote service unavailable</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Success</p><p className="text-emerald-600">Quote draft ready</p></div>
      </section>
      <PageCTA type="demo" />
    </main>
  );
}
