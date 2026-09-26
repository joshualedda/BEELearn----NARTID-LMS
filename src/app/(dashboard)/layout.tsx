import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { role, profile, user } = await requireAuth();
  const displayName = profile?.full_name?.trim() || user?.email?.split("@")[0] || "BeeLearn member";
  return <DashboardShell role={role!} displayName={displayName}>{children}</DashboardShell>;
}
