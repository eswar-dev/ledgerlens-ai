import { LayoutGrid, UploadCloud, Bot, LifeBuoy, LogOut, Plus, ScanSearch } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/upload", label: "Upload Documents", icon: UploadCloud },
  { to: "/chatbot", label: "ChatBot", icon: Bot },
];

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-2.5 rounded-xl bg-card px-3 py-2.5 shadow-soft">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
            <ScanSearch className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1 text-[15px] font-bold text-foreground">
              LedgerLens
              <span className="rounded-md bg-brand-blue px-1 py-0.5 text-[9px] font-bold text-brand-blue-foreground">AI</span>
            </div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
              AI-Powered Financial Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
            activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground shadow-soft"
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 transition-opacity">
          <Plus className="h-4 w-4" />
          New Transaction
        </button>
        <div className="pt-2 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60">
            <LifeBuoy className="h-4 w-4" /> Support
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
