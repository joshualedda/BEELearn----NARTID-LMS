"use server";

import { getAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getLoginDestination } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

export async function getSignInDestination(next: string | null): Promise<{ url?: string; error?: string }> {
  try {
    const { user, role } = await getAuth();
    if (!user) return { error: "Your session could not be verified. Please sign in again." };
    revalidatePath("/", "layout");
    if (!role) return { url: "/auth/access-error" };
    return { url: getLoginDestination(role, typeof next === "string" ? next : null) };
  } catch {
    return { error: "We couldn't load your account. Please try again." };
  }
}

export async function signOut(): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (!error) revalidatePath("/", "layout");
    return error ? { error: "Sign out failed. Please try again." } : {};
  } catch {
    return { error: "Sign out failed. Please try again." };
  }
}
