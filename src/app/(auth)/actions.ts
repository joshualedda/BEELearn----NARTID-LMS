"use server";

import { createClient } from "@/lib/supabase/server";
import { validateRegisterInput, type RegisterInput } from "@/validations/auth.schema";
import { authErrorMessage } from "@/utils/auth-errors";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type RegistrationResult =
  | { status: "success" | "confirmation" }
  | { status: "error"; message: string };

export async function registerAccount(
  input: RegisterInput,
  agreedToTerms: boolean,
): Promise<RegistrationResult> {
  const normalizedInput = {
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    password: input.password,
    confirmPassword: input.confirmPassword,
  };
  const validationErrors = validateRegisterInput(normalizedInput);
  if (validationErrors.length) return { status: "error", message: validationErrors[0] };
  if (!agreedToTerms) {
    return { status: "error", message: "You must agree to the Terms of Service and Privacy Policy." };
  }

  try {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedInput.email,
      password: normalizedInput.password,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/confirm` : undefined,
        data: { full_name: normalizedInput.fullName },
      },
    });
    if (error) {
      return { status: "error", message: authErrorMessage(error, "We couldn't create your account. Please try again.") };
    }
    if (!data.session || !data.user) return { status: "confirmation" };
    return { status: "success" };
  } catch (error) {
    console.error("Registration failed:", error);
    return { status: "error", message: "An unexpected error occurred. Please try again." };
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
