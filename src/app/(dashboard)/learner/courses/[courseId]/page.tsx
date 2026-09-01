export default async function LearnerCourseViewerPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <h1 className="text-2xl font-bold">Course: {courseId}</h1>;
}
