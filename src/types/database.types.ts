export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Application schema for the verified columns used by this integration.
// Replace with generated project types when schema-management access is available.
export type ProfileRow = {
  id: string;
  full_name: string | null;
  role: string;
  created_at: string;
};

export type CourseRow = {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string | null;
  created_at: string;
};

export type EnrollmentRow = {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
};

export type AttendanceRow = { id: string; user_id: string; course_id: string; login_timestamp: string; session_duration: number };
export type AssignmentRow = { id: string; course_id: string; title: string; due_date: string };
export type SubmissionRow = { id: string; assignment_id: string; user_id: string; submitted_at: string; score: number | null; is_late: boolean; content: string | null };
export type QuizRow = { id: string; course_id: string; title: string; questions: Json; created_at: string };
export type QuizResultRow = { id: string; user_id: string; course_id: string; quiz_id: string; score: number; attempt_date: string };

type Table<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      profiles: Table<ProfileRow, Pick<ProfileRow, "id"> & Partial<Omit<ProfileRow, "id">>>;
      courses: Table<CourseRow, Pick<CourseRow, "title"> & Partial<Omit<CourseRow, "title">>>;
      enrollments: Table<EnrollmentRow, Pick<EnrollmentRow, "user_id" | "course_id" | "status"> & Partial<Pick<EnrollmentRow, "id" | "enrolled_at">>>;
      attendance_logs: Table<AttendanceRow, Pick<AttendanceRow, "id" | "user_id" | "course_id" | "login_timestamp" | "session_duration">>;
      assignments: Table<AssignmentRow, Pick<AssignmentRow, "course_id" | "title" | "due_date"> & Partial<Pick<AssignmentRow, "id">>>;
      submissions: Table<SubmissionRow, Pick<SubmissionRow, "assignment_id" | "user_id" | "content"> & Partial<Pick<SubmissionRow, "id" | "submitted_at" | "score" | "is_late">>>;
      quizzes: Table<QuizRow, Pick<QuizRow, "course_id" | "title" | "questions"> & Partial<Pick<QuizRow, "id" | "created_at">>>;
      quiz_results: Table<QuizResultRow, Pick<QuizResultRow, "user_id" | "course_id" | "quiz_id" | "score"> & Partial<Pick<QuizResultRow, "id" | "attempt_date">>>;
    };
    Views: Record<string, never>;
    Functions: {
      start_course_session: { Args: { p_session_id: string; p_course_id: string }; Returns: boolean };
      update_course_session: { Args: { p_session_id: string; p_duration: number }; Returns: undefined };
      course_quizzes_for_learner: { Args: { p_course_id: string }; Returns: { id: string; title: string; questions: Json }[] };
      submit_quiz_attempt: { Args: { p_quiz_id: string; p_answers: Json }; Returns: number };
      instructor_enrollment_counts: { Args: Record<string, never>; Returns: { course_id: string; student_count: number }[] };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
