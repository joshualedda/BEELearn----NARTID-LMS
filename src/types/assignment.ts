export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  dueAt?: string;
  maxScore: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  learnerId: string;
  fileUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
}
