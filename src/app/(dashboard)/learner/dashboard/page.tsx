import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function LearnerDashboardPage() {
  const { supabase, user } = await requireAuth("learner");
  const { data: enrollments, error } = await supabase.from("enrollments")
    .select("course_id,status,enrolled_at").eq("user_id", user!.id).order("enrolled_at", { ascending: false });
  const ids = enrollments?.map((item) => item.course_id) ?? [];
  const { data: courses, error: courseError } = ids.length
    ? await supabase.from("courses").select("id,title,description").in("id", ids)
    : { data: [], error: null };
  const byId = new Map(courses?.map((course) => [course.id, course]));

  return <section id="my-courses" className="mx-auto max-w-4xl scroll-mt-24">
    <h1 className="mb-6 text-3xl font-bold text-[#0D2B52]">My courses</h1>
    {error || courseError ? <p role="alert">We couldn&apos;t load your courses. Please try again.</p>
      : !enrollments?.length ? <p>You haven&apos;t enrolled in any courses yet. <Link className="underline" href="/courses">Browse courses</Link>.</p>
      : <ul className="space-y-4">{enrollments.map((enrollment) => {
        const course = byId.get(enrollment.course_id);
        return <li key={enrollment.course_id} className="rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">{course?.title ?? "Course unavailable"}</h2>
          <p className="mt-1 text-sm text-slate-600">Enrollment status: {enrollment.status}</p>
          {course && <Link className="mt-3 inline-block font-medium text-green-700 underline" href={`/learner/courses/${course.id}`}>View course</Link>}
        </li>;
      })}</ul>}
  </section>;
}
