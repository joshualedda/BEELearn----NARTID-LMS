"use client";

import { useState, type FormEvent } from "react";
import { saveSubmission } from "@/app/courses/lms-actions";
import { Button } from "@/components/ui/button";

export function SubmissionForm({ assignmentId, initialContent }: { assignmentId: string; initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const result = await saveSubmission(assignmentId, content);
    setMessage(result.message);
    setPending(false);
  }
  return <form onSubmit={submit} className="mt-3 space-y-2">
    <label className="block text-sm font-medium" htmlFor={`response-${assignmentId}`}>Your response</label>
    <textarea id={`response-${assignmentId}`} className="w-full rounded-md border p-3" rows={4} maxLength={10000}
      required value={content} onChange={(event) => setContent(event.target.value)} />
    <Button type="submit" disabled={pending}>{pending ? "Saving…" : initialContent ? "Update response" : "Submit response"}</Button>
    {message && <p role="status" className="text-sm">{message}</p>}
  </form>;
}
