export type SampleCourseStatus = "Published" | "Draft" | "Archived";

export interface SampleCourse {
  id: string;
  title: string;
  instructor: string;
  learners: number;
  lessons: number;
  status: SampleCourseStatus;
}

// Illustrative records for the admin directory; these are not database courses.
export const sampleCourses: readonly SampleCourse[] = [
  { id: "sample-course-1", title: "Introduction to Web Development", instructor: "Elena Torres", learners: 186, lessons: 18, status: "Published" },
  { id: "sample-course-2", title: "Digital Marketing Essentials", instructor: "Daniel Cruz", learners: 154, lessons: 14, status: "Published" },
  { id: "sample-course-3", title: "Data Analysis Fundamentals", instructor: "Rafael Lim", learners: 126, lessons: 21, status: "Published" },
  { id: "sample-course-4", title: "Project Management Basics", instructor: "Jose Navarro", learners: 110, lessons: 12, status: "Published" },
  { id: "sample-course-5", title: "Design Thinking Workshop", instructor: "Maya Villanueva", learners: 0, lessons: 8, status: "Draft" },
  { id: "sample-course-6", title: "Learning Experience Design", instructor: "Nina Mercado", learners: 73, lessons: 10, status: "Archived" },
  { id: "sample-course-7", title: "Applied Research Methods", instructor: "Tessa Ramos", learners: 0, lessons: 6, status: "Draft" },
  { id: "sample-course-8", title: "Communication for Teams", instructor: "Andre Bautista", learners: 92, lessons: 11, status: "Archived" },
];

export const courseStatusOptions = [
  { value: "All", label: "All Status" },
  { value: "Published", label: "Published" },
  { value: "Draft", label: "Draft" },
  { value: "Archived", label: "Archived" },
];

export function filterSampleCourses(courses: readonly SampleCourse[], search: string, status: string) {
  const query = search.trim().toLowerCase();
  return courses.filter((course) =>
    (status === "All" || course.status === status) &&
    (!query || course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query))
  );
}

export function paginateCourses(courses: readonly SampleCourse[], requestedPage: number, pageSize = 5) {
  const totalPages = Math.ceil(courses.length / pageSize);
  const page = Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    rows: courses.slice(startIndex, startIndex + pageSize),
    start: courses.length ? startIndex + 1 : 0,
    end: Math.min(startIndex + pageSize, courses.length),
  };
}
