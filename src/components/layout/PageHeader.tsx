import { Bell, HelpCircle, UserCircle2 } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showTimeframe?: boolean;
}

const tabs = ["Day", "Week", "Month", "Quarter"];

export function PageHeader({ title, subtitle, showTimeframe = true }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-8 pt-8 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {showTimeframe && (
          <div className="flex items-center rounded-full bg-card p-1 shadow-soft border border-border">
            {tabs.map((t, i) => (
              <button
                key={t}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
                  (i === 0
                    ? "bg-brand-blue text-brand-blue-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {t}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <Bell className="h-[18px] w-[18px]" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <HelpCircle className="h-[18px] w-[18px]" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-foreground">
            <UserCircle2 className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
