export interface CreateAssignmentInput {
  courseId: string;
  title: string;
  instructions: string;
  dueAt?: string;
  maxScore: number;
}

export function validateCreateAssignmentInput(
  input: CreateAssignmentInput
): string[] {
  const errors: string[] = [];
  if (input.title.trim().length === 0) {
    errors.push("Title is required.");
  }
  if (input.maxScore <= 0) {
    errors.push("Max score must be greater than zero.");
  }
  if (input.dueAt && Number.isNaN(new Date(input.dueAt).getTime())) {
    errors.push("Due date is invalid.");
  }
  return errors;
}
