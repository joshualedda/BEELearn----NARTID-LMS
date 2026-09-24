"use server";

import { revalidatePath } from "next/cache";
import { getAuth } from "@/lib/auth";
import { isCourseId } from "@/lib/courses";
import type { EnrollmentResult } from "@/types/enrollment-result";

export async function enrollInCourse(courseId: string): Promise<EnrollmentResult> {
  if (!isCourseId(courseId)) return { kind: "error", message: "This course is invalid." };
  try {
    const { supabase, user, role } = await getAuth();
    if (!user) return { kind: "login" };
    if (role !== "learner") return { kind: "error", message: "Only student accounts can enroll in courses." };
    const { data: course, error: courseError } = await supabase.from("courses").select("id").eq("id", courseId).maybeSingle();
    if (courseError || !course) return { kind: "error", message: "This course is not available for enrollment." };
    const { data: existing, error: lookupError } = await supabase.from("enrollments").select("status").eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
    if (lookupError) return { kind: "error", message: "We couldn't check your enrollment. Please try again." };
    if (existing) return { kind: "enrolled", status: existing.status };
    const { error } = await supabase.from("enrollments").insert({ user_id: user.id, course_id: courseId, status: "active" });
    if (error) {
      // A unique (user_id, course_id) constraint handles concurrent submissions.
      if (error.code === "23505") {
        const { data: concurrent, error: concurrentError } = await supabase.from("enrollments").select("status").eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
        if (!concurrentError && concurrent) return { kind: "enrolled", status: concurrent.status };
      }
      return { kind: "error", message: "We couldn't enroll you. Please try again or contact your administrator." };
    }
    revalidatePath(`/courses/${courseId}`);
    revalidatePath(`/learner/courses/${courseId}`);
    revalidatePath("/learner/courses");
    return { kind: "enrolled", status: "active" };
  } catch {
    return { kind: "error", message: "Unable to connect. Please try again." };
  }
}
