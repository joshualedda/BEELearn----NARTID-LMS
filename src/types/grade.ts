export interface Grade {
  id: string;
  learnerId: string;
  courseId: string;
  assignmentId?: string;
  quizId?: string;
  score: number;
  gradedAt: string;
}
