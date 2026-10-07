import { DashboardPageHeader } from "@/components/ui/dashboard-page-header";
import { ReportsContent } from "./ReportsContent";

export default function AdminReportsPage() {
  return <section>
    <DashboardPageHeader
      title="Reports"
      description="Monitor enrollment, academic performance, course activity, and learner engagement across the learning management system."
      eyebrow="Analytics"
      aside={<span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">Sample data · Design preview</span>}
    />
    <ReportsContent />
  </section>;
}
