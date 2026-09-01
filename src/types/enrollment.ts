export type EnrollmentStatus = "active" | "completed" | "dropped";

export interface Enrollment {
  id: string;
  courseId: string;
  learnerId: string;
  status: EnrollmentStatus;
  progressPercent: number;
  createdAt: string;
}
