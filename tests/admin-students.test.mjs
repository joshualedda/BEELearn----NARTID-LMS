import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { filterSampleStudents, paginateStudents, sampleStudents } = loadTs("src/app/(dashboard)/admin/students/sample-students.ts");

test("student preview filters names and emails without case sensitivity", () => {
  assert.equal(filterSampleStudents(sampleStudents, "", "All").length, 8);
  assert.deepEqual(filterSampleStudents(sampleStudents, "  ARIANA  ", "All").map(({ id }) => id), ["sample-1"]);
  assert.deepEqual(filterSampleStudents(sampleStudents, "mira.bautista@", "All").map(({ id }) => id), ["sample-7"]);
});

test("student preview combines status and search and supports empty results", () => {
  assert.equal(filterSampleStudents(sampleStudents, "", "Pending").length, 2);
  assert.deepEqual(filterSampleStudents(sampleStudents, "mira", "Pending").map(({ id }) => id), ["sample-7"]);
  assert.deepEqual(filterSampleStudents(sampleStudents, "mira", "Active"), []);
});

test("student pagination shows five rows and stays in range after filtering", () => {
  assert.deepEqual(paginateStudents(sampleStudents, 1).rows.map(({ id }) => id), ["sample-1", "sample-2", "sample-3", "sample-4", "sample-5"]);
  assert.deepEqual(paginateStudents(sampleStudents, 2).rows.map(({ id }) => id), ["sample-6", "sample-7", "sample-8"]);
  assert.deepEqual(paginateStudents(filterSampleStudents(sampleStudents, "", "Pending"), 2), {
    page: 1,
    totalPages: 1,
    rows: [sampleStudents[2], sampleStudents[6]],
    start: 1,
    end: 2,
  });
  assert.deepEqual(paginateStudents([], 2), { page: 1, totalPages: 0, rows: [], start: 0, end: 0 });
});
