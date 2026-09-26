import { createClient } from "@/lib/supabase/server";
import { AttendanceTracker } from "./AttendanceTracker";
import { SubmissionForm } from "./SubmissionForm";
import { QuizForm } from "./QuizForm";
import { LocalDateTime } from "./LocalDateTime";
import type { CourseQuiz, QuizQuestion } from "@/types/lms";

function isPublicQuestion(value: unknown): value is QuizQuestion {
  return !!value && typeof value === "object" && "id" in value && typeof value.id === "string" &&
    "prompt" in value && typeof value.prompt === "string" && "options" in value && Array.isArray(value.options) &&
    value.options.every((option: unknown) => !!option && typeof option === "object" &&
      "id" in option && typeof option.id === "string" && "text" in option && typeof option.text === "string");
}

export async function CourseLearning({ courseId, userId }: { courseId: string; userId: string }) {
  const supabase = await createClient();
  const [assignmentsResult, quizzesResult, resultsResult] = await Promise.all([
    supabase.from("assignments").select("id,title,due_date").eq("course_id", courseId).order("due_date"),
    supabase.rpc("course_quizzes_for_learner", { p_course_id: courseId }),
    supabase.from("quiz_results").select("quiz_id,score,attempt_date").eq("course_id", courseId)
      .eq("user_id", userId).order("attempt_date", { ascending: false }),
  ]);
  const assignmentIds = assignmentsResult.data?.map((item) => item.id) ?? [];
  const submissionsResult = assignmentIds.length
    ? await supabase.from("submissions").select("assignment_id,content,submitted_at,is_late")
      .eq("user_id", userId).in("assignment_id", assignmentIds)
    : { data: [], error: null };
  const submissions = new Map(submissionsResult.data?.map((item) => [item.assignment_id, item]));
  const quizzes: CourseQuiz[] = (quizzesResult.data ?? []).flatMap((quiz) =>
    Array.isArray(quiz.questions) && quiz.questions.every(isPublicQuestion)
      ? [{ id: quiz.id, title: quiz.title, questions: quiz.questions }] : []);
  const latestScores = new Map<string, number>();
  for (const result of resultsResult.data ?? []) if (!latestScores.has(result.quiz_id)) latestScores.set(result.quiz_id, result.score);

  return <section className="mx-auto mt-8 max-w-3xl space-y-8">
    <AttendanceTracker courseId={courseId} />
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Assignments</h2>
      {assignmentsResult.error || submissionsResult.error ? <p role="alert">Assignments are temporarily unavailable.</p>
        : !assignmentsResult.data?.length ? <p>No assignments yet.</p>
        : <ul className="space-y-5">{assignmentsResult.data.map((assignment) => {
          const submission = submissions.get(assignment.id);
          return <li key={assignment.id} className="rounded-xl border bg-white p-5">
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p className="text-sm text-slate-600">Due <LocalDateTime value={assignment.due_date} /></p>
            {submission && <p className="mt-2 text-sm">Submitted <LocalDateTime value={submission.submitted_at} /> · {submission.is_late ? "Late" : "On time"}</p>}
            <SubmissionForm assignmentId={assignment.id} initialContent={submission?.content ?? ""} />
          </li>;
        })}</ul>}
    </div>
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Quizzes</h2>
      {quizzesResult.error || resultsResult.error ? <p role="alert">Quizzes are temporarily unavailable.</p>
        : !quizzes.length ? <p>No quizzes yet.</p>
        : <ul className="space-y-5">{quizzes.map((quiz) => <li key={quiz.id} className="rounded-xl border bg-white p-5">
          <h3 className="mb-2 text-lg font-semibold">{quiz.title}</h3>
          {latestScores.has(quiz.id) && <p className="mb-3 text-sm">Latest score: {latestScores.get(quiz.id)}%</p>}
          <QuizForm quiz={quiz} />
        </li>)}</ul>}
    </div>
  </section>;
}
