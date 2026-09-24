"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { validateLoginInput } from "@/validations/auth.schema";
import { authErrorMessage } from "@/utils/auth-errors";
import { getSignInDestination } from "@/app/(auth)/actions";

const FEATURES = [
  { icon: Building2, label: "Structured Beekeeping Courses" },
  { icon: ShieldCheck, label: "Track Your Progress" },
  { icon: Lock, label: "Secure Access" },
] as const;

export function LoginForm({ message, next }: { message?: string; next?: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const input = { email: String(form.get("email") ?? "").trim(), password: String(form.get("password") ?? "") };
    const validation = validateLoginInput(input);
    setErrors(validation);
    setNotice("");
    if (validation.length) return;
    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(input);
      if (error) {
        setErrors([authErrorMessage(error, "We couldn't sign you in. Please try again.")]);
        return;
      }
      const result = await getSignInDestination(next ?? null);
      if (result.error) setErrors([result.error]);
      else if (result.url) { router.replace(result.url); router.refresh(); }
    } catch { setErrors(["Unable to connect. Please try again."]); }
    finally { setPending(false); }
  }

  async function resendConfirmation() {
    if (pending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrors(["Enter your email address first."]);
      return;
    }
    setPending(true);
    setErrors([]);
    setNotice("");
    try {
      const { error } = await createClient().auth.resend({ type: "signup", email: email.trim(), options: { emailRedirectTo: `${window.location.origin}/auth/confirm` } });
      if (error) setErrors([authErrorMessage(error, "We couldn't send the confirmation email. Please try again.")]);
      else setNotice("If your account needs verification, a confirmation email has been sent.");
    } catch { setErrors(["Unable to connect. Please try again."]); }
    finally { setPending(false); }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0D2B52] p-11 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="relative flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-bold text-green-400 ring-1 ring-white/15">
            B
          </span>
          <span className="text-base font-semibold tracking-wide">
            <span className="text-white">Bee</span>
            <span className="text-green-400">Learn</span>
          </span>
        </div>

        <div className="relative max-w-[420px]">
          <h1 className="text-[32px] font-bold leading-tight text-white">
            Learn beekeeping.
          </h1>
          <h2 className="mt-1 text-[32px] font-bold leading-tight text-[#E5A900]">
            Anytime, anywhere.
          </h2>
          <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-[#8FA3BF]">
            Access the official Beekeeping Learning Management System of NARTDI.
          </p>

          <ul className="mt-10 space-y-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16407A] ring-1 ring-inset ring-white/10 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-green-400">
                  <Icon />
                </span>
                <span className="text-sm text-[#C7D5EA]">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-[#6B82A6]">
          © 2026 NARTDI — Don Mariano Marcos Memorial State University
        </p>
      </div>

      <div className="flex items-center justify-center bg-[#F7F9FB] px-6 py-12 sm:px-10">
        <div className="w-full max-w-[410px]">
          <div className="mb-8 space-y-1.5 text-center">
            <h1 className="text-[24px] font-bold text-[#0D2B52]">Welcome back</h1>
            <p className="text-sm text-slate-500">
              Sign in to your account to continue
            </p>
            <p className="pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              DMMMSU - NARTDI Official Portal
            </p>
          </div>

          <Card className="rounded-[14px] p-[30px]">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {(notice || message) && <p role="status" className="rounded-md bg-blue-50 p-3 text-sm text-blue-900">{notice || message}</p>}
                {errors.length > 0 && <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{errors.map(error => <p key={error}>{error}</p>)}</div>}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    icon={<Mail />}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-green-600 hover:text-green-700"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    icon={<Lock />}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="cursor-pointer p-1 text-gray-400 transition-colors hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <p className="text-xs text-slate-500">You stay signed in on this browser until you sign out or your session expires.</p>
                <Button type="submit" disabled={pending} className="w-full">{pending ? "Please wait…" : "Sign In"}</Button>
                <Button variant="link" onClick={resendConfirmation} disabled={pending} className="w-full text-xs">Resend confirmation email</Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
