import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

const { adminSidebar } = loadTs("src/components/dashboard/sidebar/AdminSidebar.ts");

test("admin navigation points to existing pages and keeps unfinished pages disabled", () => {
  assert.deepEqual(
    adminSidebar.filter((item) => item.href).map(({ label, href }) => [label, href]),
    [
      ["Dashboard", "/admin/dashboard"],
      ["Students", "/admin/students"],
      ["Instructors", "/admin/instructors"],
      ["All Courses", "/admin/courses"],
      ["Reports", "/admin/reports"],
      ["Manage Users", "/admin/users"],
    ],
  );
  assert.deepEqual(
    adminSidebar.filter((item) => !item.href).map((item) => item.label),
    ["System Settings", "Profile / Settings"],
  );
  assert.deepEqual(
    adminSidebar.filter((item) => item.section).map(({ section }) => section),
    ["Overview", "Academic Management", "Analytics", "System"],
  );
});
