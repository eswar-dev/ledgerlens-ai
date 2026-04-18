import { PageHeader } from "@/components/layout/PageHeader";
import {
  Area, AreaChart, CartesianGrid, Cell, Line, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart, Bar,
} from "recharts";
import { Home, Car, Shield, Wifi, Search, ArrowUpRight, ArrowDownRight, Download, Plus, MoreHorizontal } from "lucide-react";

const cashflow = [
  { m: "Jan", income: 220, expenses: 160 },
  { m: "Feb", income: 250, expenses: 175 },
  { m: "Mar", income: 240, expenses: 180 },
  { m: "Apr", income: 270, expenses: 150 },
  { m: "May", income: 240, expenses: 195 },
  { m: "Jun", income: 267, expenses: 197 },
];

const expenseRows = [
  { label: "Shopping", value: 28, amount: "₹55,160" },
  { label: "Food & Dining", value: 22, amount: "₹43,340" },
  { label: "Utilities", value: 15, amount: "₹29,550" },
  { label: "Transport", value: 12, amount: "₹23,640" },
  { label: "Wellness", value: 8, amount: "₹15,760" },
];

const income = [
  { name: "Salary", value: 65, color: "hsl(var(--foreground))" },
  { name: "Freelance", value: 20, color: "hsl(var(--accent))" },
  { name: "Dividends", value: 10, color: "hsl(var(--muted-foreground))" },
  { name: "Other", value: 5, color: "hsl(var(--border))" },
];

const recurring = [
  { icon: Home, label: "Rent & Parking", meta: "Monthly · 3rd", amount: "₹24,500" },
  { icon: Car, label: "Car EMI", meta: "Monthly · 5th", amount: "₹9,800" },
  { icon: Shield, label: "Term Insurance", meta: "Quarterly", amount: "₹2,450" },
  { icon: Wifi, label: "Broadband", meta: "Monthly · 12th", amount: "₹2,218" },
];

const txns = [
  { date: "12 Jun", desc: "Apple Store Premium", merchant: "Apple India", cat: "Shopping", amt: "-₹12,499", bal: "₹2,54,501", type: "DEBIT" },
  { date: "10 Jun", desc: "TCS Ltd · Salary credit", merchant: "Tata Consultancy", cat: "Salary", amt: "+₹1,45,000", bal: "₹2,67,000", type: "CREDIT" },
  { date: "08 Jun", desc: "Whole Foods Market", merchant: "WFM Bandra", cat: "Groceries", amt: "-₹4,200", bal: "₹1,22,000", type: "DEBIT" },
  { date: "05 Jun", desc: "Upwork Global Inc.", merchant: "Upwork", cat: "Freelance", amt: "+₹22,000", bal: "₹1,26,200", type: "CREDIT" },
  { date: "03 Jun", desc: "Indigo Airlines · BOM-DEL", merchant: "Indigo", cat: "Travel", amt: "-₹8,840", bal: "₹1,04,200", type: "DEBIT" },
];

