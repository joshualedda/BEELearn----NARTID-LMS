import type { ReactNode } from "react";

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
  aside?: ReactNode;
}

export function DashboardPageHeader({
  title,
  description,
  eyebrow,
  aside,
}: DashboardPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <span className="mt-1 h-12 w-1 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
        <div className="min-w-0">
          {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>}
          <h1 className="mt-0.5 text-3xl font-black tracking-tight text-slate-900">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">{description}</p>
        </div>
      </div>
      {aside && <div className="shrink-0 pl-5 sm:pl-0">{aside}</div>}
    </div>
  );
}
