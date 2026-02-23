import { ProductPreviewTabs, StateGrid, TrustBar, PageCTA } from "@/components/blocks";

const loop = ["Learn", "Practice", "Assess", "Retrain", "Prove", "Scale"];

export default function HomePage() {
  return (
    <main>
      <section className="dark-hero relative overflow-hidden py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div className="text-cosmic-text">
            <p className="mb-3 text-cosmic-cyan">Verified training loop + workflow-native integrations</p>
            <h1 className="mb-4 text-4xl font-bold">HexaOrigin AI Skill OS for Cosmic Enterprise teams</h1>
            <p className="mb-6 text-cosmic-secondary">Train faster, prove performance, and deploy into DingTalk / WeCom / Slack with enterprise-grade controls.</p>
            <div className="flex gap-2"><PageCTA type="demo" /><PageCTA type="pilot" /></div>
          </div>
          <ProductPreviewTabs />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <TrustBar />
        <div className="grid gap-4 md:grid-cols-3">{['24h rollout','92% role-play completion','-34% onboarding errors'].map(k=><div key={k} className="light-card rounded-lg p-4"><p className="kpi-num text-2xl font-bold">{k.split(' ')[0]}</p><p className="text-slate-600">{k.slice(k.indexOf(' ')+1)}</p></div>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Hexa Loop</h2>
        <div className="grid gap-3 md:grid-cols-6">{loop.map((s, idx)=><div key={s} className="light-card rounded-lg p-3 text-center"><p className="text-xs text-slate-500">0{idx+1}</p><p className="font-medium">{s}</p></div>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Required states preview</h2>
        <StateGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-4">
        <div className="light-card rounded-xl p-6">
          <h3 className="text-xl font-semibold">Pilot Offer</h3>
          <p className="mb-3 text-slate-600">2-week workflow pilot with verified role-play scoring and manager dashboard.</p>
          <PageCTA type="pilot" />
        </div>
      </section>
    </main>
  );
}
