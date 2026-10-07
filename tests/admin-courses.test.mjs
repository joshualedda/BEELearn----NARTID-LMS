import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const samples = loadTs("src/app/(dashboard)/admin/courses/sample-courses.ts");
const { filterSampleCourses, paginateCourses, sampleCourses } = samples;

function collect(element, predicate, found = []) {
  if (!element || typeof element !== "object") return found;
  if (predicate(element)) found.push(element);
  const children = element.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) collect(child, predicate, found);
  return found;
}

test("course preview searches title or instructor and combines status", () => {
  assert.equal(filterSampleCourses(sampleCourses, "", "All").length, 8);
  assert.deepEqual(filterSampleCourses(sampleCourses, "  DATA ANALYSIS  ", "All").map(({ id }) => id), ["sample-course-3"]);
  assert.deepEqual(filterSampleCourses(sampleCourses, "tessa", "Draft").map(({ id }) => id), ["sample-course-7"]);
  assert.deepEqual(filterSampleCourses(sampleCourses, "tessa", "Published"), []);
});

test("course preview paginates five records and clamps filtered or empty pages", () => {
  assert.deepEqual(paginateCourses(sampleCourses, 1).rows.map(({ id }) => id), ["sample-course-1", "sample-course-2", "sample-course-3", "sample-course-4", "sample-course-5"]);
  assert.deepEqual(paginateCourses(sampleCourses, 2).rows.map(({ id }) => id), ["sample-course-6", "sample-course-7", "sample-course-8"]);
  assert.deepEqual(paginateCourses(filterSampleCourses(sampleCourses, "", "Draft"), 2), {
    page: 1, totalPages: 1, rows: [sampleCourses[4], sampleCourses[6]], start: 1, end: 2,
  });
  assert.deepEqual(paginateCourses([], 2), { page: 1, totalPages: 0, rows: [], start: 0, end: 0 });
});

test("course directory defaults to table and switches to cards without changing records", () => {
  const state = [];
  let cursor = 0;
  const { CoursesDirectory } = loadTs("src/app/(dashboard)/admin/courses/CoursesDirectory.tsx", {
    react: { useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (value) => { state[index] = value; }];
    } },
    "@/components/ui/card": { Card: "card" },
    "@/components/ui/pagination": { Pagination: "pagination" },
    "@/components/ui/table-filter": { TableFilter: "table-filter" },
    "@/components/ui/table": { Table: "table", Td: "td", Tr: "tr" },
    "./sample-courses": samples,
  });
  const render = () => { cursor = 0; return CoursesDirectory(); };
  let page = render();
  assert.equal(collect(page, (item) => item.type === "table").length, 1);
  assert.equal(collect(page, (item) => item.type === "tr").length, 5);
  const pagination = collect(collect(page, (item) => item.type === "table")[0].props.footer,
    (item) => item.type === "pagination")[0];
  pagination.props.onPageChange(2);
  page = render();
  assert.equal(collect(page, (item) => item.type === "tr").length, 3);
  const filter = collect(page, (item) => item.type === "table-filter")[0];
  assert.equal(filter.props.viewMode, "table");
  filter.props.onViewModeChange("cards");
  page = render();
  assert.equal(collect(page, (item) => item.type === "table").length, 0);
  assert.deepEqual(collect(page, (item) => item.type === "h3").map((item) => item.props.children),
    sampleCourses.slice(5).map(({ title }) => title));
  collect(page, (item) => item.type === "table-filter")[0].props.onSearchChange("Tessa");
  page = render();
  assert.equal(collect(page, (item) => item.type === "card").length, 1);
  assert.deepEqual(collect(page, (item) => item.type === "h3").map((item) => item.props.children), ["Applied Research Methods"]);
});
