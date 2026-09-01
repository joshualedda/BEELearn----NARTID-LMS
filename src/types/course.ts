import type { CourseStatus } from "@/constants/course-status";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  status: CourseStatus;
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  contentUrl?: string;
  position: number;
  createdAt: string;
}
