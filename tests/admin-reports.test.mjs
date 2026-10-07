import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { filterReportCourses, getReportCourses, reportCourses, reportRangeOptions, reportSnapshots } = loadTs("src/app/(dashboard)/admin/reports/report-mock-data.ts");

test("report mock snapshots cover each date filter with complete featured courses", () => {
  assert.deepEqual(reportRangeOptions.map(({ value }) => value), ["7d", "30d", "3m", "year"]);
  for (const { value } of reportRangeOptions) {
    const rows = getReportCourses(value);
    assert.equal(rows.length, reportCourses.length);
    assert.ok(rows.every((row) => row.title && row.instructor && Number.isFinite(row.students)));
  }
  assert.equal(reportSnapshots["30d"].overview.students, 156);
  assert.equal(reportSnapshots["30d"].overview.enrollments, 284);
  assert.equal(reportSnapshots["30d"].academic.averageGrade, 84);
});

test("date ranges change the course breakdown and platform metrics", () => {
  assert.notDeepEqual(getReportCourses("7d").map(({ students }) => students), getReportCourses("30d").map(({ students }) => students));
  assert.notEqual(reportSnapshots["7d"].engagement.courseVisits, reportSnapshots["30d"].engagement.courseVisits);
  assert.notEqual(reportSnapshots["3m"].overview.completionRate, reportSnapshots.year.overview.completionRate);
});

test("course and instructor filters narrow both report tables and charts", () => {
  const rows = getReportCourses("30d");
  assert.equal(filterReportCourses(rows, "all", "all").length, 4);
  assert.deepEqual(filterReportCourses(rows, "all", "Juan Dela Cruz").map(({ id }) => id), ["intro", "queen"]);
  assert.deepEqual(filterReportCourses(rows, "hive", "Maria Santos").map(({ id }) => id), ["hive"]);
  assert.deepEqual(filterReportCourses(rows, "hive", "Juan Dela Cruz"), []);
});

test("reports page uses the shared header with the requested copy", () => {
  const { default: AdminReportsPage } = loadTs("src/app/(dashboard)/admin/reports/page.tsx", {
    "@/components/ui/dashboard-page-header": { DashboardPageHeader: "dashboard-page-header" },
    "./ReportsContent": { ReportsContent: "reports-content" },
  });
  const children = AdminReportsPage().props.children;
  assert.equal(children[0].type, "dashboard-page-header");
  assert.equal(children[0].props.title, "Reports");
  assert.equal(children[0].props.description, "Monitor enrollment, academic performance, course activity, and learner engagement across the learning management system.");
  assert.equal(children[1].type, "reports-content");
});
