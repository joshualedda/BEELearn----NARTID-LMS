import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<{ registered?: string; confirmation?: string; next?: string }>;
}) {
  const params = await searchParams;
  const message = params.registered === "true"
    ? "Check your email for a confirmation link before signing in. If you already have an account, sign in or use password reset."
    : params.confirmation === "error"
      ? "This confirmation link is invalid or has expired. If you have not verified your email, enter it below and use Resend confirmation email. If sending is rate limited, wait before requesting a new link."
      : undefined;
  return <LoginForm message={message} next={params.next} />;
}
