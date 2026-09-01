import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r md:block">
        <nav aria-label="Main navigation" />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
