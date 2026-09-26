"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
