import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { FadeIn } from "@/components/ui/motion";
import { CourseGrid } from "@/components/features/courses/CourseGrid";
import { getCourses } from "@/lib/courses";

export async function FeaturedCoursesSection() {
  const { courses, error } = await getCourses(4);
  return (
    <section id="courses" aria-labelledby="courses-heading" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            headingId="courses-heading"
            eyebrow="Explore our courses"
            title="Learn practical beekeeping"
            description="Explore the latest beekeeping courses from NARTDI."
            action={<Link href="/courses" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700">View all courses <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          />
        </FadeIn>
        <div className="mt-10">
          {error ? <p role="alert" className="rounded-xl bg-slate-50 p-6 text-slate-600">{error}</p> : courses.length ? <CourseGrid courses={courses} /> : <p className="rounded-xl bg-slate-50 p-6 text-slate-600">New courses are on the way. Please check back soon.</p>}
        </div>
      </div>
    </section>
  );
}
