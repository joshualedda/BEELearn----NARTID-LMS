"use client";

import { useEffect } from "react";
import { startSession, updateSession } from "@/app/courses/lms-actions";

export function AttendanceTracker({ courseId }: { courseId: string }) {
  useEffect(() => {
    const sessionId = crypto.randomUUID();
    let active = true;
    let started = false;
    let elapsed = 0;
    let visibleSince = document.visibilityState === "visible" ? performance.now() : null;
    const duration = () => Math.floor((elapsed + (visibleSince === null ? 0 : performance.now() - visibleSince)) / 1000);
    const flush = (leaving = false) => {
      if (!started) return;
      const seconds = duration();
      if (leaving) {
        fetch("/api/attendance", {
          method: "POST", credentials: "same-origin", keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, duration: seconds }),
        }).catch(() => {});
      } else void updateSession(sessionId, seconds);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && visibleSince !== null) {
        elapsed += performance.now() - visibleSince;
        visibleSince = null;
        flush();
      } else if (document.visibilityState === "visible" && visibleSince === null) visibleSince = performance.now();
    };
    const onPageHide = () => flush(true);
    void startSession(sessionId, courseId).then((ok) => {
      started = ok;
      if (!active && ok) flush(true);
    }).catch(() => {});
    const interval = window.setInterval(() => flush(), 60000);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      flush(true);
    };
  }, [courseId]);
  return null;
}
