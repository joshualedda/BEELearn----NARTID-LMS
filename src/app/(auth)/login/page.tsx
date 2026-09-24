import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<{ registered?: string; confirmation?: string; next?: string }>;
}) {
  const params = await searchParams;
  const message = params.registered === "true"
    ? "Check your email for a confirmation link before signing in. If you already have an account, sign in or use password reset."
    : params.confirmation === "error"
      ? "This confirmation link is invalid or has expired. Try signing in if you already verified your email; otherwise request a new confirmation below."
      : undefined;
  return <LoginForm message={message} next={params.next} />;
}
