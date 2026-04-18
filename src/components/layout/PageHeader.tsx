import { Bell, Search, Command } from "lucide-react";

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
    <header className="border-b border-border/70 bg-background/80 backdrop-blur sticky top-0 z-10">
      {/* Top utility bar */}
      <div className="flex items-center justify-between px-10 py-3 border-b border-border/50">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">Workspace</span>
          <span className="opacity-40">/</span>
          <span>{eyebrow ?? title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-[12.5px] text-muted-foreground w-72">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1">Search transactions, files, insights…</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
          <button className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Title bar */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-10 py-7">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
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
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  className={
                    "rounded-[7px] px-3.5 py-1.5 text-[12.5px] font-medium transition-colors " +
                    (i === 2
                      ? "bg-foreground text-background"
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
