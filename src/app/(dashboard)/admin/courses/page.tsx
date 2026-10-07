import { DashboardPageHeader } from "@/components/ui/dashboard-page-header";
import { CoursesDirectory } from "./CoursesDirectory";

export default function AdminCoursesPage() {
  return <section>
    <DashboardPageHeader
      title="All Courses"
      description="Browse and filter courses across the learning platform."
      eyebrow="Academic Management"
      aside={<span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">Sample data · Design preview</span>}
    />
    <CoursesDirectory />
  </section>;
}
