"use client";

import { useState, type FormEvent } from "react";
import { createQuiz } from "@/app/courses/lms-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QuizQuestionWithAnswer } from "@/types/lms";

function blankQuestion(): QuizQuestionWithAnswer {
  const options = Array.from({ length: 4 }, () => ({ id: crypto.randomUUID(), text: "" }));
  return { id: crypto.randomUUID(), prompt: "", options, correctOptionId: options[0].id };
}

export function QuizBuilder({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestionWithAnswer[]>([]);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  function editQuestion(index: number, change: Partial<QuizQuestionWithAnswer>) {
    setQuestions((current) => current.map((question, at) => at === index ? { ...question, ...change } : question));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const result = await createQuiz(courseId, title, questions);
    setMessage(result.message);
    if (result.ok) { setTitle(""); setQuestions([]); }
    setPending(false);
  }
  return <form onSubmit={submit} className="space-y-4 rounded-xl border bg-white p-5">
    <h2 className="text-xl font-semibold">Create quiz</h2>
    <label className="block text-sm font-medium" htmlFor="quiz-title">Title</label>
    <Input id="quiz-title" required maxLength={200} value={title} onChange={(event) => setTitle(event.target.value)} />
    {questions.map((question, index) => <fieldset key={question.id} className="space-y-2 rounded-lg border p-4">
      <legend className="font-medium">Question {index + 1}</legend>
      <label className="block text-sm" htmlFor={`prompt-${question.id}`}>Question</label>
      <Input id={`prompt-${question.id}`} required maxLength={500} value={question.prompt}
        onChange={(event) => editQuestion(index, { prompt: event.target.value })} />
      {question.options.map((option, optionIndex) => <div key={option.id} className="flex items-center gap-2">
        <input type="radio" name={`correct-${question.id}`} aria-label={`Option ${optionIndex + 1} is correct`}
          checked={question.correctOptionId === option.id} onChange={() => editQuestion(index, { correctOptionId: option.id })} />
        <Input aria-label={`Option ${optionIndex + 1}`} required maxLength={200} value={option.text}
          onChange={(event) => editQuestion(index, { options: question.options.map((item) =>
            item.id === option.id ? { ...item, text: event.target.value } : item) })} />
      </div>)}
      <Button type="button" variant="outline" onClick={() => setQuestions((current) => current.filter((item) => item.id !== question.id))}>Remove question</Button>
    </fieldset>)}
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" disabled={questions.length >= 20} onClick={() => setQuestions((current) => [...current, blankQuestion()])}>Add question</Button>
      <Button type="submit" disabled={pending || questions.length === 0}>{pending ? "Creating…" : "Create quiz"}</Button>
    </div>
    {message && <p role="status">{message}</p>}
  </form>;
}
