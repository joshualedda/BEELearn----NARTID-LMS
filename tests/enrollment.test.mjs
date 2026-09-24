import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const courseId = "11111111-1111-4111-8111-111111111111";
const { isCourseId } = loadTs("src/lib/courses.ts", { "server-only": {}, "@/lib/supabase/server": {} });

function setup({ user = { id: "trusted-user" }, role = "learner", replies = [] } = {}) {
  const calls = [];
  const supabase = { from(table) {
    const call = { table, filters: [] };
    calls.push(call);
    const builder = {
      select(columns) { call.columns = columns; return builder; },
      eq(column, value) { call.filters.push([column, value]); return builder; },
      maybeSingle() { return Promise.resolve(replies.shift()); },
      insert(row) { call.insert = row; return Promise.resolve(replies.shift()); },
    };
    return builder;
  } };
  const { enrollInCourse } = loadTs("src/app/courses/actions.ts", {
    "@/lib/auth": { getAuth: async () => ({ supabase, user, role }) },
    "@/lib/courses": { isCourseId },
    "next/cache": { revalidatePath() {} },
  });
  return { enrollInCourse, calls };
}

test("invalid IDs, unauthenticated users, and non-students cannot write", async () => {
  const anonymous = setup({ user: null });
  assert.equal((await anonymous.enrollInCourse(courseId)).kind, "login");
  assert.equal(anonymous.calls.length, 0);
  const instructor = setup({ role: "instructor" });
  assert.equal((await instructor.enrollInCourse(courseId)).kind, "error");
  assert.equal(instructor.calls.length, 0);
  const invalid = setup();
  assert.equal((await invalid.enrollInCourse("bad-id")).kind, "error");
  assert.equal(invalid.calls.length, 0);
});

test("insert derives ownership from authenticated identity", async () => {
  const { enrollInCourse, calls } = setup({ replies: [{ data: { id: courseId } }, { data: null }, { error: null }] });
  assert.deepEqual(await enrollInCourse(courseId), { kind: "enrolled", status: "active" });
  assert.deepEqual(calls.at(-1).insert, { user_id: "trusted-user", course_id: courseId, status: "active" });
  assert.ok(calls[1].filters.some(([key, value]) => key === "user_id" && value === "trusted-user"));
});

test("existing enrollment never inserts or reactivates a row", async () => {
  for (const status of ["active", "completed", "dropped"]) {
    const { enrollInCourse, calls } = setup({ replies: [{ data: { id: courseId } }, { data: { status } }] });
    assert.deepEqual(await enrollInCourse(courseId), { kind: "enrolled", status });
    assert.equal(calls.some(call => call.insert), false);
  }
});

test("concurrent duplicate insert becomes enrolled after verifying the row", async () => {
  const { enrollInCourse } = setup({ replies: [{ data: { id: courseId } }, { data: null }, { error: { code: "23505" } }, { data: { status: "active" } }] });
  assert.deepEqual(await enrollInCourse(courseId), { kind: "enrolled", status: "active" });
});

test("missing courses and lookup failures do not insert", async () => {
  for (const replies of [[{ data: null }], [{ data: { id: courseId } }, { error: { code: "42501" } }]]) {
    const { enrollInCourse, calls } = setup({ replies });
    assert.equal((await enrollInCourse(courseId)).kind, "error");
    assert.equal(calls.some(call => call.insert), false);
  }
});
