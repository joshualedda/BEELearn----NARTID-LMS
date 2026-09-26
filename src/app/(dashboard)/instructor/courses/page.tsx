import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function InstructorCoursesPage() {
  const { supabase, user } = await requireAuth("instructor");
  const { data: courses, error } = await supabase.from("courses")
    .select("id,title,description")
    .eq("instructor_id", user!.id)
    .order("created_at", { ascending: false });

  const courseIds = courses?.map((course) => course.id) ?? [];
  const { data: enrollments, error: enrollmentsError } = courseIds.length && !error
    ? await supabase.from("enrollments").select("course_id").in("course_id", courseIds).eq("status", "active")
    : { data: [], error: null };
  const counts = new Map<string, number>();
  for (const enrollment of enrollments ?? []) {
    counts.set(enrollment.course_id, (counts.get(enrollment.course_id) ?? 0) + 1);
  }

  return <section className="mx-auto max-w-4xl">
    <h1 className="mb-6 text-3xl font-bold text-[#0D2B52]">My courses</h1>
    {error ? <p role="alert">We couldn&apos;t load your courses. Please try again.</p>
      : !courses?.length ? <p>You don&apos;t have any courses yet.</p>
      : <ul className="space-y-4">{courses.map((course) => <li key={course.id} className="rounded-xl border bg-white p-5">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        {course.description && <p className="mt-2 text-sm text-slate-600">{course.description}</p>}
        <p className="mt-2 text-sm text-slate-600">
          {enrollmentsError ? "Enrollment count unavailable" : `${counts.get(course.id) ?? 0} enrolled students`}
        </p>
        <Link className="mt-3 inline-block font-medium text-green-700 underline" href={`/instructor/courses/${course.id}`}>
          View assignments and submissions
        </Link>
      </li>)}</ul>}
  </section>;
}
