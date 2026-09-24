import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { canAccessPath, getLoginDestination, getRoleHome, isProtectedPath, normalizeRole } from "@/utils/permissions";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const protectedPath = isProtectedPath(pathname);
  const authForm = pathname === "/login" || pathname === "/register";
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return protectedPath
      ? new NextResponse("Sign-in is temporarily unavailable.", { status: 503 })
      : NextResponse.next();
  }

  const { user, response, supabase } = await updateSession(request);
  function redirectTo(path: string) {
    const redirect = NextResponse.redirect(new URL(path, request.url));
    for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie);
    redirect.headers.set("Cache-Control", "private, no-store");
    return redirect;
  }
  response.headers.set("Cache-Control", "private, no-store");
  if (!user && protectedPath) return redirectTo(`/login?next=${encodeURIComponent(pathname + search)}`);
  if (user && (protectedPath || authForm)) {
    const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = error ? null : normalizeRole(data?.role);
    if (!role) return redirectTo("/auth/access-error");
    if (protectedPath && !canAccessPath(role, pathname)) return redirectTo(getRoleHome(role));
    if (authForm) return redirectTo(getLoginDestination(role, request.nextUrl.searchParams.get("next")));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)"],
};
