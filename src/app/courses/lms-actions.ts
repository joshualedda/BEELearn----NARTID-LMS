"use server";

import { revalidatePath } from "next/cache";
import { getAuth } from "@/lib/auth";
import { isCourseId } from "@/lib/courses";
import type { Json } from "@/types/database.types";
import type { LmsActionResult, QuizQuestionWithAnswer } from "@/types/lms";

const fail = (message: string): LmsActionResult => ({ ok: false, message });
const success = (message: string, score?: number): LmsActionResult => ({ ok: true, message, score });

async function learnerForCourse(courseId: string) {
  if (!isCourseId(courseId)) return null;
  const auth = await getAuth();
  if (!auth.user || auth.role !== "learner") return null;
  const { data, error } = await auth.supabase.from("enrollments").select("id")
    .eq("course_id", courseId).eq("user_id", auth.user.id).eq("status", "active").maybeSingle();
  return error || !data ? null : auth;
}

async function ownerForCourse(courseId: string) {
  if (!isCourseId(courseId)) return null;
  const auth = await getAuth();
  if (!auth.user || auth.role !== "instructor") return null;
  const { data, error } = await auth.supabase.from("courses").select("id")
    .eq("id", courseId).eq("instructor_id", auth.user.id).maybeSingle();
  return error || !data ? null : auth;
}

export async function createAssignment(courseId: string, title: string, dueDate: string): Promise<LmsActionResult> {
  const auth = await ownerForCourse(courseId);
  if (!auth) return fail("You cannot create assignments for this course.");
  const cleanTitle = title.trim();
  const date = new Date(dueDate);
  if (!cleanTitle || cleanTitle.length > 200 || !Number.isFinite(date.getTime()) || date.getTime() <= Date.now())
    return fail("Enter a title and a future due date.");
  const { error } = await auth.supabase.from("assignments").insert({ course_id: courseId, title: cleanTitle, due_date: date.toISOString() });
  if (error) return fail("We couldn't create the assignment. Please try again.");
  revalidatePath(`/instructor/courses/${courseId}`);
  revalidatePath(`/learner/courses/${courseId}`);
  return success("Assignment created.");
}

export async function saveSubmission(assignmentId: string, content: string): Promise<LmsActionResult> {
  if (!isCourseId(assignmentId)) return fail("Invalid assignment.");
  const cleanContent = content.trim();
  if (!cleanContent || cleanContent.length > 10000) return fail("Enter a response of at most 10,000 characters.");
  const auth = await getAuth();
  if (!auth.user || auth.role !== "learner") return fail("Sign in as a student to submit work.");
  const { data: assignment, error: assignmentError } = await auth.supabase.from("assignments").select("course_id").eq("id", assignmentId).maybeSingle();
  if (assignmentError || !assignment) return fail("Assignment unavailable.");
  const learner = await learnerForCourse(assignment.course_id);
  if (!learner) return fail("Active enrollment is required.");
  const { data: existing, error: lookupError } = await auth.supabase.from("submissions").select("id")
    .eq("assignment_id", assignmentId).eq("user_id", auth.user.id).maybeSingle();
  if (lookupError) return fail("We couldn't check your response. Please try again.");
  let { error } = existing
    ? await auth.supabase.from("submissions").update({ content: cleanContent }).eq("id", existing.id).eq("user_id", auth.user.id)
    : await auth.supabase.from("submissions").insert({ assignment_id: assignmentId, user_id: auth.user.id, content: cleanContent });
  if (error?.code === "23505" && !existing) {
    ({ error } = await auth.supabase.from("submissions").update({ content: cleanContent })
      .eq("assignment_id", assignmentId).eq("user_id", auth.user.id));
  }
  if (error) return fail("We couldn't save your response. Please try again.");
  revalidatePath(`/learner/courses/${assignment.course_id}`);
  revalidatePath(`/instructor/courses/${assignment.course_id}`);
  return success("Response saved.");
}

function validQuestions(value: unknown): value is QuizQuestionWithAnswer[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > 20) return false;
  const ids = new Set<string>();
  for (const question of value) {
    if (!question || typeof question !== "object" || typeof question.id !== "string" ||
      !isCourseId(question.id) || ids.has(question.id) || typeof question.prompt !== "string" ||
      !question.prompt.trim() || question.prompt.length > 500 || !Array.isArray(question.options) ||
      question.options.length !== 4 || typeof question.correctOptionId !== "string") return false;
    ids.add(question.id);
    const optionIds = new Set<string>();
    for (const option of question.options) {
      if (!option || typeof option.id !== "string" || !isCourseId(option.id) || optionIds.has(option.id) ||
        typeof option.text !== "string" || !option.text.trim() || option.text.length > 200) return false;
      optionIds.add(option.id);
    }
    if (!optionIds.has(question.correctOptionId)) return false;
  }
  return true;
}

export async function createQuiz(courseId: string, title: string, questions: unknown): Promise<LmsActionResult> {
  const auth = await ownerForCourse(courseId);
  if (!auth) return fail("You cannot create quizzes for this course.");
  const cleanTitle = title.trim();
  if (!cleanTitle || cleanTitle.length > 200 || !validQuestions(questions)) return fail("Provide a title and 1–20 complete questions with four options each.");
  const normalized = questions.map((q) => ({
    id: q.id, prompt: q.prompt.trim(), correctOptionId: q.correctOptionId,
    options: q.options.map((o) => ({ id: o.id, text: o.text.trim() })),
  }));
  const { error } = await auth.supabase.from("quizzes").insert({ course_id: courseId, title: cleanTitle, questions: normalized });
  if (error) return fail("We couldn't create the quiz. Please try again.");
  revalidatePath(`/instructor/courses/${courseId}`);
  revalidatePath(`/learner/courses/${courseId}`);
  return success("Quiz created.");
}

export async function submitQuiz(quizId: string, answers: Record<string, string>): Promise<LmsActionResult> {
  if (!isCourseId(quizId) || !answers || typeof answers !== "object" || Array.isArray(answers) ||
    Object.keys(answers).length > 20 || Object.values(answers).some((value) => typeof value !== "string" || !isCourseId(value)))
    return fail("Answer every question before submitting.");
  const { user, role, supabase } = await getAuth();
  if (!user || role !== "learner") return fail("Sign in as a student to take this quiz.");
  const { data, error } = await supabase.rpc("submit_quiz_attempt", { p_quiz_id: quizId, p_answers: answers as Json });
  if (error || data === null) return fail("We couldn't grade this attempt. Check your answers and try again.");
  return success(`Score: ${data}%`, Number(data));
}

export async function startSession(sessionId: string, courseId: string): Promise<boolean> {
  if (!isCourseId(sessionId)) return false;
  const auth = await learnerForCourse(courseId);
  if (!auth) return false;
  const { data, error } = await auth.supabase.rpc("start_course_session", { p_session_id: sessionId, p_course_id: courseId });
  return !error && data === true;
}

export async function updateSession(sessionId: string, duration: number): Promise<void> {
  if (!isCourseId(sessionId) || !Number.isInteger(duration) || duration < 0) return;
  const { user, role, supabase } = await getAuth();
  if (!user || role !== "learner") return;
  await supabase.rpc("update_course_session", { p_session_id: sessionId, p_duration: duration });
}
