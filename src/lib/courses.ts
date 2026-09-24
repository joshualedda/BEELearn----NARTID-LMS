import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { CourseRow } from "@/types/database.types";

const columns = "id,title,description,instructor_id,created_at";

export async function getCourses(limit?: number): Promise<{ courses: CourseRow[]; error: string | null }> {
  try {
    const supabase = await createClient();
    let query = supabase.from("courses").select(columns).order("created_at", { ascending: false }).order("id");
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) return { courses: [], error: "Courses are temporarily unavailable. Please try again later." };
    return { courses: data ?? [], error: null };
  } catch {
    return { courses: [], error: "Courses are temporarily unavailable. Please try again later." };
  }
}

export function isCourseId(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function getCourse(id: string) {
  if (!isCourseId(id)) return { course: null, error: null };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select(columns).eq("id", id).maybeSingle();
    return { course: data, error: error ? "We couldn't load this course. Please try again." : null };
  } catch {
    return { course: null, error: "We couldn't load this course. Please try again." };
  }
}
