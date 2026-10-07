import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { role, user } = await requireAuth();
  const authName = user?.user_metadata?.full_name;
  const displayName = (typeof authName === "string" ? authName.trim() : "") || user?.email?.split("@")[0] || "BeeLearn member";
  return <DashboardShell role={role!} displayName={displayName} email={user?.email ?? ""}>{children}</DashboardShell>;
}
