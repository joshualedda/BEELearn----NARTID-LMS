import { DashboardPageHeader } from "@/components/ui/dashboard-page-header";
import { InstructorsTable } from "./InstructorsTable";

export default function AdminInstructorsPage() {
  return <section>
    <DashboardPageHeader
      title="Instructors"
      description="Browse and filter instructor accounts."
      eyebrow="Academic Management"
      aside={<span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">Sample data · Design preview</span>}
    />
    <InstructorsTable />
  </section>;
}
