import test from "node:test";
import assert from "node:assert/strict";
import { loadTs } from "./helpers/load-ts.mjs";

function findForm(element) {
  if (!element || typeof element !== "object") return null;
  if (element.type === "form") return element;
  const children = element.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const form = findForm(child);
    if (form) return form;
  }
  return null;
}

// Exercise the actual submit handler with only browser and UI boundaries mocked.
function setupLogin(t, { result = { error: null }, failure, next, input } = {}) {
  const state = [];
  const navigations = [];
  const credentials = [];
  t.mock.method(globalThis, "FormData", function () {
    return { get: (key) => (input ?? { email: "student@example.com", password: "password" })[key] };
  });
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: { replace: (url) => navigations.push(url) } },
  });
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
  });
  const { LoginForm } = loadTs("src/components/auth/LoginForm.tsx", {
    react: {
      useState(initial) {
        const index = state.length;
        state.push(initial);
        return [initial, (value) => { state[index] = value; }];
      },
    },
    "next/link": { default: "a" },
    "lucide-react": Object.fromEntries(["Building2", "Eye", "EyeOff", "Lock", "Mail", "ShieldCheck"].map((name) => [name, "svg"])),
    "@/components/ui/button": { Button: "button" },
    "@/components/ui/input": { Input: "input" },
    "@/components/ui/label": { Label: "label" },
    "@/components/ui/card": { Card: "div", CardContent: "div" },
    "@/lib/supabase/client": {
      createClient: () => ({ auth: { async signInWithPassword(value) {
        credentials.push(value);
        if (failure) throw failure;
        return result;
      } } }),
    },
  });
  const form = findForm(LoginForm({ next }));
  assert.ok(form);
  return { state, navigations, credentials, submit: () => form.props.onSubmit({ preventDefault() {}, currentTarget: {} }) };
}

test("successful login navigates through server completion and stays pending during handoff", async (t) => {
  const login = setupLogin(t);
  await login.submit();
  assert.deepEqual(login.navigations, ["/auth/complete"]);
  assert.deepEqual(login.state[2], []);
  assert.equal(login.state[1], true);
  assert.deepEqual(login.credentials, [{ email: "student@example.com", password: "password" }]);
});

test("login carries the entire return path to completion for server validation", async (t) => {
  const next = "/learner/courses/123?tab=lessons&sort=new";
  const login = setupLogin(t, { next });
  await login.submit();
  const destination = new URL(login.navigations[0], "https://beelearn.example");
  assert.equal(destination.pathname, "/auth/complete");
  assert.equal(destination.searchParams.get("next"), next);
});

test("invalid credentials remain a login error without navigating", async (t) => {
  const login = setupLogin(t, { result: { error: { code: "invalid_credentials" } } });
  await login.submit();
  assert.deepEqual(login.navigations, []);
  assert.deepEqual(login.state[2], ["Email or password is incorrect."]);
  assert.equal(login.state[1], false);
});

test("an authentication connection failure allows retry and does not navigate", async (t) => {
  const login = setupLogin(t, { failure: new Error("Network unavailable") });
  await login.submit();
  assert.deepEqual(login.navigations, []);
  assert.deepEqual(login.state[2], ["Unable to connect. Please try again."]);
  assert.equal(login.state[1], false);
});

test("completion uses the server role and rejects unsafe or unauthorized return paths", async () => {
  for (const [role, next, destination] of [
    ["learner", undefined, "/learner/dashboard"],
    ["instructor", undefined, "/instructor/dashboard"],
    ["admin", undefined, "/admin/dashboard"],
    ["learner", "/courses/123?preview=true", "/courses/123?preview=true"],
    ["learner", "/admin/dashboard", "/learner/dashboard"],
    ["learner", "https://evil.example", "/learner/dashboard"],
  ]) {
    const { default: complete } = loadTs("src/app/auth/complete/page.tsx", {
      "@/lib/auth": { requireAuth: async () => ({ role }) },
      "next/navigation": { redirect: (url) => { throw new Error(`Redirect: ${url}`); } },
    });
    await assert.rejects(complete({ searchParams: Promise.resolve({ next }) }), { message: `Redirect: ${destination}` });
  }
});
