import { PageCTA } from "@/components/blocks";

export default function IntegrationsPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Workflow-native Integrations</h1>
      <section className="grid gap-3 md:grid-cols-3">{["DingTalk","WeCom","Slack"].map(p=><div key={p} className="light-card rounded-lg p-4">{p}</div>)}</section>
      <section className="grid gap-3 md:grid-cols-3">{["Phase 1: Notifications + links","Phase 2: Role sync + approvals","Phase 3: Full workflow triggers"].map(p=><div key={p} className="light-card rounded-lg p-4"><p>{p}</p><div className="mt-2 h-2 animate-pulse rounded bg-slate-200"/></div>)}</section>
      <section className="light-card rounded-lg p-4"><h2 className="font-semibold">Permissions & Security</h2><p className="text-slate-600">Least-privilege scopes, audit logs, tenant isolation placeholders, and setup checklist.</p></section>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="light-card rounded p-3"><p className="font-semibold">Loading</p><div className="h-4 animate-pulse rounded bg-slate-200"/></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Empty</p><p>Your logo here</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Error</p><p className="text-rose-600">Connector timeout</p></div>
        <div className="light-card rounded p-3"><p className="font-semibold">Success</p><p className="text-emerald-600">Connected</p></div>
      </section>
      <PageCTA type="pilot" />
    </main>
  );
}
