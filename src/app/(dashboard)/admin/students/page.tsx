import { DashboardPageHeader } from "@/components/ui/dashboard-page-header";
import { StudentsTable } from "./StudentsTable";

export default function AdminStudentsPage() {
  return <section>
    <DashboardPageHeader
      title="Students"
      description="Browse and filter student accounts."
      eyebrow="Academic Management"
      aside={<span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">Sample data · Design preview</span>}
    />
    <StudentsTable />
  </section>;
}
