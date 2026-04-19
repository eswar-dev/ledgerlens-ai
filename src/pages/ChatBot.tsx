import { PageHeader } from "@/components/layout/PageHeader";
import {
  Bot, BarChart3, PiggyBank, ArrowRight, Paperclip, Mic, Send, Sparkles, FileText, TrendingUp,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Cell, XAxis } from "recharts";
import { useState } from "react";

const spending = [
  { d: "Mon", v: 220 },
  { d: "Tue", v: 480 },
  { d: "Wed", v: 1120 },
  { d: "Thu", v: 540 },
  { d: "Fri", v: 380 },
  { d: "Sat", v: 720 },
  { d: "Sun", v: 290 },
];

const prompts = [
  "Where did my fine-dining spend spike this month?",
  "Forecast my June cash position.",
  "Identify tax-deductible business expenses.",
];

export default function ChatBot() {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        eyebrow="Conversation"
        title="Ask LedgerLens anything."
        subtitle="A private analyst that has read every line of your statements."
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-10 space-y-8">
          <div className="flex justify-center">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Monday · Oct 23
            </span>
          </div>

          {/* Bot greeting */}
          <BotRow>
            <div className="rounded-2xl rounded-tl-md border border-border bg-card px-5 py-4">
              <p className="text-[14px] text-foreground leading-relaxed">
                Morning, Julian. I've finished reading your June statements. Discretionary spend is up <span className="font-semibold text-foreground">12%</span> — mostly across three weekend transactions. Want to dig in, or set up a savings safeguard?
              </p>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SuggestionCard
                icon={BarChart3}
                tone="text-foreground bg-muted"
                title="Analyse spending"
                desc="Review the ₹1,240 spike in luxury & dining."
              />
              <SuggestionCard
                icon={PiggyBank}
                tone="text-accent bg-accent-soft"
                title="Set savings goal"
                desc="Auto-route 15% of inflow to a real-estate fund."
              />
            </div>
          </BotRow>

          {/* User */}
          <UserRow>
            Show me the discretionary spending breakdown for last week. A few weekend transactions look higher than usual.
          </UserRow>

          {/* Bot with chart */}
          <BotRow>
            <div className="rounded-2xl rounded-tl-md border border-border bg-card overflow-hidden">
              <div className="px-5 pt-4 pb-2">
                <p className="text-[14px] text-foreground leading-relaxed">
                  Categorised below. Your <span className="font-semibold">"Fine Dining"</span> bucket saw a <span className="font-semibold text-accent">+42% spike</span> on Wednesday — three transactions over ₹400 each.
                </p>
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Peak day · Wed</span>
                    <span className="font-display text-[22px] text-accent leading-none">₹1,120</span>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spending} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={10} stroke="hsl(var(--muted-foreground))" />
                        <Bar dataKey="v" radius={[4, 4, 0, 0]} barSize={22}>
                          {spending.map((s, i) => (
                            <Cell key={i} fill={i === 2 ? "hsl(var(--accent))" : "hsl(var(--foreground) / 0.12)"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[12px] text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-accent" />
                  Anomaly confidence: <span className="font-semibold text-foreground">94%</span>
                </div>
              </div>
              <div className="border-t border-border/70 px-5 py-3 flex items-center gap-4 text-[11.5px] text-muted-foreground">
                <button className="inline-flex items-center gap-1.5 hover:text-foreground"><FileText className="h-3.5 w-3.5" /> Open report</button>
                <button className="inline-flex items-center gap-1.5 hover:text-foreground"><Sparkles className="h-3.5 w-3.5" /> Suggest budget</button>
              </div>
            </div>
          </BotRow>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-background/80 backdrop-blur px-8 py-5">
        <div className="mx-auto max-w-3xl">
          {/* Prompt suggestions */}
          <div className="mb-3 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button key={p} className="rounded-full border border-border bg-card px-3 py-1.5 text-[11.5px] text-muted-foreground hover:text-foreground hover:border-foreground/30">
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-soft focus-within:border-foreground/30 transition-colors">
            <button className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about portfolio, taxes, anomalies, forecasts…"
              className="flex-1 bg-transparent px-1 py-2 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
              <Mic className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-primary to-[hsl(224_76%_46%)] px-3.5 py-2 text-[12.5px] font-semibold text-primary-foreground shadow-[0_1px_2px_hsl(221_83%_30%/0.25),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:shadow-[0_4px_14px_-2px_hsl(221_83%_53%/0.45)] hover:-translate-y-px transition-all">
              Send <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            LedgerLens analyses connected accounts only. Always verify large transactions.
          </p>
        </div>
      </div>
    </div>
  );
}

function BotRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[hsl(224_76%_42%)] text-primary-foreground shadow-sm">
        <Bot className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function UserRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-end gap-3 animate-fade-in">
      <div className="max-w-xl rounded-2xl rounded-tr-md bg-gradient-to-b from-primary to-[hsl(224_76%_46%)] px-5 py-3.5 text-[14px] text-primary-foreground leading-relaxed shadow-[0_1px_2px_hsl(221_83%_30%/0.2)]">
        {children}
      </div>
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-primary text-[11px] font-bold">
        JV
      </div>
    </div>
  );
}

function SuggestionCard({ icon: Icon, tone, title, desc }: { icon: any; tone: string; title: string; desc: string }) {
  return (
    <button className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left hover:border-foreground/30 transition-colors">
      <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-lg " + tone}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-[11.5px] text-muted-foreground leading-relaxed">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
