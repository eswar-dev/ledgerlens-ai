import { LayoutGrid, UploadCloud, Bot, LifeBuoy, Settings, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", label: "Upload", icon: UploadCloud, end: true },
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/chatbot", label: "Assistant", icon: Bot },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-soft">
        <svg viewBox="0 0 28 28" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 22V6" />
          <path d="M5 22h16" />
          <path d="M9 18l4-5 3 3 5-7" />
          <circle cx="21" cy="9" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-[22px] text-sidebar-primary">
          LedgerLens<span className="text-accent">.</span>
        </div>
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/55">
          Financial Intelligence
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-[248px] shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="px-5 pt-7 pb-10">
        <Logo />
      </div>

      {/* Section label */}
      <div className="px-6 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/40">
        Workspace
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground"
          >
            <item.icon className="h-[17px] w-[17px] opacity-80 group-hover:opacity-100" strokeWidth={1.75} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pro card */}
      <div className="px-4 pb-4">
        <div className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary animate-pulse" />
            Engine Active
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-sidebar-foreground/70">
            408 statements indexed. Inference running at 99.8% accuracy.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border/50 p-3 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <Settings className="h-4 w-4" strokeWidth={1.75} /> Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <LifeBuoy className="h-4 w-4" strokeWidth={1.75} /> Support
        </button>
        <div className="mt-2 flex items-center gap-2.5 rounded-lg px-2.5 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-[11px] font-bold">
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
