"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { TableFilter } from "@/components/ui/table-filter";
import { Table, Td, Tr } from "@/components/ui/table";
import { filterSampleInstructors, instructorStatusOptions, paginateInstructors, sampleInstructors, type InstructorStatus } from "./sample-instructors";

const statusColors: Record<InstructorStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

export function InstructorsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const instructors = filterSampleInstructors(sampleInstructors, search, status);
  const { page, totalPages, rows, start, end } = paginateInstructors(instructors, currentPage);

  return <div>
    <TableFilter
      searchValue={search}
      onSearchChange={(value) => { setSearch(value); setCurrentPage(1); }}
      filterValue={status}
      onFilterChange={(value) => { setStatus(value); setCurrentPage(1); }}
      filterOptions={instructorStatusOptions}
      searchPlaceholder="Search name or email..."
      searchLabel="Search instructors by name or email"
      filterLabel="Filter instructors by status"
    />
    <Table
      caption="Sample instructor accounts"
      title="Instructor Directory"
      subtitle="Illustrative accounts and course counts for this design preview"
      badgeCount={instructors.length}
      columns={["Instructor", "Email", "Courses", "Joined", "Status"]}
      tableClassName="min-w-[760px]"
      emptyState={<div className="space-y-1 text-sm text-slate-500"><p className="font-semibold">No sample instructors found.</p><p>Try another search or status.</p></div>}
      footer={<div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">
        <p className="text-xs font-medium text-slate-500">Showing {start}–{end} of {instructors.length} sample instructors</p>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>}
    >
      {rows.map((instructor) => <Tr key={instructor.id}>
        <Td className="text-sm font-bold text-slate-800">{instructor.name}</Td>
        <Td className="text-sm text-slate-600">{instructor.email}</Td>
        <Td className="text-sm font-semibold text-slate-700">{instructor.courses}</Td>
        <Td className="whitespace-nowrap text-sm text-slate-600">{instructor.joined}</Td>
        <Td><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[instructor.status]}`}>{instructor.status}</span></Td>
      </Tr>)}
    </Table>
  </div>;
}
