import { useState, FormEvent } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Sparkles, ShieldCheck, BarChart3, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import logo from "@/assets/ledgerlens-logo-horizontal.png";

const credentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

const signupSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
});

export default function Login() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!authLoading && user) return <Navigate to={from} replace />;

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message || "Google sign-in failed");
      setGoogleLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse({ email, password, fullName });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: parsed.data.fullName },
          },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Check your email to confirm your account");
        setMode("signin");
      } else {
        const parsed = credentialsSchema.safeParse({ email, password });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Welcome back");
        navigate(from, { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-[1.05fr_1fr] bg-background">
      {/* Left — form */}
      <div className="flex flex-col px-6 sm:px-10 lg:px-16 py-8">
        <header className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logo} alt="LedgerLens AI" className="h-9 w-auto" />
          </a>
          <div className="text-[12.5px] text-muted-foreground">
            {mode === "signin" ? (
              <>New here?{" "}
                <button onClick={() => setMode("signup")} className="font-semibold text-primary hover:underline">Create account</button>
              </>
            ) : (
              <>Already a user?{" "}
                <button onClick={() => setMode("signin")} className="font-semibold text-primary hover:underline">Sign in</button>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[420px] py-12">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft">
                <Sparkles className="h-3 w-3 text-primary" strokeWidth={2} />
                Intelligent ledger workspace
              </div>
              <h1 className="mt-5 font-display text-[34px] leading-[1.1] tracking-tight text-foreground">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                {mode === "signin"
                  ? "Sign in to continue to your LedgerLens workspace."
                  : "Get started with intelligent statement reconciliation."}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-lg font-medium"
              onClick={handleGoogle}
              disabled={googleLoading}
            >
              {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </Button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-[12.5px] font-medium text-foreground">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[12.5px] font-medium text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[12.5px] font-medium text-foreground">Password</Label>
                  {mode === "signin" && (
                    <button type="button" className="text-[11.5px] font-medium text-primary hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
                  </button>
                </div>
              </div>

              {mode === "signin" && (
                <label className="flex items-center gap-2 text-[12.5px] text-muted-foreground select-none cursor-pointer">
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                  Keep me signed in
                </label>
              )}

              <Button type="submit" className="w-full h-11 rounded-lg" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-[11.5px] text-muted-foreground">
              By continuing you agree to our{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Terms</a>{" "}and{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <footer className="text-[11.5px] text-muted-foreground">
          © {new Date().getFullYear()} LedgerLens AI. All rights reserved.
        </footer>
      </div>

      {/* Right — branded panel */}
      <div className="relative hidden lg:flex overflow-hidden bg-[hsl(222_60%_10%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(221_83%_53%/0.55),transparent_55%),radial-gradient(ellipse_at_bottom_left,hsl(217_91%_60%/0.35),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(hsl(0_0%_100%/0.4) 1px,transparent 1px),linear-gradient(90deg,hsl(0_0%_100%/0.4) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_hsl(152_65%_55%)]" />
            Engine v4.2 — live
          </div>

          <div className="space-y-8">
            <h2 className="font-display text-[40px] leading-[1.05] tracking-tight">
              Reconcile statements with{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">precision intelligence</span>.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/70 max-w-md">
              LedgerLens turns raw statements into clean, audit-ready ledgers — categorized, matched, and explained by AI.
            </p>

            <div className="grid grid-cols-1 gap-3 max-w-md">
              {[
                { icon: BarChart3, label: "Live cashflow insights", desc: "Trends, anomalies, and forecasts at a glance." },
                { icon: Bot, label: "AI assistant on-call", desc: "Ask about any line, vendor, or reconciliation." },
                { icon: ShieldCheck, label: "SOC 2 grade security", desc: "End-to-end encrypted. Your data never trains models." },
              ].map((f) => (
                <div key={f.label} className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 hover:bg-white/[0.07] transition-colors">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white shrink-0">
                    <f.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-white">{f.label}</div>
                    <div className="text-[12px] text-white/60 mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure className="border-l-2 border-white/30 pl-4 max-w-md">
            <blockquote className="text-[14px] leading-relaxed text-white/85">
              "LedgerLens cut our month-end close from nine days to two. The AI assistant feels like a senior analyst that never sleeps."
            </blockquote>
            <figcaption className="mt-3 text-[12px] text-white/60">
              Maya Chen — Controller, Northwind Capital
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}