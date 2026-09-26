import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const courseId = "11111111-1111-4111-8111-111111111111";
const assignmentId = "22222222-2222-4222-8222-222222222222";
const quizId = "33333333-3333-4333-8333-333333333333";
const { isCourseId } = loadTs("src/lib/courses.ts", { "server-only": {}, "@/lib/supabase/server": {} });

function setup({ role = "learner", user = { id: "trusted-user" }, replies = [], rpcReply = { data: 75, error: null } } = {}) {
  const calls = [];
  const supabase = {
    from(table) {
      const call = { table, filters: [] };
      calls.push(call);
      const builder = {
        select(columns) { call.columns = columns; return builder; },
        eq(column, value) { call.filters.push([column, value]); return builder; },
        maybeSingle() { return Promise.resolve(replies.shift()); },
        insert(row) { call.insert = row; return Promise.resolve(replies.shift()); },
        update(row) { call.update = row; return builder; },
        then(resolve) { resolve(replies.shift()); },
      };
      return builder;
    },
    rpc(name, args) { calls.push({ rpc: name, args }); return Promise.resolve(rpcReply); },
  };
  const actions = loadTs("src/app/courses/lms-actions.ts", {
    "@/lib/auth": { getAuth: async () => ({ supabase, role, user }) },
    "@/lib/courses": { isCourseId },
    "next/cache": { revalidatePath() {} },
  });
  return { ...actions, calls };
}

test("course ownership and complete quiz questions are required before creating quizzes", async () => {
  const learner = setup();
  assert.equal((await learner.createQuiz(courseId, "Basics", [])).ok, false);
  assert.equal(learner.calls.length, 0);

  const instructor = setup({ role: "instructor", replies: [{ data: { id: courseId } }, { error: null }] });
  const options = ["a", "b", "c", "d"].map((text, index) => ({ id: `${index + 4}4444444-4444-4444-8444-444444444444`, text }));
  const questions = [{ id: quizId, prompt: "Question?", options, correctOptionId: options[0].id }];
  assert.equal((await instructor.createQuiz(courseId, "Basics", questions)).ok, true);
  assert.equal(instructor.calls.at(-1).table, "quizzes");
  assert.equal(instructor.calls.at(-1).insert.course_id, courseId);
});

test("submission updates target the authenticated learner and do not insert another row", async () => {
  const actions = setup({ replies: [
    { data: { course_id: courseId } },
    { data: { id: "enrollment" } },
    { data: { id: "existing" } },
    { error: null },
  ] });
  assert.equal((await actions.saveSubmission(assignmentId, "  My answer  ")).ok, true);
  const update = actions.calls.find((call) => call.update);
  assert.deepEqual(update.update, { content: "My answer" });
  assert.ok(update.filters.some(([column, value]) => column === "user_id" && value === "trusted-user"));
  assert.equal(actions.calls.some((call) => call.insert), false);
});

test("quiz attempts call database grading with authenticated learner context", async () => {
  const actions = setup();
  assert.equal((await actions.submitQuiz(quizId, { [courseId]: assignmentId })).score, 75);
  assert.equal(actions.calls[0].rpc, "submit_quiz_attempt");
  const instructor = setup({ role: "instructor" });
  assert.equal((await instructor.submitQuiz(quizId, { [courseId]: assignmentId })).ok, false);
  assert.equal(instructor.calls.length, 0);
});
