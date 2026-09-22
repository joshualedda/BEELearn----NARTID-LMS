import Link from "next/link";
import { AuthTemplate } from "@/templates/AuthTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F9FB] px-6">
      <div className="w-full max-w-[410px]">
        <AuthTemplate
          title="Forgot password"
          subtitle="Enter your email and we'll send you a reset link."
        >
          <form className="space-y-5">
            <Input
              type="email"
              name="email"
              placeholder="name@company.com"
              autoComplete="email"
              required
            />
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Remembered it?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Back to Sign In
            </Link>
          </p>
        </AuthTemplate>
      </div>
    </div>
  );
}
