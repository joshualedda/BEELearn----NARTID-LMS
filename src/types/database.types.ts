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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
