"use client";

import { ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const pages: (number | "ellipsis")[] = totalPages <= 5
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : page <= 3 ? [1, 2, 3, 4, "ellipsis", totalPages]
      : page >= totalPages - 2 ? [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        : [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];

  return <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
    <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous page" className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-emerald-500">
      <ChevronDown className="size-5 rotate-90" aria-hidden="true" />
    </button>
    <div className="flex items-center gap-1">
      {pages.map((item, index) => item === "ellipsis"
        ? <span key={`ellipsis-${index}`} className="px-2 font-bold text-slate-400">...</span>
        : <button key={item} type="button" onClick={() => onPageChange(item)} aria-label={`Page ${item}`} aria-current={page === item ? "page" : undefined} className={`size-10 rounded-lg text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-emerald-500 ${page === item ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50"}`}>{item}</button>)}
    </div>
    <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria-label="Next page" className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-emerald-500">
      <ChevronDown className="size-5 -rotate-90" aria-hidden="true" />
    </button>
  </nav>;
}
