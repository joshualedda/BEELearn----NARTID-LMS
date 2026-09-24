import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeRole, getRoleHome } from "@/utils/permissions";
import type { Role } from "@/constants/roles";

export const getAuth = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { supabase, user: null, role: null, profile: null };
  const { data: profile, error: profileError } = await supabase
    .from("profiles").select("id,full_name,role,created_at").eq("id", user.id).maybeSingle();
  return { supabase, user, profile, role: profileError ? null : normalizeRole(profile?.role) };
});

export async function requireAuth(requiredRole?: Role) {
  const auth = await getAuth();
  if (!auth.user) redirect("/login");
  if (!auth.role) redirect("/auth/access-error");
  if (requiredRole && auth.role !== requiredRole) redirect(getRoleHome(auth.role));
  return auth;
}
