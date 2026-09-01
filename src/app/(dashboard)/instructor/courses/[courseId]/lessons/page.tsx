export default async function InstructorLessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <h1 className="text-2xl font-bold">Lessons: {courseId}</h1>;
}
