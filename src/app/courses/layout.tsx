import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getAuth } from "@/lib/auth";
import { getRoleHome } from "@/utils/permissions";

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await getAuth();
  return <div className="min-h-screen bg-[#F7F9FB]">
    <header className="border-b bg-white"><nav aria-label="Course navigation" className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-6 py-5">
      <Link href="/" className="mr-auto text-xl font-bold text-[#0D2B52]">BeeLearn</Link>
      <Link href="/courses">Courses</Link>
      {user ? <><Link href={role ? getRoleHome(role) : "/auth/access-error"}>My account</Link><LogoutButton /></> : <Link href="/login">Sign in</Link>}
    </nav></header>
    <main className="mx-auto max-w-7xl px-6 py-12">{children}</main>
  </div>;
}
