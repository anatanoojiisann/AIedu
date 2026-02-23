import { Locale } from "./i18n";

export type LeadType = "demo" | "pilot";

export type LeadPayload = {
  type: LeadType;
  name: string;
  workEmail: string;
  company: string;
  role: string;
  teamSize: string;
  platform: string;
  useCase: string;
  notes?: string;
  sourcePage: string;
  locale: Locale;
  createdAt: string;
};

export const pushLead = (lead: LeadPayload) => {
  const raw = localStorage.getItem("hexaorigin.leads");
  const existing: LeadPayload[] = raw ? JSON.parse(raw) : [];
  const next = [lead, ...existing].slice(0, 20);
  localStorage.setItem("hexaorigin.leads", JSON.stringify(next));
};
