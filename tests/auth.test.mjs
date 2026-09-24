import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { normalizeRole, canAccessPath, isProtectedPath, getLoginDestination } = loadTs("src/utils/permissions.ts");
const { validateLoginInput, validateRegisterInput } = loadTs("src/validations/auth.schema.ts");

test("database student maps to learner and unrecognized roles fail closed", () => {
  assert.equal(normalizeRole("student"), "learner");
  assert.equal(normalizeRole("learner"), "learner");
  for (const role of ["ADMIN", "owner", null, {}, undefined]) assert.equal(normalizeRole(role), null);
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
