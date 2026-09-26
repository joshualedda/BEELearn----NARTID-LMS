import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { isCourseId } from "@/lib/courses";
import { AssignmentForm } from "@/components/features/courses/AssignmentForm";
import { QuizBuilder } from "@/components/features/courses/QuizBuilder";
import { LocalDateTime } from "@/components/features/courses/LocalDateTime";

export default async function InstructorCourseEditorPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const { supabase, user } = await requireAuth("instructor");
  if (!isCourseId(courseId)) notFound();
  const { data: course, error: courseError } = await supabase.from("courses").select("id,title")
    .eq("id", courseId).eq("instructor_id", user!.id).maybeSingle();
  if (courseError) return <p role="alert">Course unavailable. Please try again.</p>;
  if (!course) notFound();
  const [assignmentsResult, quizzesResult] = await Promise.all([
    supabase.from("assignments").select("id,title,due_date").eq("course_id", courseId).order("due_date"),
    supabase.from("quizzes").select("id,title,created_at").eq("course_id", courseId).order("created_at"),
  ]);
  const assignmentIds = assignmentsResult.data?.map((item) => item.id) ?? [];
  const submissionsResult = assignmentIds.length
    ? await supabase.from("submissions").select("id,assignment_id,user_id,content,submitted_at,is_late,score")
      .in("assignment_id", assignmentIds).order("submitted_at", { ascending: false })
    : { data: [], error: null };
  return <main className="mx-auto max-w-4xl space-y-8">
    <Link className="underline" href="/instructor/courses">← My courses</Link>
    <h1 className="text-3xl font-bold text-[#0D2B52]">{course.title}</h1>
    <AssignmentForm courseId={courseId} />
    <section>
      <h2 className="mb-3 text-2xl font-semibold">Assignments and submissions</h2>
      {assignmentsResult.error || submissionsResult.error ? <p role="alert">Assignments are temporarily unavailable.</p>
        : !assignmentsResult.data?.length ? <p>No assignments yet.</p>
        : <ul className="space-y-5">{assignmentsResult.data.map((assignment) => {
          const submissions = submissionsResult.data?.filter((item) => item.assignment_id === assignment.id) ?? [];
          return <li key={assignment.id} className="rounded-xl border bg-white p-5">
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p className="text-sm text-slate-600">Due <LocalDateTime value={assignment.due_date} /> · {submissions.length} submissions</p>
            {submissions.length > 0 && <ul className="mt-3 space-y-3">{submissions.map((submission) => <li key={submission.id} className="rounded border p-3">
              <p className="text-sm">Student {submission.user_id} · <LocalDateTime value={submission.submitted_at} /> · {submission.is_late ? "Late" : "On time"}</p>
              <p className="mt-2 whitespace-pre-wrap">{submission.content}</p>
            </li>)}</ul>}
          </li>;
        })}</ul>}
    </section>
    <QuizBuilder courseId={courseId} />
    <section>
      <h2 className="mb-3 text-2xl font-semibold">Quizzes</h2>
      {quizzesResult.error ? <p role="alert">Quizzes are temporarily unavailable.</p>
        : !quizzesResult.data?.length ? <p>No quizzes yet.</p>
        : <ul className="space-y-2">{quizzesResult.data.map((quiz) => <li key={quiz.id} className="rounded border bg-white p-3">{quiz.title}</li>)}</ul>}
    </section>
  </main>;
}
