import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import { getAuth } from "@/lib/auth";
import { EnrollButton } from "@/components/features/enrollments/EnrollButton";

export async function CourseDetails({ courseId }: { courseId: string }) {
  const { course, error } = await getCourse(courseId);
  if (error) return <p role="alert">{error}</p>;
  if (!course) notFound();
  const { supabase, user, role } = await getAuth();
  let status: string | null = null;
  let unavailable = false;
  if (user && role === "learner") {
    const { data, error: enrollmentError } = await supabase.from("enrollments").select("status").eq("user_id", user.id).eq("course_id", course.id).maybeSingle();
    status = data?.status ?? null;
    unavailable = !!enrollmentError;
  }
  return <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
    <h1 className="text-3xl font-bold text-[#0D2B52]">{course.title}</h1>
    <p className="my-8 whitespace-pre-wrap leading-7 text-slate-600">{course.description || "More information about this course will be available soon."}</p>
    <EnrollButton key={`${course.id}:${status}:${user?.id}`} courseId={course.id} initialStatus={status} signedIn={!!user} canEnroll={role === "learner"} unavailable={unavailable} />
  </article>;
}
