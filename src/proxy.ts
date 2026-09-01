import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { canAccessPath, getRoleHome, isProtectedPath, isKnownRole } from "@/utils/permissions";

export async function proxy(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const { user, response } = await updateSession(request);
  const role = user?.user_metadata?.role;

  if (!user && isProtectedPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && (!isProtectedPath(pathname) || !canAccessPath(role, pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = isKnownRole(role) ? getRoleHome(role) : "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/learner/:path*",
    "/login",
    "/forgot-password",
  ],
};
