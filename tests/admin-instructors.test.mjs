import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { filterSampleInstructors, paginateInstructors, sampleInstructors } = loadTs("src/app/(dashboard)/admin/instructors/sample-instructors.ts");

test("instructor preview searches names and emails without case sensitivity", () => {
  assert.equal(filterSampleInstructors(sampleInstructors, "", "All").length, 8);
  assert.deepEqual(filterSampleInstructors(sampleInstructors, "  ELENA  ", "All").map(({ id }) => id), ["sample-instructor-1"]);
  assert.deepEqual(filterSampleInstructors(sampleInstructors, "MAYA.VILLANUEVA@", "All").map(({ id }) => id), ["sample-instructor-3"]);
});

test("instructor preview combines status and search and supports empty results", () => {
  assert.equal(filterSampleInstructors(sampleInstructors, "", "Pending").length, 2);
  assert.deepEqual(filterSampleInstructors(sampleInstructors, "tessa", "Pending").map(({ id }) => id), ["sample-instructor-7"]);
  assert.deepEqual(filterSampleInstructors(sampleInstructors, "tessa", "Active"), []);
});

test("instructor pagination shows five rows and stays in range after filtering", () => {
  assert.deepEqual(paginateInstructors(sampleInstructors, 1).rows.map(({ id }) => id), ["sample-instructor-1", "sample-instructor-2", "sample-instructor-3", "sample-instructor-4", "sample-instructor-5"]);
  assert.deepEqual(paginateInstructors(sampleInstructors, 2).rows.map(({ id }) => id), ["sample-instructor-6", "sample-instructor-7", "sample-instructor-8"]);
  assert.deepEqual(paginateInstructors(filterSampleInstructors(sampleInstructors, "", "Pending"), 2), {
    page: 1,
    totalPages: 1,
    rows: [sampleInstructors[2], sampleInstructors[6]],
    start: 1,
    end: 2,
  });
  assert.deepEqual(paginateInstructors([], 2), { page: 1, totalPages: 0, rows: [], start: 0, end: 0 });
});
