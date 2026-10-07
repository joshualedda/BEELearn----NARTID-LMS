import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadTs } from "./helpers/load-ts.mjs";

function renderShell(role, pathname) {
  const link = ({ href, children, ...props }) => React.createElement("a", { href, ...props }, children);
  const { DashboardShell } = loadTs("src/components/dashboard/DashboardShell.tsx", {
    "next/link": { default: link },
    "next/navigation": { usePathname: () => pathname },
    "@/components/auth/LogoutButton": { LogoutButton: () => React.createElement("button", null, "Logout") },
    "./AccountMenu": { AccountMenu: ({ roleLabel, displayName }) => React.createElement("button", { "aria-label": "Account menu" }, `${displayName} ${roleLabel}`) },
    "./sidebar/AdminSidebar": loadTs("src/components/dashboard/sidebar/AdminSidebar.ts"),
    "./sidebar/InstructorSidebar": loadTs("src/components/dashboard/sidebar/InstructorSidebar.ts"),
    "./sidebar/LearnerSidebar": loadTs("src/components/dashboard/sidebar/LearnerSidebar.ts"),
  });
  return renderToStaticMarkup(React.createElement(DashboardShell, { role, displayName: "Bee Example", email: "bee@example.com" }, "Content"));
}

test("all roles keep text-only sidebar branding with role-specific navigation", () => {
  for (const [role, label, route, uniqueLink] of [
    ["learner", "Learner", "/learner/dashboard", "/courses"],
    ["instructor", "Instructor", "/instructor/dashboard", "/instructor/courses"],
    ["admin", "Administrator", "/admin/dashboard", "/admin/users"],
  ]) {
    const markup = renderShell(role, route);
    assert.match(markup, new RegExp(`${label}(?:<!-- -->)? Workspace`));
    assert.ok(markup.includes(`${label} navigation`));
    assert.ok(markup.includes(`href="${uniqueLink}"`));
    assert.ok(markup.includes("bg-emerald-600 text-white shadow-sm"));
    assert.ok(markup.includes('aria-current="page"'));
    if (role !== "admin") assert.ok(!markup.includes('href="/admin/dashboard"'));
    assert.ok(markup.includes("Bee Example"));
    assert.ok(markup.includes("BeeLearn"));
  }
});

test("admin sidebar renders ordered section headings and upcoming items", () => {
  const markup = renderShell("admin", "/admin/dashboard");
  const headings = ["Overview", "Academic Management", "Analytics", "System"];
  const positions = headings.map((heading) => markup.indexOf(`>${heading}</h2>`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.ok(!markup.includes("At-Risk Students"));
  assert.match(markup, /System Settings<\/span>.*?Soon<\/span>/);
});
