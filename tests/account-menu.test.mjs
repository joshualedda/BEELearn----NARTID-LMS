import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

function findElement(element, predicate) {
  if (!element || typeof element !== "object") return null;
  if (predicate(element)) return element;
  const children = element.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const found = findElement(child, predicate);
    if (found) return found;
  }
  return null;
}

function setup(role) {
  let open = false;
  const { AccountMenu } = loadTs("src/components/dashboard/AccountMenu.tsx", {
    react: {
      useState: () => [open, (value) => { open = typeof value === "function" ? value(open) : value; }],
      useRef: () => ({ current: null }),
      useEffect() {},
    },
    "next/link": { default: "a" },
    "lucide-react": { ChevronDown: "svg", LogOut: "svg", UserRound: "svg" },
    "@/components/auth/LogoutButton": { LogoutButton: "button" },
  });
  const labels = { learner: "Learner", instructor: "Instructor", admin: "Administrator" };
  const props = { role, roleLabel: labels[role], displayName: "Bee Example", email: "bee@example.com", initials: "BE" };
  return () => AccountMenu(props);
}

test("account dropdown opens for every role and only links to an existing profile page", () => {
  for (const role of ["learner", "instructor", "admin"]) {
    const render = setup(role);
    const closed = render();
    const trigger = findElement(closed, (element) => element.props?.["aria-label"] === "Account menu for Bee Example");
    assert.equal(trigger.props["aria-expanded"], false);
    trigger.props.onClick();

    const opened = render();
    assert.equal(findElement(opened, (element) => element.props?.["aria-label"] === "Account menu for Bee Example").props["aria-expanded"], true);
    assert.ok(findElement(opened, (element) => element.props?.role === "group"));
    assert.ok(findElement(opened, (element) => element.props?.label === "Sign Out"));
    const profile = findElement(opened, (element) => element.props?.href === "/learner/profile");
    if (role === "learner") assert.ok(profile);
    else {
      assert.equal(profile, null);
      assert.ok(findElement(opened, (element) => element.props?.["aria-disabled"] === "true"));
    }
  }
});
