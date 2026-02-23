"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./locale-context";
import { LeadPayload, LeadType, pushLead } from "@/lib/storage";
import Link from "next/link";

type CtaSource =
  | "nav"
  | "hero"
  | "pilot"
  | "security"
  | "implementationA"
  | "implementationB"
  | "finalBand"
  | "pricingHero"
  | "plan"
  | "pilotOffer"
  | "upgradeBand"
  | "page";

type FormState = {
  name: string;
  workEmail: string;
  company: string;
  role: string;
  teamSize: string;
  platform: string;
  useCase: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  workEmail: "",
  company: "",
  role: "",
  teamSize: "",
  platform: "DingTalk",
  useCase: "",
  notes: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadModalTrigger({
  type,
  label,
  source = "page",
  onOpen,
}: {
  type: LeadType;
  label: string;
  source?: CtaSource;
  onOpen?: () => void;
}) {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const title =
    type === "demo"
      ? t.form.titleDemo
      : type === "pilot"
        ? t.form.titlePilot
        : t.form.titlePricing;

  const submit = async () => {
    if (!form.company || !form.workEmail || !form.role || !form.teamSize || !form.platform || !form.useCase) {
      setError(locale === "en" ? "Please fill required fields." : "请补全必填项");
      return;
    }

    if (!emailRegex.test(form.workEmail)) {
      setError(locale === "en" ? "Please enter a valid work email." : "请输入有效企业邮箱");
      return;
    }

    setLoading(true);
    setError("");
    console.log("lead_submit_start", { type, source, locale, pathname });
    await new Promise((r) => setTimeout(r, 700));

    if (Math.random() < 0.15) {
      setLoading(false);
      setError(t.form.error);
      console.log("lead_submit_error", { type, source, pathname, locale });
      return;
    }

    const payload: LeadPayload = {
      type,
      ...form,
      sourcePage: pathname,
      locale,
      createdAt: new Date().toISOString(),
    };

    pushLead(payload);
    localStorage.setItem("hexaorigin.lastCta", `${source}:${type}:${pathname}`);
    console.log("lead_submit_success", payload);
    setLoading(false);
    setSuccess(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <>
      <button
        onClick={() => {
          onOpen?.();
          setOpen(true);
          console.log("cta_click", { source, cta: type, locale, pathname });
        }}
        className={type === "demo" || type === "pricing" ? "rounded bg-gradient-to-r from-cosmic-blue to-cosmic-cyan px-3 py-2 text-xs font-semibold text-cosmic-navy" : "rounded border border-cosmic-silver/60 bg-transparent px-3 py-2 text-xs font-semibold text-current"}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
          <div className="w-full max-w-xl rounded-xl border border-cosmic-silver/30 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button onClick={() => setOpen(false)} className="text-slate-500">✕</button>
            </div>

            {success ? (
              <div className="space-y-3">
                <p className="rounded bg-emerald-100 p-3 text-emerald-800">{t.form.success}</p>
                {saved && <p className="rounded bg-cyan-100 p-2 text-sm text-cyan-800">{t.form.saved}</p>}
                <div className="flex gap-2">
                  <Link className="rounded border border-slate-300 px-3 py-2 text-sm" href="/pricing">{t.cta.exploreIntegrations}</Link>
                  <Link className="rounded border border-slate-300 px-3 py-2 text-sm" href="/business">{t.cta.viewSecurity}</Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <input className="rounded border p-2" placeholder={locale === "en" ? "Name" : "姓名"} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
                <input className="rounded border p-2" placeholder="Work Email*" value={form.workEmail} onChange={(e)=>setForm({...form,workEmail:e.target.value})} />
                <input className="rounded border p-2" placeholder="Company*" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded border p-2" placeholder="Role*" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} />
                  <input className="rounded border p-2" placeholder="Team size*" value={form.teamSize} onChange={(e)=>setForm({...form,teamSize:e.target.value})} />
                </div>
                <select className="rounded border p-2" value={form.platform} onChange={(e)=>setForm({...form,platform:e.target.value})}>
                  <option value="">Platform*</option>
                  <option>DingTalk</option>
                  <option>WeCom</option>
                  <option>Slack</option>
                </select>
                <input className="rounded border p-2" placeholder="Use case*" value={form.useCase} onChange={(e)=>setForm({...form,useCase:e.target.value})} />
                <textarea className="rounded border p-2" placeholder={locale === "en" ? "Notes" : "备注"} value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
                {error && <p className="rounded bg-rose-100 p-2 text-sm text-rose-700">{error}</p>}
                <button disabled={loading} onClick={submit} className="rounded bg-cosmic-navy px-4 py-2 text-white disabled:opacity-60">{loading ? "Submitting..." : title}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
