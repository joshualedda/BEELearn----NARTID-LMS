"use client";

import { useState, type FormEvent } from "react";
import { submitQuiz } from "@/app/courses/lms-actions";
import { Button } from "@/components/ui/button";
import type { CourseQuiz } from "@/types/lms";

export function QuizForm({ quiz }: { quiz: CourseQuiz }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const result = await submitQuiz(quiz.id, answers);
    setMessage(result.message);
    setPending(false);
  }
  return <form onSubmit={submit} className="space-y-5">
    {quiz.questions.map((question, index) => <fieldset key={question.id} className="space-y-2">
      <legend className="font-medium">{index + 1}. {question.prompt}</legend>
      {question.options.map((option) => <label key={option.id} className="flex gap-2">
        <input type="radio" name={`quiz-${quiz.id}-${question.id}`} required checked={answers[question.id] === option.id}
          onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))} />
        <span>{option.text}</span>
      </label>)}
    </fieldset>)}
    <Button type="submit" disabled={pending}>{pending ? "Grading…" : "Submit quiz"}</Button>
    {message && <p role="status">{message}</p>}
  </form>;
}
