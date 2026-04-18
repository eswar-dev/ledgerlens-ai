import { LayoutGrid, UploadCloud, Bot, LifeBuoy, Settings, LogOut, ChevronsUpDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", label: "Upload", icon: UploadCloud, end: true, hint: "Ingest" },
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, hint: "Overview" },
  { to: "/chatbot", label: "Assistant", icon: Bot, hint: "AI" },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sidebar-primary to-[hsl(152_70%_38%)] text-sidebar-primary-foreground shadow-[0_8px_24px_-8px_hsl(152_60%_50%/0.5)]">
        <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6v18a2 2 0 0 0 2 2h18" />
          <path d="M11 21l4-6 4 3 6-9" />
          <circle cx="25" cy="9" r="2" fill="currentColor" stroke="none" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[hsl(152_85%_60%)] ring-2 ring-sidebar-background" />
      </div>
      <div className="leading-tight">
        <div className="font-display text-[22px] text-sidebar-accent-foreground tracking-tight">
          LedgerLens<span className="text-sidebar-primary">.</span>
        </div>
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-sidebar-foreground/55">
          Financial Intelligence
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-[256px] shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-5 pt-7 pb-8">
        <Logo />
      </div>

      {/* Workspace switcher */}
      <div className="mx-3 mb-6 flex items-center gap-2.5 rounded-lg border border-sidebar-border/70 bg-sidebar-accent/40 px-2.5 py-2">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-sidebar-primary/15 text-sidebar-primary text-[11px] font-bold">
          AE
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[12px] font-semibold text-sidebar-accent-foreground">Aether Capital</div>
          <div className="truncate text-[10px] text-sidebar-foreground/55">Pro workspace</div>
        </div>
        <ChevronsUpDown className="h-3.5 w-3.5 text-sidebar-foreground/45" />
      </div>

      {/* Section label */}
      <div className="px-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sidebar-foreground/40">
        Workspace
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-[3px] before:rounded-r-full before:bg-sidebar-primary"
          >
            <item.icon className="h-[17px] w-[17px] opacity-80 group-hover:opacity-100" strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
            <span className="text-[9.5px] uppercase tracking-wider text-sidebar-foreground/35 group-hover:text-sidebar-foreground/55">
              {item.hint}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Pro card */}
      <div className="px-4 pb-4 pt-6">
        <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-sidebar-accent/60 to-sidebar-accent/20 p-4">
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-sidebar-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sidebar-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
            </span>
            Engine Active
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-sidebar-foreground/70">
            408 statements indexed. Inference running at 99.8% accuracy.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border/60 p-3 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <Settings className="h-4 w-4" strokeWidth={1.75} /> Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <LifeBuoy className="h-4 w-4" strokeWidth={1.75} /> Support
        </button>
        <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-sidebar-border/60 bg-sidebar-accent/30 px-2.5 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sidebar-primary to-[hsl(152_70%_38%)] text-sidebar-primary-foreground text-[11px] font-bold">
            JV
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[12.5px] font-semibold text-sidebar-accent-foreground">Julian Vane</div>
            <div className="truncate text-[10.5px] text-sidebar-foreground/55">julian@aec.co</div>
          </div>
          <button className="text-sidebar-foreground/50 hover:text-sidebar-accent-foreground">
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  );
}
