import { CourseDetails } from "@/components/features/courses/CourseDetails";
import { requireAuth } from "@/lib/auth";

export default async function LearnerCourseViewerPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  await requireAuth("learner");
  return <CourseDetails courseId={courseId} />;
}
