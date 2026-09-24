import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { loadTs } from "./helpers/load-ts.mjs";

const require = createRequire(import.meta.url);
const { NextRequest, NextResponse } = require("next/server");

function setup({ user = null, profileRole = null, error = null } = {}) {
  const response = NextResponse.next();
  response.cookies.set("test-refreshed-session", "test-value", { httpOnly: true });
  const query = { select() { return query; }, eq() { return query; }, async maybeSingle() { return { data: profileRole ? { role: profileRole } : null, error }; } };
  const { proxy } = loadTs("src/proxy.ts", {
    "@/lib/supabase/proxy": { updateSession: async () => ({ user, response, supabase: { from: () => query } }) },
  });
  return (path) => proxy(new NextRequest(`https://beelearn.example${path}`));
}

test("proxy preserves refreshed cookies when redirecting and preserves the return path", async () => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.invalid";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-key";
  const response = await setup()("/learner/courses/123?tab=overview");
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location")).searchParams.get("next"), "/learner/courses/123?tab=overview");
  assert.equal(response.cookies.get("test-refreshed-session").value, "test-value");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
});

test("proxy ignores elevated user metadata and enforces the profile role", async () => {
  const response = await setup({ user: { id: "student", user_metadata: { role: "admin" } }, profileRole: "student" })("/admin/dashboard");
  assert.equal(new URL(response.headers.get("location")).pathname, "/learner/dashboard");
});

test("missing and failed profile reads produce a recoverable error without a login loop", async () => {
  for (const error of [null, { code: "42501" }]) {
    const run = setup({ user: { id: "student" }, error });
    assert.equal(new URL((await run("/login")).headers.get("location")).pathname, "/auth/access-error");
    assert.equal((await run("/auth/access-error")).status, 200);
  }
});

test("missing configuration fails closed on protected routes", async () => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  const run = setup();
  assert.equal((await run("/admin/dashboard")).status, 503);
  assert.equal((await run("/")).status, 200);
});
