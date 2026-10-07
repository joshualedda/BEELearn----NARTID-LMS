"use client";

import { Filter, LayoutGrid, List, Search } from "lucide-react";

/**
 * @typedef {{ value: string, label: string }} FilterOption
 * @typedef {{
 *   searchValue: string,
 *   onSearchChange: (value: string) => void,
 *   filterValue: string,
 *   onFilterChange: (value: string) => void,
 *   filterOptions: FilterOption[],
 *   searchPlaceholder?: string,
 *   searchLabel?: string,
 *   filterLabel?: string,
 *   viewMode?: "table" | "cards",
 *   onViewModeChange?: (mode: "table" | "cards") => void,
 *   className?: string,
 * }} TableFilterProps
 */

/** @param {TableFilterProps} props */
export function TableFilter({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  searchPlaceholder = "Search...",
  searchLabel = "Search table",
  filterLabel = "Filter by status",
  viewMode,
  onViewModeChange,
  className = "",
}) {
  return (
    <div className={`mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row ${className}`}>
      <div className="group relative w-full md:w-96">
        <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
        <input
          type="text"
          aria-label={searchLabel}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <div className="flex w-full items-center gap-3 md:w-auto">
        <div className="relative flex w-full items-center md:w-auto">
          <Filter size={16} aria-hidden="true" className="pointer-events-none absolute left-3 text-slate-400" />
          <select
            aria-label={filterLabel}
            value={filterValue}
            onChange={(event) => onFilterChange(event.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm font-bold text-slate-600 transition-colors hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-48"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {viewMode && onViewModeChange && (
          <div className="flex shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Display courses as">
            <button type="button" aria-label="Table view" aria-pressed={viewMode === "table"} onClick={() => onViewModeChange("table")}
              className={`rounded-lg p-2 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 ${viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <List size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Card view" aria-pressed={viewMode === "cards"} onClick={() => onViewModeChange("cards")}
              className={`rounded-lg p-2 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 ${viewMode === "cards" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <LayoutGrid size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableFilter;
