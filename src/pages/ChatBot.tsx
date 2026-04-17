import { PageHeader } from "@/components/layout/PageHeader";
import { Bot, BarChart3, PiggyBank, ArrowRight, Paperclip, Mic, Send, UserCircle2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";

const spending = [
  { d: "Mon", v: 220 },
  { d: "Tue", v: 480 },
  { d: "Wed", v: 1120 },
  { d: "Thu", v: 540 },
];

export default function ChatBot() {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen flex-col">
      <PageHeader title="Welcome back, Julian Vane" subtitle="AEC • Director of Operations" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 pb-4">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex justify-center">
            <span className="rounded-full bg-muted px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Monday, Oct 23
            </span>
          </div>

          {/* Bot message */}
          <BotRow>
            <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
              <p className="text-sm text-foreground leading-relaxed">
                Hello Julian, I've analyzed your latest statement. Would you like a breakdown of your discretionary spending or help setting up a new savings goal?
              </p>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SuggestionCard
                icon={BarChart3}
                tone="text-accent bg-accent-soft"
                title="Analyze Spending"
                desc="Review the ₹1,240 increase in luxury goods this month."
              />
              <SuggestionCard
                icon={PiggyBank}
                tone="text-warning bg-warning/10"
                title="Set Savings Goal"
                desc="Optimize your portfolio for a new real estate target."
              />
            </div>
          </BotRow>

          {/* User message */}
          <div className="flex items-start justify-end gap-3">
            <div className="max-w-2xl rounded-2xl bg-primary px-5 py-4 text-sm text-primary-foreground shadow-card">
              Let's look at the discretionary spending breakdown first. I noticed a few large transactions from last weekend that seem higher than usual.
            </div>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground">
              <UserCircle2 className="h-6 w-6" />
            </div>
          </div>

          {/* Bot with chart */}
          <BotRow>
            <div className="rounded-2xl bg-card p-5 shadow-card border border-border/50">
              <p className="text-sm text-foreground leading-relaxed">
                Certainly. I've categorized your discretionary spending for the past 7 days. Your <span className="font-semibold">"Fine Dining"</span> category saw a <span className="font-semibold text-accent">42% spike</span> due to three specific transactions.
              </p>
              <div className="mt-5 rounded-xl bg-muted/40 p-4">
                <div className="text-center text-xs font-semibold text-accent mb-1">₹1,120</div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spending}>
                      <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                        {spending.map((s, i) => (
                          <Cell key={i} fill={i === 2 ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.35)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </BotRow>
        </div>
      </div>

      {/* Composer */}
      <div className="px-8 pb-6 pt-2 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 rounded-2xl bg-card p-2 shadow-card border border-border/60">
            <button className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Atelier about your portfolio, taxes, or spending..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
              <Mic className="h-4 w-4" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground hover:opacity-95">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Atelier AI provides analysis based on your connected accounts. Verify all transactions for absolute accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}

function BotRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function SuggestionCard({ icon: Icon, tone, title, desc }: { icon: any; tone: string; title: string; desc: string }) {
  return (
    <button className="group flex items-start gap-3 rounded-2xl bg-card p-4 text-left shadow-card border border-border/50 hover:border-foreground/20 transition-colors">
      <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-lg " + tone}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
