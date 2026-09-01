import type { ReactNode } from "react";

export function DashboardTemplate({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl p-6">{children}</div>;
}
