export type QuizOption = { id: string; text: string };
export type QuizQuestion = { id: string; prompt: string; options: QuizOption[] };
export type QuizQuestionWithAnswer = QuizQuestion & { correctOptionId: string };
export type CourseQuiz = { id: string; title: string; questions: QuizQuestion[] };
export type LmsActionResult = { ok: true; message: string; score?: number } | { ok: false; message: string };
