import Link from "next/link";

export default function InstructorDashboardPage() {
  return <section className="mx-auto max-w-4xl">
    <h1 className="text-3xl font-bold text-[#0D2B52]">Instructor dashboard</h1>
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-slate-600">Your teaching overview is coming soon.</p>
      <Link className="mt-4 inline-block font-semibold text-green-700 underline" href="/instructor/courses">
        View my courses
      </Link>
    </div>
  </section>;
}
