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
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { validateRegisterInput } from "@/validations/auth.schema";

const FEATURES = [
  { icon: Building2, label: "Structured Beekeeping Courses" },
  { icon: ShieldCheck, label: "Track Your Progress" },
  { icon: Lock, label: "Secure Access" },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData(event.currentTarget);
    const input = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validationErrors = validateRegisterInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!agreedToTerms) {
      setErrors(["You must agree to the Terms of Service and Privacy Policy."]);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            full_name: input.fullName.trim(),
          },
        },
      });

      if (error) {
        setErrors([error.message]);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-[24px] font-bold text-[#0D2B52]">Create Account</h1>
            <p className="text-sm text-slate-500">
              Join the BeeLearn community today
            </p>
            <p className="pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              DMMMSU - NARTDI Official Portal
            </p>
          </div>

          <Card className="rounded-[14px] p-[30px]">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errors.length > 0 && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 space-y-1">
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Juan Dela Cruz"
                    icon={<User />}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    icon={<Mail />}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                    minLength={8}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    icon={<Lock />}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                        className="cursor-pointer p-1 text-gray-400 transition-colors hover:text-slate-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <Checkbox
                  id="terms"
                  name="terms"
                  checked={agreedToTerms}
                  onChange={(event) => setAgreedToTerms(event.target.checked)}
                  label={
                    <>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-green-600 hover:text-green-700 underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-green-600 hover:text-green-700 underline"
                      >
                        Privacy Policy
                      </Link>
                    </>
                  }
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}