function Kpi({ label, value, delta, positive = true, sub }: { label: string; value: string; delta: string; positive?: boolean; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        <span className={"inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold " + (positive ? "bg-accent-soft text-accent" : "bg-destructive/10 text-destructive")}>
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{delta}
        </span>
      </div>
      <div className="mt-4 font-display text-[34px] leading-none text-foreground">{value}</div>
      <div className="mt-2 text-[11.5px] text-muted-foreground">{sub ?? "vs. previous month"}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        eyebrow="Overview · June 2024"
        title="Good morning, Julian."
        subtitle="A quiet month for income, but discretionary spending climbed 12% — mostly fine dining and travel."
        showTimeframe
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-[12.5px] font-semibold text-foreground hover:bg-muted">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        }
      />

      <div className="px-10 py-10 space-y-8">
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Kpi label="Total Income" value="₹2,67,000" delta="8.2%" />
          <Kpi label="Total Expenses" value="₹1,97,000" delta="3.1%" positive={false} />
          <Kpi label="Net Savings" value="₹70,000" delta="12.4%" />
          <Kpi label="Savings Rate" value="26.2%" delta="1.8 pts" sub="Target: 30%" />
        </section>

        {/* Cash flow + Health */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cash flow */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <div>
                <h3 className="font-display text-[22px] text-foreground leading-tight">Monthly cash flow</h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">Income vs. expenses across the last 6 months.</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground" /> Income
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Expenses
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashflow} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Area type="monotone" dataKey="income" stroke="hsl(var(--foreground))" strokeWidth={2} fill="url(#incomeFill)" />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--accent))" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Score */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-health p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">Health Score</div>
                <div className="mt-1 font-display text-[20px]">Improving</div>
              </div>
              <button className="text-primary-foreground/60 hover:text-primary-foreground"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
            <div className="my-7 grid place-items-center">
              <div className="relative h-44 w-44">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" stroke="hsl(0 0% 100% / 0.08)" strokeWidth="8" fill="none" />
                  <circle
                    cx="60" cy="60" r="52" stroke="hsl(var(--accent))" strokeWidth="8" fill="none"
                    strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="font-display text-[56px] leading-none">72</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/55">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-3.5">
              <p className="text-[12px] leading-relaxed text-primary-foreground/80">
                <span className="text-accent font-semibold">+4 pts</span> since last month — credit utilisation down to 22% and emergency fund coverage up to 4.2 months.
              </p>
            </div>
          </div>
        </section>

        {/* Breakdown row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Expense breakdown */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[20px] text-foreground">Expense breakdown</h3>
              <span className="text-[11px] text-muted-foreground">June</span>
            </div>
            <div className="mt-5 space-y-4">
              {expenseRows.map((r, i) => (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="font-medium text-foreground">{r.label}</span>
                    <span className="text-muted-foreground">{r.amount} <span className="text-foreground font-semibold ml-1">{r.value}%</span></span>
                  </div>
                  <div className="mt-1.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.value * 2}%`, background: i === 0 ? "hsl(var(--foreground))" : i === 1 ? "hsl(var(--accent))" : "hsl(var(--muted-foreground) / 0.6)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Income */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[20px] text-foreground">Income mix</h3>
              <span className="text-[11px] text-muted-foreground">6 channels</span>
            </div>
            <div className="relative mt-2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={income} dataKey="value" innerRadius={52} outerRadius={72} paddingAngle={3} stroke="none">
                    {income.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="font-display text-[28px] text-foreground leading-none">₹2.67L</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">June</div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {income.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-semibold text-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-[20px] text-foreground">Recurring</h3>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">12 active subscriptions</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Monthly</div>
                <div className="font-display text-[20px] text-destructive leading-tight">−₹38,968</div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {recurring.map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-foreground">
                      <r.icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[13px] font-semibold text-foreground">{r.label}</div>
                      <div className="text-[11px] text-muted-foreground">{r.meta}</div>
                    </div>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">{r.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transactions */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-border/70">
            <div>
              <h3 className="font-display text-[22px] text-foreground leading-tight">Recent transactions</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">Across HDFC Savings · 1,284 entries this period</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  placeholder="Search transactions"
                  className="rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[12.5px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 w-56"
                />
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[12px] font-semibold text-background hover:opacity-90">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-muted/40">
                <tr className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Description</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-right font-semibold">Amount</th>
                  <th className="px-6 py-3 text-right font-semibold">Balance</th>
                  <th className="px-6 py-3 text-left font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr key={t.desc} className="border-t border-border/60 hover:bg-muted/30">
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{t.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{t.desc}</div>
                      <div className="text-[11.5px] text-muted-foreground">{t.merchant}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">{t.cat}</span>
                    </td>
                    <td className={"px-6 py-4 text-right font-semibold tabular-nums " + (t.amt.startsWith("+") ? "text-accent" : "text-destructive")}>{t.amt}</td>
                    <td className="px-6 py-4 text-right text-foreground tabular-nums">{t.bal}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider " +
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
        </section>
      </div>
    </div>
  );
}
