import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getLoginDestination } from "@/utils/permissions";

export default async function CompleteAuthPage({ searchParams }: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { role } = await requireAuth();
  const { next } = await searchParams;
  redirect(getLoginDestination(role!, next));
}
