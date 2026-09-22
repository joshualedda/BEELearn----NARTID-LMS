import type { ReactNode } from "react";

interface LandingSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  headingId?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function LandingSectionHeader({
  eyebrow,
  title,
  description,
  headingId,
  align = "left",
  action,
}: LandingSectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={`flex gap-5 ${isCentered ? "mx-auto max-w-2xl flex-col items-center text-center" : "flex-col sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={isCentered ? "" : "max-w-2xl"}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-700">{eyebrow}</p>
        <h2 id={headingId} className="mt-3 font-sans text-3xl font-bold tracking-tight text-[#0D2B52] sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
