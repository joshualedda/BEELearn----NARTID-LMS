import { Children, type ComponentProps, type ReactNode } from "react";

interface TableProps {
  caption: string;
  title?: string;
  subtitle?: string;
  badgeCount?: number | string;
  badgeColor?: string;
  columns: readonly string[];
  children: ReactNode;
  emptyState?: ReactNode;
  footer?: ReactNode;
  className?: string;
  embedded?: boolean;
  tableClassName?: string;
}

export function Table({ caption, title, subtitle, badgeCount, badgeColor = "bg-emerald-50 text-emerald-600", columns, children, emptyState, footer, className = "", embedded = false, tableClassName = "" }: TableProps) {
  const hasRows = Children.count(children) > 0;
  return <div className={`${embedded ? "" : "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"} ${className}`}>
    {(title || subtitle || badgeCount !== undefined) && <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
      <div>
        {title && <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">{title}</h2>}
        {subtitle && <p className="mt-0.5 text-xs font-medium text-slate-400">{subtitle}</p>}
      </div>
      {badgeCount !== undefined && <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${badgeColor}`}>{badgeCount} items</span>}
    </div>}
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-left ${tableClassName}`}>
        <caption className="sr-only">{caption}</caption>
        <thead><tr className="border-b border-slate-100 bg-slate-50/60">
          {columns.map((heading) => <th key={heading} scope="col" className="whitespace-nowrap px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-400">{heading}</th>)}
        </tr></thead>
        <tbody className="divide-y divide-slate-50">
          {hasRows ? children : <tr><td colSpan={columns.length} className="py-16 text-center">{emptyState ?? <span className="text-sm font-black text-slate-300">No data found</span>}</td></tr>}
        </tbody>
      </table>
    </div>
    {footer}
  </div>;
}

export function Td({ className = "", ...props }: ComponentProps<"td">) {
  return <td className={`px-5 py-3.5 ${className}`} {...props} />;
}

export function Tr({ className = "", ...props }: ComponentProps<"tr">) {
  return <tr className={`group transition-colors hover:bg-slate-50/70 ${className}`} {...props} />;
}
