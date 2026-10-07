import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Table, Td, Tr } from "@/components/ui/table";

const statTones = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  cyan: "bg-cyan-50 text-cyan-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
} as const;

export function StatCard({ label, value, note, icon: Icon, tone }: {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone: keyof typeof statTones;
}) {
  return <Card className="flex flex-col gap-3 rounded-2xl border-slate-100 p-4 shadow-sm transition-shadow hover:shadow-md">
    <span className={`flex size-10 items-center justify-center rounded-xl ${statTones[tone]}`} aria-hidden="true">
      <Icon className="size-[18px]" strokeWidth={2} />
    </span>
    <div>
      <p className="text-xl font-black leading-none text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase leading-tight tracking-widest text-slate-400">{label}</p>
      <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${statTones[tone]}`}>{note}</span>
    </div>
  </Card>;
}

export function DashboardPanel({ title, description, children, className = "", padded = true }: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return <Card className={`overflow-hidden rounded-2xl border-slate-100 shadow-sm ${className}`}>
    <div className={`border-b border-slate-50 ${padded ? "px-6 pb-2 pt-5" : "px-6 py-4"}`}>
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">{title}</h2>
      <p className="mt-0.5 text-xs font-medium text-slate-400">{description}</p>
    </div>
    <div className={padded ? "p-6 pt-4" : ""}>{children}</div>
  </Card>;
}

export type TableColumn<Row> = {
  heading: string;
  render: (row: Row) => ReactNode;
};

export function DashboardTable<Row extends { id: string }>({ caption, columns, rows }: {
  caption: string;
  columns: readonly TableColumn<Row>[];
  rows: readonly Row[];
}) {
  return <Table caption={caption} columns={columns.map((column) => column.heading)} embedded tableClassName="min-w-[560px]" emptyState={<span className="text-sm text-slate-400">No sample rows.</span>}>
    {rows.map((row) => <Tr key={row.id}>
      {columns.map((column) => <Td key={column.heading} className="text-sm text-slate-600">{column.render(row)}</Td>)}
    </Tr>)}
  </Table>;
}
