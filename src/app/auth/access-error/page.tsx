import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function AccessErrorPage() {
  return <main className="mx-auto max-w-lg space-y-5 px-6 py-20">
    <h1 className="text-2xl font-bold">Your account needs attention</h1>
    <p>We couldn&apos;t load a valid role for your account. Please try again, or contact your administrator if this continues.</p>
    <Link href="/auth/complete" className="block underline">Try again</Link>
    <LogoutButton />
    <Link href="/" className="block underline">Back to home</Link>
  </main>;
}
