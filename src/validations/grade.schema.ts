export interface SubmitGradeInput {
  learnerId: string;
  courseId: string;
  assignmentId?: string;
  quizId?: string;
  score: number;
  maxScore: number;
}

export function validateSubmitGradeInput(input: SubmitGradeInput): string[] {
  const errors: string[] = [];
  if (input.score < 0) {
    errors.push("Score cannot be negative.");
  }
  if (input.score > input.maxScore) {
    errors.push("Score cannot exceed max score.");
  }
  return errors;
}
