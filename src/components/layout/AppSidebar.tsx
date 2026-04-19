import { LayoutDashboard, FileUp, MessagesSquare, LifeBuoy, Settings, LogOut, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import ledgerLensLogo from "@/assets/ledgerlens-logo-horizontal.png";

const navItems = [
  { to: "/", label: "Upload", icon: FileUp, end: true },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chatbot", label: "LedgerLens AI", icon: MessagesSquare },
];

export function AppSidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[260px] z-20 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-5 pt-5 pb-5 border-b border-sidebar-border/70">
        <a href="/" className="flex items-center">
          <img
            src={ledgerLensLogo}
            alt="LedgerLens AI"
            className="h-10 w-auto max-w-full object-contain object-left"
          />
        </a>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
        Workspace
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-all duration-200"
            activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground !font-semibold shadow-[0_1px_2px_hsl(221_83%_53%/0.08)]"
          >
            <item.icon className="h-[17px] w-[17px] opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pro card */}
      <div className="px-3 pb-3 pt-6">
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border bg-gradient-to-br from-sidebar-accent/60 via-sidebar-accent/30 to-transparent p-4">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-sidebar-primary/10 blur-2xl" />
          <div className="relative flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-sidebar-primary">
            <Sparkles className="h-3 w-3" />
            Engine Active
          </div>
          <p className="relative mt-2 text-[12px] leading-relaxed text-muted-foreground">
            408 statements indexed. Inference at <span className="font-semibold text-foreground">99.8%</span> accuracy.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <Settings className="h-4 w-4" strokeWidth={1.75} /> Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors">
          <LifeBuoy className="h-4 w-4" strokeWidth={1.75} /> Support
        </button>
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-sidebar-border bg-sidebar-accent/30 px-2.5 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sidebar-primary to-[hsl(224_76%_42%)] text-sidebar-primary-foreground text-[11px] font-bold shadow-sm">
            JV
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[12.5px] font-semibold text-foreground">Julian Vane</div>
            <div className="truncate text-[10.5px] text-muted-foreground">julian@aec.co</div>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  );
}
