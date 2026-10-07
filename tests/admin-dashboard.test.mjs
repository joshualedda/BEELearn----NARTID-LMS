import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const samples = loadTs("src/components/dashboard/admin/sample-data.ts");

function collect(element, predicate, found = []) {
  if (!element || typeof element !== "object") return found;
  if (predicate(element)) found.push(element);
  const children = element.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) collect(child, predicate, found);
  return found;
}

test("admin preview has coherent LMS examples and no store metrics", () => {
  assert.equal(samples.sampleStats.length, 6);
  assert.equal(samples.sampleTrend.length, 7);
  assert.equal(samples.sampleRoles.reduce((sum, role) => sum + role.value, 0), 1328);
  assert.ok(samples.sampleStats.every((stat) => !/revenue|order|payment|stock/i.test(stat.label)));
  assert.ok(samples.sampleCourses.every((course) => course.id && course.title));
});

test("admin dashboard labels its sample sections and renders chart and table slots", () => {
  const { default: AdminDashboardPage } = loadTs("src/app/(dashboard)/admin/dashboard/page.tsx", {
    "lucide-react": Object.fromEntries(["BookOpen", "ClipboardList", "GraduationCap", "ListChecks", "UsersRound", "UserRoundCheck"].map((icon) => [icon, "svg"])),
    "@/components/ui/card": { Card: "div" },
    "@/components/ui/dashboard-page-header": { DashboardPageHeader: "dashboard-page-header" },
    "@/components/dashboard/admin/AdminDashboardCharts": {
      ActivityTrendChart: "activity-trend",
      CourseActivityChart: "course-activity",
      RoleDistributionChart: "role-distribution",
    },
    "@/components/dashboard/admin/DashboardParts": {
      DashboardPanel: "dashboard-panel",
      DashboardTable: "dashboard-table",
      StatCard: "stat-card",
    },
    "@/components/dashboard/admin/sample-data": samples,
  });
  const page = AdminDashboardPage();
  const panels = collect(page, (item) => item.type === "dashboard-panel");
  const tables = collect(page, (item) => item.type === "dashboard-table");
  const statCards = collect(page, (item) => item.type === "stat-card");
  const headers = collect(page, (item) => item.type === "dashboard-page-header");
  assert.equal(headers.length, 1);
  assert.equal(headers[0].props.title, "Dashboard");
  assert.equal(headers[0].props.description, "Your learning platform at a glance.");
  assert.deepEqual(panels.map((panel) => panel.props.title), [
    "Accounts by Role", "Popular Courses", "Upcoming Assignments", "Course Activity", "Recent Enrollments",
  ]);
  assert.equal(tables.length, 3);
  assert.equal(statCards.length, 6);
  assert.equal(collect(page, (item) => item.type === "activity-trend").length, 1);
  assert.equal(collect(page, (item) => item.type === "role-distribution").length, 1);
  assert.equal(collect(page, (item) => item.type === "course-activity").length, 1);
  assert.equal(headers[0].props.aside.props.children, "Sample data · Design preview");
});
