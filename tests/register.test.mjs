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

function setupRegistration(t, { result = { status: "confirmation" }, agreed = true, input } = {}) {
  const state = [];
  const signups = [];
  const navigations = [];
  t.mock.method(globalThis, "FormData", function () {
    const values = input ?? {
      fullName: "  Bee Learner  ", email: "  learner@example.com  ",
      password: "password123", confirmPassword: "password123",
    };
    return { get: (key) => values[key] };
  });
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: { origin: "https://beelearn.example", replace: (url) => navigations.push(url) } },
  });
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
  });
  const { default: RegisterPage } = loadTs("src/app/(auth)/register/page.tsx", {
    react: {
      useState(initial) {
        const index = state.length;
        const value = index === 2 ? agreed : initial;
        state.push(value);
        return [value, (next) => { state[index] = next; }];
      },
    },
    "next/link": { default: "a" },
    "next/navigation": { useRouter: () => ({ push: (url) => navigations.push(url) }) },
    "lucide-react": Object.fromEntries(["Building2", "Eye", "EyeOff", "Lock", "Mail", "ShieldCheck", "User"].map((name) => [name, "svg"])),
    "@/components/ui/button": { Button: "button" },
    "@/components/ui/input": { Input: "input" },
    "@/components/ui/label": { Label: "label" },
    "@/components/ui/card": { Card: "div", CardContent: "div" },
    "@/components/ui/checkbox": { Checkbox: "input" },
    "@/app/(auth)/actions": { async registerAccount(value, terms) { signups.push({ value, terms }); return result; } },
  });
  const form = findForm(RegisterPage());
  assert.ok(form);
  return { state, signups, navigations, submit: () => form.props.onSubmit({ preventDefault() {}, currentTarget: {} }) };
}

test("registration sends validated input to the server action", async (t) => {
  const registration = setupRegistration(t);
  await registration.submit();
  assert.deepEqual(registration.signups, [{
    value: { fullName: "Bee Learner", email: "learner@example.com", password: "password123", confirmPassword: "password123" },
    terms: true,
  }]);
  assert.deepEqual(registration.navigations, ["/login?registered=true"]);
});

test("successful server registration uses a fresh request for server auth", async (t) => {
  const registration = setupRegistration(t, { result: { status: "success" } });
  await registration.submit();
  assert.deepEqual(registration.navigations, ["/auth/complete"]);
});

test("registration rejects missing terms before contacting Supabase", async (t) => {
  const registration = setupRegistration(t, { agreed: false });
  await registration.submit();
  assert.deepEqual(registration.signups, []);
  assert.deepEqual(registration.state[4], ["You must agree to the Terms of Service and Privacy Policy."]);
});

test("registration shows Supabase errors and stays on the form", async (t) => {
  const registration = setupRegistration(t, { result: { status: "error", message: "Please choose a stronger password with at least 8 characters." } });
  await registration.submit();
  assert.deepEqual(registration.navigations, []);
  assert.deepEqual(registration.state[4], ["Please choose a stronger password with at least 8 characters."]);
});

test("email rate limits direct the learner to resend instead of registering again", async (t) => {
  const registration = setupRegistration(t, { result: { status: "error", message: "Email sending is temporarily limited. If you already registered, wait for the limit to reset, then use Resend confirmation email on the Sign In page. Do not register again." } });
  await registration.submit();
  assert.deepEqual(registration.navigations, []);
  assert.deepEqual(registration.state[4], ["Email sending is temporarily limited. If you already registered, wait for the limit to reset, then use Resend confirmation email on the Sign In page. Do not register again."]);
});

test("server registration trusts the database trigger and does not write a profile", async () => {
  const calls = [];
  const { registerAccount } = loadTs("src/app/(auth)/actions.ts", {
    "@/lib/supabase/server": { createClient: async () => ({
      auth: { signUp: async (input) => {
      calls.push(["signup", input]);
      return { data: { user: { id: "auth-user-id" }, session: { access_token: "test" } }, error: null };
      } },
      from: () => { throw new Error("Registration must not write profiles"); },
    }) },
    "next/headers": { headers: async () => ({ get: () => "https://beelearn.example" }) },
    "next/cache": { revalidatePath() {} },
  });
  const result = await registerAccount({
    fullName: " Bee Learner ", email: " learner@example.com ",
    password: "password123", confirmPassword: "password123",
  }, true);
  assert.deepEqual(result, { status: "success" });
  assert.deepEqual(calls, [
    ["signup", { email: "learner@example.com", password: "password123", options: {
      emailRedirectTo: "https://beelearn.example/auth/confirm", data: { full_name: "Bee Learner" },
    } }],
  ]);
});

test("confirmation exchanges a valid code and rejects an expired one", async () => {
  for (const [error, destination] of [
    [null, "/auth/complete"],
    [{ code: "otp_expired" }, "/login?confirmation=error"],
  ]) {
    const { GET } = loadTs("src/app/auth/confirm/route.ts", {
      "next/server": { NextResponse: { redirect: (url) => url } },
      "@/lib/supabase/server": { createClient: async () => ({ auth: { exchangeCodeForSession: async () => ({ error }) } }) },
    });
    const request = {
      url: "https://beelearn.example/auth/confirm?code=test",
      nextUrl: { searchParams: new URLSearchParams("code=test") },
    };
    const response = await GET(request);
    assert.equal(response.pathname + response.search, destination);
  }
});
