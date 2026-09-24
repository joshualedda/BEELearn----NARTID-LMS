import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tokenHash = params.get("token_hash");
  const type = params.get("type");
  const code = params.get("code");
  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL("/auth/complete", request.url));
    } catch { /* Show the same recoverable error as invalid token links. */ }
  }
  if (tokenHash && (type === "email" || type === "signup")) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) return NextResponse.redirect(new URL("/auth/complete", request.url));
    } catch { /* Show a recoverable confirmation error below. */ }
  }
  return NextResponse.redirect(new URL("/login?confirmation=error", request.url));
}
