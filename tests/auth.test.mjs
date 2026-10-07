import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { normalizeRole, resolveProfileRole, canAccessPath, isProtectedPath, getLoginDestination } = loadTs("src/utils/permissions.ts");
const { validateLoginInput, validateRegisterInput } = loadTs("src/validations/auth.schema.ts");

test("only current database roles are accepted", () => {
  assert.equal(normalizeRole("learner"), "learner");
  for (const role of ["student", "ADMIN", "owner", null, {}, undefined]) assert.equal(normalizeRole(role), null);
  assert.equal(canAccessPath("learner", "/admin/dashboard"), false);
  assert.equal(canAccessPath("instructor", "/learner/dashboard"), false);
  assert.equal(canAccessPath("learner", "/learner/courses/123"), true);
  assert.equal(isProtectedPath("/administrator"), false);
});

test("login return paths cannot escape the origin or role boundary", () => {
  for (const next of ["https://evil.example", "//evil.example", "/\\evil.example", "/courses/../../admin/dashboard", "/courses/%2e%2e/admin", "/login", "/admin/dashboard", "/learner-other", "/\nevil.example"]) {
    assert.equal(getLoginDestination("learner", next), "/learner/dashboard", next);
  }
  assert.equal(getLoginDestination("learner", "/courses/123?preview=true"), "/courses/123?preview=true");
  assert.equal(getLoginDestination("admin", null), "/admin/dashboard");
  assert.equal(getLoginDestination("learner", ["/courses", "/admin"]), "/learner/dashboard");
});

test("login accepts existing passwords without imposing signup strength rules", () => {
  assert.deepEqual(validateLoginInput({ email: "student@example.com", password: "short" }), []);
  assert.ok(validateLoginInput({ email: "invalid", password: "" }).length);
  assert.ok(validateRegisterInput({ fullName: "Jane Doe", email: "jane@example.com", password: "short", confirmPassword: "short" }).length);
});

test("profile lookup recognizes database roles and distinguishes failure causes", () => {
  for (const role of ["learner", "instructor", "admin"]) {
    assert.deepEqual(resolveProfileRole({ role }, null), { role, issue: null });
  }
  assert.deepEqual(resolveProfileRole(null, null), { role: null, issue: "missing-profile" });
  assert.deepEqual(resolveProfileRole({ role: "unknown" }, null), { role: null, issue: "invalid-role" });
  assert.deepEqual(resolveProfileRole(null, { code: "42501" }), { role: null, issue: "profile-permission" });
  assert.deepEqual(resolveProfileRole(null, { code: "PGRST999" }), { role: null, issue: "profile-query" });
});

test("server auth reads the signed-in user's database role, not metadata", async () => {
  const calls = [];
  const query = {
    select(columns) { calls.push(["select", columns]); return this; },
    eq(column, value) { calls.push(["eq", column, value]); return this; },
    async maybeSingle() { return { data: { role: "learner" }, error: null }; },
  };
  const { getAuth } = loadTs("src/lib/auth.ts", {
    "server-only": {},
    react: { cache: (fn) => fn },
    "next/navigation": { redirect() {} },
    "@/lib/supabase/server": { createClient: async () => ({
      auth: { getUser: async () => ({ data: { user: { id: "auth-user-id", user_metadata: { role: "admin" } } }, error: null }) },
      from(table) { calls.push(["from", table]); return query; },
    }) },
  });
  const auth = await getAuth();
  assert.equal(auth.role, "learner");
  assert.equal(auth.issue, null);
  assert.deepEqual(calls, [["from", "profiles"], ["select", "role"], ["eq", "id", "auth-user-id"]]);
});
