import type { ReactNode } from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { getRoleHome } from "@/utils/permissions";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { role } = await requireAuth();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r md:block">
        <nav aria-label="Main navigation" />
      </aside>
      <main className="min-w-0 flex-1 p-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <nav className="flex gap-4" aria-label="Account navigation">
            <Link href={getRoleHome(role!)} className="font-semibold">Dashboard</Link>
            <Link href="/courses">Courses</Link>
          </nav>
          <LogoutButton />
        </header>
        {children}
      </main>
    </div>
  );
}
