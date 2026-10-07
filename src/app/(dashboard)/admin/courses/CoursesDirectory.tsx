"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { TableFilter } from "@/components/ui/table-filter";
import { Table, Td, Tr } from "@/components/ui/table";
import { courseStatusOptions, filterSampleCourses, paginateCourses, sampleCourses, type SampleCourseStatus } from "./sample-courses";

type ViewMode = "table" | "cards";

const statusColors: Record<SampleCourseStatus, string> = {
  Published: "bg-emerald-50 text-emerald-700",
  Draft: "bg-amber-50 text-amber-700",
  Archived: "bg-slate-100 text-slate-600",
};

export function CoursesDirectory() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const courses = filterSampleCourses(sampleCourses, search, status);
  const { page, totalPages, rows, start, end } = paginateCourses(courses, currentPage);
  const footer = <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">
    <p className="text-xs font-medium text-slate-500">Showing {start}–{end} of {courses.length} sample courses</p>
    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} />
  </div>;

  return <div>
    <TableFilter
      searchValue={search}
      onSearchChange={(value) => { setSearch(value); setCurrentPage(1); }}
      filterValue={status}
      onFilterChange={(value) => { setStatus(value); setCurrentPage(1); }}
      filterOptions={courseStatusOptions}
      searchPlaceholder="Search course or instructor..."
      searchLabel="Search courses by title or instructor"
      filterLabel="Filter courses by status"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    />
    {viewMode === "table" ? <Table
      caption="Sample courses"
      title="Course Directory"
      subtitle="Illustrative courses for this design preview"
      badgeCount={courses.length}
      columns={["Course", "Instructor", "Learners", "Lessons", "Status"]}
      tableClassName="min-w-[760px]"
      emptyState={<div className="space-y-1 text-sm text-slate-500"><p className="font-semibold">No sample courses found.</p><p>Try another search or status.</p></div>}
      footer={footer}
    >
      {rows.map((course) => <Tr key={course.id}>
        <Td className="text-sm font-bold text-slate-800">{course.title}</Td>
        <Td className="text-sm text-slate-600">{course.instructor}</Td>
        <Td className="text-sm font-semibold text-slate-700">{course.learners}</Td>
        <Td className="text-sm text-slate-600">{course.lessons}</Td>
        <Td><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[course.status]}`}>{course.status}</span></Td>
      </Tr>)}
    </Table> : <section aria-label="Course cards" className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">Course Directory</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-400">Illustrative courses for this design preview</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">{courses.length} items</span>
      </div>
      {rows.length ? <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((course) => <Card key={course.id} className="flex h-full flex-col border-slate-200 p-5 shadow-none">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-snug text-slate-800">{course.title}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusColors[course.status]}`}>{course.status}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{course.instructor}</p>
          <div className="mt-auto flex gap-5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
            <span>{course.learners} learners</span>
            <span>{course.lessons} lessons</span>
          </div>
        </Card>)}
      </div> : <div className="py-16 text-center text-sm text-slate-500"><p className="font-semibold">No sample courses found.</p><p className="mt-1">Try another search or status.</p></div>}
      {footer}
    </section>}
  </div>;
}
