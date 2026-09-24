import { requireAuth } from "@/lib/auth";
import CoursesPage from "@/app/courses/page";

export default async function LearnerCoursesPage() {
  await requireAuth("learner");
  return <CoursesPage />;
}
