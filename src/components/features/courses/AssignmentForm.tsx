"use client";

import { useState, type FormEvent } from "react";
import { createAssignment } from "@/app/courses/lms-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AssignmentForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const parsedDate = new Date(dueDate);
    if (!Number.isFinite(parsedDate.getTime())) {
      setMessage("Enter a valid due date.");
      setPending(false);
      return;
    }
    const result = await createAssignment(courseId, title, parsedDate.toISOString());
    setMessage(result.message);
    if (result.ok) { setTitle(""); setDueDate(""); }
    setPending(false);
  }
  return <form onSubmit={submit} className="space-y-3 rounded-xl border bg-white p-5">
    <h2 className="text-xl font-semibold">Create assignment</h2>
    <label className="block text-sm font-medium" htmlFor="assignment-title">Title</label>
    <Input id="assignment-title" required maxLength={200} value={title} onChange={(event) => setTitle(event.target.value)} />
    <label className="block text-sm font-medium" htmlFor="assignment-due">Due date</label>
    <Input id="assignment-due" type="datetime-local" required value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
    <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Create assignment"}</Button>
    {message && <p role="status">{message}</p>}
  </form>;
}
