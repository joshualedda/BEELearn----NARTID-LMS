"use client";

import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, BookOpen, ClipboardList, Clock3, Eye, GraduationCap, ListChecks, UserRoundCheck, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DashboardPanel, DashboardTable, StatCard, type TableColumn } from "@/components/dashboard/admin/DashboardParts";
import { ReportBarChart } from "./ReportCharts";
import { filterReportCourses, getReportCourses, reportCourses, reportRangeOptions, reportSnapshots, type ReportCourse, type ReportRange } from "./report-mock-data";

type StatTone = "emerald" | "blue" | "violet" | "cyan" | "amber" | "rose";
type ReportStat = { label: string; value: string; note: string; icon: LucideIcon; tone: StatTone };

const enrollmentColumns: TableColumn<ReportCourse>[] = [
  { heading: "Course", render: (row) => <span className="font-bold text-slate-800">{row.title}</span> },
  { heading: "Instructor", render: (row) => row.instructor },
  { heading: "Students", render: (row) => row.students },
  { heading: "Status", render: (row) => <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${row.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{row.status}</span> },
];

const performanceColumns: TableColumn<ReportCourse>[] = [
  { heading: "Course", render: (row) => <span className="font-bold text-slate-800">{row.title}</span> },
  { heading: "Instructor", render: (row) => row.instructor },
  { heading: "Students", render: (row) => row.students },
  { heading: "Average Grade", render: (row) => `${row.averageGrade}%` },
  { heading: "Completion Rate", render: (row) => `${row.completionRate}%` },
];

const instructorOptions = [...new Set(reportCourses.map((course) => course.instructor))];
const selectClasses = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";

function MetricSection({ title, description, stats }: { title: string; description: string; stats: readonly ReportStat[] }) {
  return <section aria-label={title} className="space-y-3">
    <div>
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">{title}</h2>
      <p className="mt-0.5 text-xs font-medium text-slate-500">{description}</p>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
    </div>
  </section>;
}

function FilterField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <label className="block min-w-0 space-y-1.5 text-xs font-bold text-slate-600">
    <span>{label}</span>
    <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClasses}>{children}</select>
  </label>;
}

export function ReportsContent() {
  const [range, setRange] = useState<ReportRange>("30d");
  const [courseId, setCourseId] = useState("all");
  const [instructor, setInstructor] = useState("all");
  const snapshot = reportSnapshots[range];
  const courses = filterReportCourses(getReportCourses(range), courseId, instructor);
  const rangeLabel = reportRangeOptions.find((option) => option.value === range)?.label ?? "Sample period";

  const overviewStats: ReportStat[] = [
    { label: "Total Students", value: snapshot.overview.students.toLocaleString("en-US"), note: "Platform-wide", icon: GraduationCap, tone: "emerald" },
    { label: "Total Courses", value: String(snapshot.overview.courses), note: "Platform-wide", icon: BookOpen, tone: "blue" },
    { label: "Total Enrollments", value: snapshot.overview.enrollments.toLocaleString("en-US"), note: "Sample period", icon: UserRoundCheck, tone: "violet" },
    { label: "Completion Rate", value: `${snapshot.overview.completionRate}%`, note: "Platform-wide", icon: Activity, tone: "cyan" },
  ];
  const academicStats: ReportStat[] = [
    { label: "Average Grade", value: `${snapshot.academic.averageGrade}%`, note: "Platform-wide", icon: GraduationCap, tone: "emerald" },
    { label: "Submission Rate", value: `${snapshot.academic.submissionRate}%`, note: "Platform-wide", icon: ClipboardList, tone: "blue" },
    { label: "Average Quiz Score", value: `${snapshot.academic.averageQuizScore}%`, note: "Platform-wide", icon: ListChecks, tone: "violet" },
    { label: "Late Submissions", value: String(snapshot.academic.lateSubmissions), note: "Sample period", icon: Clock3, tone: "amber" },
  ];
  const engagementStats: ReportStat[] = [
    { label: "Active Students", value: String(snapshot.engagement.activeStudents), note: "Platform-wide", icon: UsersRound, tone: "emerald" },
    { label: "Inactive Students", value: String(snapshot.engagement.inactiveStudents), note: "Platform-wide", icon: UsersRound, tone: "rose" },
    { label: "Avg Session Duration", value: `${snapshot.engagement.sessionMinutes} min`, note: "Sample period", icon: Clock3, tone: "blue" },
    { label: "Course Visits", value: snapshot.engagement.courseVisits.toLocaleString("en-US"), note: "Sample period", icon: Eye, tone: "cyan" },
  ];

  return <div className="space-y-7">
    <Card className="grid grid-cols-1 gap-4 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-3" aria-label="Report filters">
      <FilterField label="Date Range" value={range} onChange={(value) => {
        const selected = reportRangeOptions.find((option) => option.value === value);
        if (selected) setRange(selected.value);
      }}>
        {reportRangeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </FilterField>
      <FilterField label="Course" value={courseId} onChange={setCourseId}>
        <option value="all">All Courses</option>
        {reportCourses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
      </FilterField>
      <FilterField label="Instructor" value={instructor} onChange={setInstructor}>
        <option value="all">All Instructors</option>
        {instructorOptions.map((name) => <option key={name} value={name}>{name}</option>)}
      </FilterField>
    </Card>

    <MetricSection title="Overview" description={`Platform-wide sample metrics for ${rangeLabel.toLowerCase()}.`} stats={overviewStats} />

    <DashboardPanel title="Enrollment Overview" description={`Featured sample courses for ${rangeLabel.toLowerCase()}. Course and instructor filters apply below.`} padded={false}>
      <DashboardTable caption="Sample course enrollments" columns={enrollmentColumns} rows={courses} />
    </DashboardPanel>

    <MetricSection title="Academic Performance" description={`Platform-wide sample metrics for ${rangeLabel.toLowerCase()}.`} stats={academicStats} />
    <MetricSection title="Learner Engagement" description={`Platform-wide sample metrics for ${rangeLabel.toLowerCase()}.`} stats={engagementStats} />

    <DashboardPanel title="Course Performance" description={`Featured sample courses for ${rangeLabel.toLowerCase()}. Course and instructor filters apply below.`} padded={false}>
      <DashboardTable caption="Sample course performance" columns={performanceColumns} rows={courses} />
    </DashboardPanel>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <DashboardPanel title="Enrollment by Course" description={`Sample enrolled students for ${rangeLabel.toLowerCase()}.`}>
        <ReportBarChart courses={courses} metric="students" />
      </DashboardPanel>
      <DashboardPanel title="Course Completion" description={`Sample completion rates for ${rangeLabel.toLowerCase()}.`}>
        <ReportBarChart courses={courses} metric="completionRate" />
      </DashboardPanel>
    </div>
  </div>;
}
