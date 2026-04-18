import { PageHeader } from "@/components/layout/PageHeader";
import {
  UploadCloud, FileText, FileSpreadsheet, Image as ImageIcon, X,
  CreditCard, Sparkles, RefreshCw, ArrowRight, Check, ChevronDown, ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const initialFiles = [
  { name: "HDFC_Savings_Jan24.pdf", size: "7.5 MB", icon: FileText, tone: "text-destructive bg-destructive/10" },
  { name: "CC_Statement_Dec.csv", size: "6.2 MB", icon: FileSpreadsheet, tone: "text-accent bg-accent-soft" },
  { name: "Axis_Scan_Page1.jpg", size: "4.1 MB", icon: ImageIcon, tone: "text-foreground bg-muted" },
];

const insightOptions = [
  { label: "Auto-categorize transactions", desc: "ML-powered tagging across 240+ merchant categories", checked: true },
  { label: "Detect recurring payments", desc: "Identify subscriptions, EMIs and standing instructions", checked: true },
  { label: "Generate spending insights", desc: "Anomaly detection and behavioural patterns", checked: true },
  { label: "Previous month comparison", desc: "Side-by-side delta analysis with prior cycle", checked: false },
];

export default function Upload() {
  const [files, setFiles] = useState(initialFiles);

  return (
    <div>
      <PageHeader
        eyebrow="Step 01 — Ingest"
        title="Bring your statements into focus."
        subtitle="Drop bank, card and brokerage statements. Our financial engine extracts, normalises and contextualises every line in seconds."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background hover:opacity-90 transition-opacity">
            Begin Processing <ArrowRight className="h-3.5 w-3.5" />
          </button>
        }
      />

      <div className="px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Dropzone */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="p-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent ring-8 ring-accent-soft/40">
                <UploadCloud className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-[26px] text-foreground">Drop statements here</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground">
                Supports PDF, CSV, XLSX and high-resolution scans · up to 2 GB total
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button className="rounded-lg bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:opacity-90">
                  Browse files
                </button>
                <button className="rounded-lg border border-border bg-card px-5 py-2.5 text-[13px] font-semibold text-foreground hover:bg-muted">
                  Connect bank
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                256-bit encrypted · SOC 2 Type II · never shared
              </div>
            </div>
          </div>

          {/* Account info */}
          <section className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/70">
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                <h3 className="text-[14px] font-semibold text-foreground">Account information</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">Optional · improves accuracy</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">
              <Field label="Primary bank">
                <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] font-medium text-foreground hover:border-foreground/30">
                  HDFC Bank <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </Field>
              <Field label="Masked account">
                <input
                  placeholder="XXXX XXXX 1234"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40"
                />
              </Field>
              <Field label="Statement period">
                <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] font-medium text-foreground hover:border-foreground/30">
                  Jan – Jun 2024 <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </Field>
              <Field label="Currency">
                <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] font-medium text-foreground hover:border-foreground/30">
                  INR — Indian Rupee <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </Field>
            </div>
          </section>

          {/* Insight engine */}
          <section className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/70">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <h3 className="text-[14px] font-semibold text-foreground">Insight engine</h3>
              </div>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-accent">3 of 4 active</span>
            </div>
            <div className="divide-y divide-border/60">
              {insightOptions.map((opt) => (
                <label key={opt.label} className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-muted/40">
                  <span
                    className={
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors " +
                      (opt.checked ? "bg-foreground border-foreground text-background" : "border-border bg-background")
                    }
                  >
                    {opt.checked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-semibold text-foreground">{opt.label}</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Files */}
          <section className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/70">
              <h3 className="text-[14px] font-semibold text-foreground">Queued files</h3>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[10.5px] font-semibold text-muted-foreground">
                {files.length} items · 17.8 MB
              </span>
            </div>
            <div className="px-5 pt-4 space-y-2">
              {files.map((f) => (
                <div key={f.name} className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 hover:border-foreground/20">
                  <div className={"grid h-9 w-9 place-items-center rounded-lg " + f.tone}>
                    <f.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-foreground">{f.name}</div>
                    <div className="text-[11px] text-muted-foreground">{f.size} · Ready</div>
                  </div>
                  <button onClick={() => setFiles(files.filter((x) => x.name !== f.name))} className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-5 pt-4 pb-5">
              <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-foreground" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted">
                  Clear all
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-[12.5px] font-semibold text-background hover:opacity-90">
                  Process <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Sync status */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/5 text-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin-slow" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-foreground">Indexing in progress</div>
                  <div className="text-[11.5px] text-muted-foreground">408 statements discovered</div>
                </div>
              </div>
              <button className="rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/40">
                Stop
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Progress</span>
                <span className="font-display text-[28px] text-foreground leading-none">42<span className="text-muted-foreground text-[16px]">%</span></span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[42%] rounded-full bg-foreground" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { n: "171", l: "Scanned" },
                { n: "0", l: "Errors" },
                { n: "237", l: "Remaining" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-background/50 p-3 text-center">
                  <div className="font-display text-[22px] text-foreground leading-none">{s.n}</div>
                  <div className="mt-1 text-[9.5px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11.5px] leading-relaxed text-muted-foreground border-t border-border/60 pt-4">
              <span className="font-semibold text-foreground">LedgerLens Intelligence</span> · 99.8% extraction accuracy. Identifying hidden fees, tax-deductible flows and category drift.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
