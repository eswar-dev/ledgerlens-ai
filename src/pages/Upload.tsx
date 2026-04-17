import { PageHeader } from "@/components/layout/PageHeader";
import { UploadCloud, FileText, FileSpreadsheet, Image as ImageIcon, X, CreditCard, BarChart3, RefreshCw, Rocket, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

const initialFiles = [
  { name: "HDFC_Savings_Jan24.pdf", size: "7.5 MB", icon: FileText, tone: "text-destructive bg-destructive/10" },
  { name: "CC_Statement_Dec.csv", size: "6.2 MB", icon: FileSpreadsheet, tone: "text-accent bg-accent-soft" },
  { name: "Axis_Scan_Page1.jpg", size: "4.1 MB", icon: ImageIcon, tone: "text-muted-foreground bg-muted" },
];

const insightOptions = [
  { label: "Auto-categorize transactions", checked: true },
  { label: "Detect Recurring payments", checked: true },
  { label: "Generate Spending Insights", checked: true },
  { label: "Prev Month Comparison", checked: false },
];

export default function Upload() {
  const [files, setFiles] = useState(initialFiles);

  return (
    <div>
      <PageHeader title="Upload Bank Statements" subtitle="Upload your bank statements and let us generate powerful insights with our advanced financial engine." showTimeframe={false} />

      <div className="px-8 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* Dropzone */}
          <div className="rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
              <UploadCloud className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">Drag and drop your statements</h3>
            <p className="mt-1 text-sm text-muted-foreground">PDF, CSV, or high-res images supported (Up to 2GB total)</p>
            <button className="mt-5 rounded-lg bg-muted px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors">
              Browse Files
            </button>
          </div>

          {/* Account info */}
          <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="h-4 w-4 text-foreground" />
              <h3 className="text-base font-semibold text-foreground">Account Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Primary Bank</label>
                <button className="mt-1.5 flex w-full items-center justify-between rounded-lg bg-muted/60 px-3.5 py-2.5 text-sm font-medium text-foreground">
                  HDFC Bank <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Masked Account Number</label>
                <input
                  placeholder="XXXX XXXX 1234"
                  className="mt-1.5 w-full rounded-lg bg-muted/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Insight engine */}
          <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-4 w-4 text-foreground" />
              <h3 className="text-base font-semibold text-foreground">Insight Engine Configuration</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {insightOptions.map((opt) => (
                <label key={opt.label} className="flex items-start gap-3 cursor-pointer">
                  <span
                    className={
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border " +
                      (opt.checked ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card")
                    }
                  >
                    {opt.checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span className="text-sm text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Uploaded files */}
          <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Uploaded Files</h3>
              <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-blue">
                {files.length} FILES
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {files.map((f) => (
                <div key={f.name} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                  <div className={"grid h-10 w-10 place-items-center rounded-lg " + f.tone}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.size} • Uploaded</div>
                  </div>
                  <button onClick={() => setFiles(files.filter((x) => x.name !== f.name))} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-muted/40 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Total Size</span>
                <span className="font-bold text-foreground">17.8 MB</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-accent" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button className="flex-1 rounded-lg bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground">Cancel</button>
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
                Process <Rocket className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Syncing */}
          <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-foreground">Syncing statement</div>
                  <div className="text-xs text-muted-foreground">408 statements found</div>
                </div>
              </div>
              <button className="rounded-md bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">Stop</button>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing...</span>
                <span className="font-semibold text-foreground">0%</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[2%] rounded-full bg-accent" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { n: "1", l: "Scanned", tone: "bg-muted text-foreground" },
                { n: "0", l: "Total Found", tone: "bg-brand-blue/10 text-brand-blue" },
                { n: "407", l: "Remaining", tone: "bg-warning/10 text-warning" },
              ].map((s) => (
                <div key={s.l} className={"rounded-lg p-2.5 text-center " + s.tone}>
                  <div className="text-lg font-bold">{s.n}</div>
                  <div className="text-[9px] uppercase tracking-wider opacity-80">{s.l}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
              Atelier Intelligence: 99.8% accuracy mapping cashflow, identifying hidden fees and tax-deductible opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
