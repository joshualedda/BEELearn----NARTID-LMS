import { getCourses } from "@/lib/courses";
import { CourseGrid } from "@/components/features/courses/CourseGrid";

export default async function CoursesPage() {
  const { courses, error } = await getCourses();
  return <>
    <h1 className="mb-3 text-3xl font-bold text-[#0D2B52]">Beekeeping courses</h1>
    <p className="mb-8 text-slate-600">Explore practical courses from NARTDI.</p>
    {error ? <p role="alert">{error}</p> : courses.length ? <CourseGrid courses={courses} /> : <p>No courses are available yet. Please check back soon.</p>}
  </>;
}
