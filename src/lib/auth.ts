import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { resolveProfileRole, getRoleHome } from "@/utils/permissions";
import type { Role } from "@/constants/roles";

export const getAuth = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { supabase, user: null, role: null, profile: null, issue: null };
  const { data: profile, error: profileError } = await supabase
    .from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profileError) console.error("Profile role lookup failed:", { code: profileError.code, message: profileError.message });
  const { role, issue } = resolveProfileRole(profile, profileError);
  return { supabase, user, profile, role, issue };
});

export async function requireAuth(requiredRole?: Role) {
  const auth = await getAuth();
  if (!auth.user) redirect("/login");
  if (!auth.role) redirect(`/auth/access-error?reason=${auth.issue ?? "profile-query"}`);
  if (requiredRole && auth.role !== requiredRole) redirect(getRoleHome(auth.role));
  return auth;
}
