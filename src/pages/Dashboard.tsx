import { PageHeader } from "@/components/layout/PageHeader";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { Home, Car, Shield, Wifi, Search, SlidersHorizontal, Sparkles } from "lucide-react";

const cashflow = [
  { m: "JAN", income: 220, expenses: 160 },
  { m: "FEB", income: 250, expenses: 175 },
  { m: "MAR", income: 240, expenses: 180 },
  { m: "APR", income: 270, expenses: 150 },
  { m: "MAY", income: 240, expenses: 195 },
  { m: "JUN", income: 260, expenses: 185 },
];

const expenseRows = [
  { label: "Shopping", value: 28, color: "hsl(222 47% 14%)" },
  { label: "Food & Dining", value: 22, color: "hsl(var(--accent))" },
  { label: "Utilities", value: 15, color: "hsl(var(--brand-blue))" },
  { label: "Transport", value: 12, color: "hsl(0 70% 55%)" },
];

const income = [
  { name: "Salary", value: 65, color: "hsl(222 47% 14%)" },
  { name: "Freelance", value: 20, color: "hsl(var(--accent))" },
  { name: "Other", value: 15, color: "hsl(220 20% 88%)" },
];

const recurring = [
  { icon: Home, label: "Rent & Parking", amount: "₹24,500" },
  { icon: Car, label: "Car EMI", amount: "₹9,800" },
  { icon: Shield, label: "Term Insurance", amount: "₹2,450" },
  { icon: Wifi, label: "Broadband", amount: "₹2,218" },
];

const txns = [
  { date: "12 Jun 2024", desc: "Apple Store Premium", cat: "Shopping", amt: "-₹12,499", bal: "₹2,54,501", type: "DEBIT" },
  { date: "10 Jun 2024", desc: "TCS Ltd Salary", cat: "Salary", amt: "+₹1,45,000", bal: "₹2,67,000", type: "CREDIT" },
  { date: "08 Jun 2024", desc: "Whole Foods Market", cat: "Groceries", amt: "-₹4,200", bal: "₹1,22,000", type: "DEBIT" },
  { date: "05 Jun 2024", desc: "Upwork Global", cat: "Freelance", amt: "+₹22,000", bal: "₹1,26,200", type: "CREDIT" },
];

function KpiCard({ label, value, delta, positive = true }: { label: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span
          className={
            "rounded-full px-2 py-0.5 text-[11px] font-semibold " +
            (positive ? "bg-accent-soft text-accent" : "bg-destructive/10 text-destructive")
          }
        >
          {delta}
        </span>
      </div>
      <div className="mt-3 text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Welcome back, Julian Vane" subtitle="AEC • Director of Operations" />

      <div className="px-8 pb-12 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <KpiCard label="Total Income" value="₹2,67,000" delta="+8.2%" />
          <KpiCard label="Total Expenses" value="₹1,97,000" delta="+3.1%" positive={false} />
          <KpiCard label="Net Savings" value="₹70,000" delta="+12.4%" />
          <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Savings Rate</span>
              <span className="text-[11px] font-medium text-muted-foreground">Goal: 30%</span>
            </div>
            <div className="mt-3 text-2xl font-bold text-foreground">26%</div>
            <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: "86%" }} />
            </div>
          </div>
        </div>

        {/* Cash flow + Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Monthly Cash Flow</h3>
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" /> INCOME (BAR)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" /> EXPENSES (LINE)
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashflow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "var(--shadow-card)",
                    }}
                  />
                  <Bar dataKey="income" fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} barSize={32} />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--accent))" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-health p-6 text-primary-foreground shadow-card relative overflow-hidden">
            <h3 className="text-base font-semibold">Financial Health Score</h3>
            <p className="text-xs text-primary-foreground/70 italic">Improving — Good</p>
            <div className="my-6 grid place-items-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" stroke="hsl(0 0% 100% / 0.12)" strokeWidth="10" fill="none" />
                  <circle
                    cx="60" cy="60" r="52" stroke="hsl(var(--accent))" strokeWidth="10" fill="none"
                    strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="text-4xl font-bold">72</div>
                    <div className="text-[10px] uppercase tracking-wider text-primary-foreground/60">out of 100</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-primary-foreground/80 leading-relaxed">
              Your score has increased by <span className="text-accent font-semibold">4 points</span> since last month due to reduced credit utilization.
            </p>
            <Sparkles className="absolute right-4 bottom-4 h-16 w-16 text-primary-foreground/5" />
          </div>
        </div>

        {/* Breakdown row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <h3 className="text-base font-semibold text-foreground">Expense Breakdown</h3>
            <div className="mt-5 space-y-4">
              {expenseRows.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{r.label}</span>
                    <span className="text-muted-foreground">{r.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.value * 2}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-lg border border-border py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
              View Detailed Categorization
            </button>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <h3 className="text-base font-semibold text-foreground">Income Sources</h3>
            <div className="relative mt-2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={income} dataKey="value" innerRadius={48} outerRadius={68} paddingAngle={2} stroke="none">
                    {income.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">6</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Channels</div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" />Salary</div>
                <div className="mt-0.5 font-bold text-foreground">65%</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-accent" />Freelance</div>
                <div className="mt-0.5 font-bold text-foreground">20%</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-foreground">Recurring</h3>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Monthly Total</div>
                <div className="text-base font-bold text-destructive">-₹38,968</div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {recurring.map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-foreground">
                      <r.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{r.amount}</span>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full rounded-lg border border-border py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
              Manage Subscriptions
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search..."
                  className="rounded-lg bg-muted/60 pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
              </button>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 text-left font-semibold">Date</th>
                  <th className="py-3 text-left font-semibold">Description</th>
                  <th className="py-3 text-left font-semibold">Category</th>
                  <th className="py-3 text-left font-semibold">Amount</th>
                  <th className="py-3 text-left font-semibold">Balance</th>
                  <th className="py-3 text-left font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr key={t.desc} className="border-t border-border/60">
                    <td className="py-4 text-muted-foreground">{t.date}</td>
                    <td className="py-4 font-medium text-foreground">{t.desc}</td>
                    <td className="py-4 text-muted-foreground">{t.cat}</td>
                    <td className={"py-4 font-semibold " + (t.amt.startsWith("+") ? "text-accent" : "text-destructive")}>{t.amt}</td>
                    <td className="py-4 text-foreground">{t.bal}</td>
                    <td className="py-4">
                      <span
                        className={
                          "rounded-md px-2 py-1 text-[10px] font-bold tracking-wider " +
                          (t.type === "CREDIT" ? "bg-accent-soft text-accent" : "bg-muted text-muted-foreground")
                        }
                      >
                        {t.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
