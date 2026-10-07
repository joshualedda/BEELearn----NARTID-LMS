export type ReportRange = "7d" | "30d" | "3m" | "year";
export type EnrollmentStatus = "Active" | "Completed";

interface CourseDefinition {
  id: string;
  title: string;
  instructor: string;
  status: EnrollmentStatus;
}

interface CourseMetrics {
  id: string;
  students: number;
  averageGrade: number;
  completionRate: number;
}

interface ReportSnapshot {
  overview: { students: number; courses: number; enrollments: number; completionRate: number };
  academic: { averageGrade: number; submissionRate: number; averageQuizScore: number; lateSubmissions: number };
  engagement: { activeStudents: number; inactiveStudents: number; sessionMinutes: number; courseVisits: number };
  courseMetrics: readonly CourseMetrics[];
}

export type ReportCourse = CourseDefinition & Omit<CourseMetrics, "id">;

// Preview records only. Replace these snapshots with a report query when the backend is ready.
export const reportCourses: readonly CourseDefinition[] = [
  { id: "intro", title: "Introduction to Beekeeping", instructor: "Juan Dela Cruz", status: "Active" },
  { id: "hive", title: "Hive Management", instructor: "Maria Santos", status: "Active" },
  { id: "honey", title: "Honey Production", instructor: "Pedro Reyes", status: "Active" },
  { id: "queen", title: "Queen Rearing", instructor: "Juan Dela Cruz", status: "Completed" },
];

export const reportRangeOptions: readonly { value: ReportRange; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "3m", label: "Last 3 Months" },
  { value: "year", label: "This Year" },
];

export const reportSnapshots: Record<ReportRange, ReportSnapshot> = {
  "7d": {
    overview: { students: 156, courses: 12, enrollments: 24, completionRate: 75 },
    academic: { averageGrade: 83, submissionRate: 87, averageQuizScore: 81, lateSubmissions: 4 },
    engagement: { activeStudents: 108, inactiveStudents: 48, sessionMinutes: 31, courseVisits: 296 },
    courseMetrics: [
      { id: "intro", students: 9, averageGrade: 85, completionRate: 88 },
      { id: "hive", students: 7, averageGrade: 80, completionRate: 81 },
      { id: "honey", students: 5, averageGrade: 87, completionRate: 86 },
      { id: "queen", students: 3, averageGrade: 78, completionRate: 73 },
    ],
  },
  "30d": {
    overview: { students: 156, courses: 12, enrollments: 284, completionRate: 78 },
    academic: { averageGrade: 84, submissionRate: 89, averageQuizScore: 82, lateSubmissions: 17 },
    engagement: { activeStudents: 132, inactiveStudents: 24, sessionMinutes: 34, courseVisits: 1248 },
    courseMetrics: [
      { id: "intro", students: 42, averageGrade: 86, completionRate: 91 },
      { id: "hive", students: 36, averageGrade: 81, completionRate: 84 },
      { id: "honey", students: 29, averageGrade: 88, completionRate: 89 },
      { id: "queen", students: 24, averageGrade: 79, completionRate: 76 },
    ],
  },
  "3m": {
    overview: { students: 156, courses: 12, enrollments: 371, completionRate: 76 },
    academic: { averageGrade: 82, submissionRate: 86, averageQuizScore: 80, lateSubmissions: 38 },
    engagement: { activeStudents: 141, inactiveStudents: 15, sessionMinutes: 33, courseVisits: 3760 },
    courseMetrics: [
      { id: "intro", students: 58, averageGrade: 84, completionRate: 88 },
      { id: "hive", students: 49, averageGrade: 80, completionRate: 82 },
      { id: "honey", students: 41, averageGrade: 86, completionRate: 87 },
      { id: "queen", students: 33, averageGrade: 78, completionRate: 74 },
    ],
  },
  year: {
    overview: { students: 156, courses: 12, enrollments: 492, completionRate: 74 },
    academic: { averageGrade: 81, submissionRate: 84, averageQuizScore: 79, lateSubmissions: 64 },
    engagement: { activeStudents: 148, inactiveStudents: 8, sessionMinutes: 32, courseVisits: 10984 },
    courseMetrics: [
      { id: "intro", students: 76, averageGrade: 83, completionRate: 86 },
      { id: "hive", students: 64, averageGrade: 79, completionRate: 79 },
      { id: "honey", students: 52, averageGrade: 85, completionRate: 85 },
      { id: "queen", students: 47, averageGrade: 77, completionRate: 72 },
    ],
  },
};

export function getReportCourses(range: ReportRange): ReportCourse[] {
  const metricsById = new Map(reportSnapshots[range].courseMetrics.map((metrics) => [metrics.id, metrics]));
  return reportCourses.flatMap((course) => {
    const metrics = metricsById.get(course.id);
    return metrics ? [{ ...course, students: metrics.students, averageGrade: metrics.averageGrade, completionRate: metrics.completionRate }] : [];
  });
}

export function filterReportCourses(courses: readonly ReportCourse[], courseId: string, instructor: string) {
  return courses.filter((course) =>
    (courseId === "all" || course.id === courseId) &&
    (instructor === "all" || course.instructor === instructor)
  );
}
