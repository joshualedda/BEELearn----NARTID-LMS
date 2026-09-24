"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/app/courses/actions";

export function EnrollButton({ courseId, initialStatus, signedIn, canEnroll, unavailable }: {
  courseId: string; initialStatus: string | null; signedIn: boolean; canEnroll: boolean; unavailable?: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  function login() { router.push(`/login?next=${encodeURIComponent(`/courses/${courseId}`)}`); }
  async function enroll() {
    if (pending) return;
    if (!signedIn) { login(); return; }
    setPending(true);
    setError("");
    try {
      const result = await enrollInCourse(courseId);
      if (result.kind === "login") login();
      else if (result.kind === "error") setError(result.message);
      else { setStatus(result.status); router.refresh(); }
    } catch { setError("Unable to connect. Please try again."); }
    finally { setPending(false); }
  }
  if (unavailable) return <p role="alert">We couldn&apos;t check your enrollment. Refresh the page to try again.</p>;
  if (status) return <p role="status" className="rounded-lg bg-green-50 p-4 font-semibold text-green-800">
    {status === "active" ? "Enrolled ✓" : status === "completed" ? "Course completed ✓" : "An enrollment already exists. Contact your administrator to re-enroll."}
  </p>;
  if (signedIn && !canEnroll) return <p className="text-sm text-slate-600">Enrollment is available to student accounts.</p>;
  return <div className="space-y-3">
    <Button onClick={enroll} disabled={pending}>{pending ? "Enrolling…" : signedIn ? "Enroll in this course" : "Sign in to enroll"}</Button>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
  </div>;
}
