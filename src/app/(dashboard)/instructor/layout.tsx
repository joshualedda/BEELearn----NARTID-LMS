import { requireAuth } from "@/lib/auth";
export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  await requireAuth("instructor");
  return children;
}
