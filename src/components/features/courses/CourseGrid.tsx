import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { CourseRow } from "@/types/database.types";

export function CourseGrid({ courses }: { courses: CourseRow[] }) {
  return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
    {courses.map(course => <article key={course.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F7F9FB] p-5 shadow-sm">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700"><BookOpen aria-hidden="true" /></span>
      <h3 className="mt-6 text-lg font-bold text-[#0D2B52]">{course.title}</h3>
      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-slate-600">{course.description || "Explore this beekeeping course."}</p>
      <Link href={`/courses/${course.id}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#0D2B52]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0D2B52] hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
        View course <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>)}
  </div>;
}
