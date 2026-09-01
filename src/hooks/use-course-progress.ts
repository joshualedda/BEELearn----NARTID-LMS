"use client";

import { useMemo } from "react";

export function useCourseProgress(
  totalLessons: number,
  completedLessonIds: string[] = []
) {
  return useMemo(() => {
    const completed = new Set(completedLessonIds);
    const percent =
      totalLessons === 0
        ? 0
        : Math.round((completed.size / totalLessons) * 100);

    return {
      completedLessonIds: completed,
      completedCount: completed.size,
      totalLessons,
      percent,
    };
  }, [totalLessons, completedLessonIds]);
}
