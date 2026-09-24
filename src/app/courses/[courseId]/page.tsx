import { CourseDetails } from "@/components/features/courses/CourseDetails";
export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <CourseDetails courseId={courseId} />;
}
