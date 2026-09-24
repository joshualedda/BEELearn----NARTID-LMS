import { requireAuth } from "@/lib/auth";
export default async function LearnerLayout({ children }: { children: React.ReactNode }) {
  await requireAuth("learner");
  return children;
}
