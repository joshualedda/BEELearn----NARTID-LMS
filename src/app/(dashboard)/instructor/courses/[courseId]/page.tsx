export default async function InstructorCourseEditorPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <h1 className="text-2xl font-bold">Course editor: {courseId}</h1>;
}
