"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { TableFilter } from "@/components/ui/table-filter";
import { Table, Td, Tr } from "@/components/ui/table";
import { filterSampleStudents, paginateStudents, sampleStudents, studentStatusOptions, type StudentStatus } from "./sample-students";

const statusColors: Record<StudentStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

export function StudentsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const students = filterSampleStudents(sampleStudents, search, status);
  const { page, totalPages, rows, start, end } = paginateStudents(students, currentPage);

  return <div>
    <TableFilter
      searchValue={search}
      onSearchChange={(value) => { setSearch(value); setCurrentPage(1); }}
      filterValue={status}
      onFilterChange={(value) => { setStatus(value); setCurrentPage(1); }}
      filterOptions={studentStatusOptions}
      searchPlaceholder="Search name or email..."
      searchLabel="Search students by name or email"
      filterLabel="Filter students by status"
    />
    <Table
      caption="Sample student accounts"
      title="Student Directory"
      subtitle="Illustrative accounts for this design preview"
      badgeCount={students.length}
      columns={["Student", "Email", "Joined", "Status"]}
      tableClassName="min-w-[620px]"
      emptyState={<div className="space-y-1 text-sm text-slate-500"><p className="font-semibold">No sample students found.</p><p>Try another search or status.</p></div>}
      footer={<div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">
        <p className="text-xs font-medium text-slate-500">Showing {start}–{end} of {students.length} sample students</p>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>}
    >
      {rows.map((student) => <Tr key={student.id}>
        <Td className="text-sm font-bold text-slate-800">{student.name}</Td>
        <Td className="text-sm text-slate-600">{student.email}</Td>
        <Td className="whitespace-nowrap text-sm text-slate-600">{student.joined}</Td>
        <Td><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[student.status]}`}>{student.status}</span></Td>
      </Tr>)}
    </Table>
  </div>;
}
