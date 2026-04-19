import { Bell } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showTimeframe?: boolean;
  actions?: React.ReactNode;
}

const tabs = ["Day", "Week", "Month", "Quarter"];

export function PageHeader({ title, subtitle, eyebrow, showTimeframe = false, actions }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-card/85 backdrop-blur-xl sticky top-0 z-10">
      {/* Top utility bar */}
      <div className="flex items-center justify-between px-10 py-2.5 border-b border-border/60">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span className="font-semibold text-foreground/90">Workspace</span>
          <span className="text-muted-foreground/40">›</span>
          <span className="text-muted-foreground">{eyebrow ?? title}</span>
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Bell className="h-4 w-4" strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-card" />
          </button>
        </div>
      </div>

      {/* Title bar */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-10 py-7">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="mb-2 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-[40px] leading-[1.05] tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-[14px] text-muted-foreground max-w-xl leading-relaxed">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showTimeframe && (
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5 shadow-[0_1px_2px_hsl(222_33%_13%/0.04)]">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  className={
                    "rounded-[7px] px-3.5 py-1.5 text-[12.5px] font-medium transition-all " +
                    (i === 2
                      ? "bg-gradient-to-b from-primary to-[hsl(224_76%_46%)] text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          {actions}
        </div>
      </div>
    </header>
  );
}
