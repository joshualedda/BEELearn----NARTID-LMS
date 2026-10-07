import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function AccessErrorPage({ searchParams }: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = reason === "missing-profile"
    ? "Your profile wasn't visible to your signed-in session. It may be missing or blocked by database permissions. Please contact your administrator."
    : reason === "invalid-role"
      ? "Your profile has an unsupported role. Please contact your administrator."
      : reason === "profile-permission"
        ? "We couldn't access your profile. Please try again, or contact your administrator."
        : reason === "profile-query"
          ? "We couldn't load your profile right now. Please try again later."
          : reason === "profile"
            ? "Your account exists, but its profile could not be saved. Try again, or ask an administrator to check the profiles table permissions."
            : "We couldn't load a valid role for your account. Please try again, or contact your administrator if this continues.";
  return <main className="mx-auto max-w-lg space-y-5 px-6 py-20">
    <h1 className="text-2xl font-bold">Your account needs attention</h1>
    <p>{message}</p>
    <Link href="/auth/complete" className="block underline">Try again</Link>
    <LogoutButton />
    <Link href="/" className="block underline">Back to home</Link>
  </main>;
}
