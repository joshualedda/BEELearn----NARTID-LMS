import {
  BookOpen, ClipboardList, GraduationCap, ListChecks, UsersRound, UserRoundCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DashboardPageHeader } from "@/components/ui/dashboard-page-header";
import { ActivityTrendChart, CourseActivityChart, RoleDistributionChart } from "@/components/dashboard/admin/AdminDashboardCharts";
import { DashboardPanel, DashboardTable, StatCard, type TableColumn } from "@/components/dashboard/admin/DashboardParts";
import { sampleCourses, sampleEnrollments, sampleStats, sampleUpcomingAssignments } from "@/components/dashboard/admin/sample-data";

const statIcons = {
  learners: GraduationCap,
  instructors: UsersRound,
  courses: BookOpen,
  enrollments: UserRoundCheck,
  assignments: ClipboardList,
  quizzes: ListChecks,
};

type Course = (typeof sampleCourses)[number];
type Assignment = (typeof sampleUpcomingAssignments)[number];
type Enrollment = (typeof sampleEnrollments)[number];

const courseColumns: TableColumn<Course>[] = [
  { heading: "Course", render: (row) => <span className="font-bold text-slate-800">{row.title}</span> },
  { heading: "Instructor", render: (row) => row.instructor },
  { heading: "Learners", render: (row) => <span className="font-bold text-slate-800">{row.learners}</span> },
  { heading: "Lessons", render: (row) => row.lessons },
  { heading: "Status", render: (row) => <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">{row.status}</span> },
];

const assignmentColumns: TableColumn<Assignment>[] = [
  { heading: "Assignment", render: (row) => <span className="font-bold text-slate-800">{row.title}</span> },
  { heading: "Course", render: (row) => row.course },
  { heading: "Example due", render: (row) => <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">{row.due}</span> },
];

const enrollmentColumns: TableColumn<Enrollment>[] = [
  { heading: "Learner", render: (row) => <span className="font-bold text-slate-800">{row.learner}</span> },
  { heading: "Course", render: (row) => row.course },
  { heading: "Status", render: (row) => <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">{row.status}</span> },
  { heading: "Example date", render: (row) => row.date },
];

export default function AdminDashboardPage() {
  return <div className="space-y-6">
    <DashboardPageHeader
      title="Dashboard"
      description="Your learning platform at a glance."
      aside={<span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">Sample data · Design preview</span>}
    />

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6" aria-label="Sample platform statistics">
      {sampleStats.map((stat) => <StatCard key={stat.label} {...stat} icon={statIcons[stat.icon]} />)}
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="rounded-2xl border-slate-100 p-6 shadow-sm lg:col-span-3">
        <ActivityTrendChart />
      </Card>
      <DashboardPanel title="Accounts by Role" description="Illustrative platform membership" className="lg:col-span-2">
        <RoleDistributionChart />
      </DashboardPanel>
    </div>

    <DashboardPanel title="Popular Courses" description="Example courses sorted by enrolled learners" padded={false}>
      <DashboardTable caption="Sample popular courses" columns={courseColumns} rows={sampleCourses} />
    </DashboardPanel>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <DashboardPanel title="Upcoming Assignments" description="Example deadlines, not live due dates" className="lg:col-span-3" padded={false}>
        <DashboardTable caption="Sample upcoming assignments" columns={assignmentColumns} rows={sampleUpcomingAssignments} />
      </DashboardPanel>
      <DashboardPanel title="Course Activity" description="Illustrative enrollments by course" className="lg:col-span-2">
        <CourseActivityChart />
      </DashboardPanel>
    </div>

    <DashboardPanel title="Recent Enrollments" description="Example activity, not live student records" padded={false}>
      <DashboardTable caption="Sample recent enrollments" columns={enrollmentColumns} rows={sampleEnrollments} />
    </DashboardPanel>
  </div>;
}
