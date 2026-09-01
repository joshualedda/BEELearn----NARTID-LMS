import { COURSE_STATUS, type CourseStatus } from "@/constants/course-status";

export interface CreateCourseInput {
  title: string;
  description: string;
  instructorId: string;
  status?: CourseStatus;
}

export function validateCreateCourseInput(input: CreateCourseInput): string[] {
  const errors: string[] = [];
  if (input.title.trim().length === 0) {
    errors.push("Title is required.");
  }
  if (input.title.length > 200) {
    errors.push("Title must be at most 200 characters.");
  }
  if (input.status && !Object.values(COURSE_STATUS).includes(input.status)) {
    errors.push("Status is invalid.");
  }
  return errors;
}
