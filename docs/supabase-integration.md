# Supabase authentication and courses

## Configuration

Use the existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. No service-role key is needed in the application.

In Supabase Authentication:

1. Keep **Confirm email** enabled (verified enabled during implementation).
2. Set Site URL to the deployed app origin. Add `http://localhost:3000/auth/confirm` and your deployed `/auth/confirm` URL to the redirect allowlist.
3. For confirmation links that also work when opened on another device, set the Confirm signup email link to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`. Use the local Site URL while testing locally. The app also accepts the default PKCE `code` callback, which requires the browser that initiated signup.

Successful signup shows a check-your-email notice. Verification creates an SSR cookie session and routes through `/auth/complete`. Login reads `profiles.role`: `student` (and legacy `learner`) maps to `/learner/dashboard`, with instructor/admin using their existing `/…/dashboard` routes. Unknown or missing profiles lead to a recoverable account error, not a guessed role. Never set authorization roles through user metadata.

Supabase can deliberately mask duplicate-email signups. The UI reports explicit duplicate errors when returned, but otherwise shows the same confirmation notice to avoid claiming a new account was definitely created. Resend confirmation is available on login. Sessions persist using the existing SSR cookie client; the nonfunctional “Remember this device” checkbox was replaced with an accurate session explanation.

## Database rollout

The configured project's REST API confirmed the documented columns on `profiles`, `courses`, and `enrollments`; `courses.status` does not exist. The public key cannot inspect SQL policies, triggers, constraints, or apply migrations. The TypeScript database definitions cover the verified columns used here and are not a full generated schema.

Before production, inspect the existing signup trigger and policies in Supabase, then review and apply `supabase/migrations/202609250001_auth_courses_enrollment.sql` once through the SQL editor or the project's migration workflow. This is a transactional migration and is not executed by the application.

The migration:

- Preserves the signup trigger, which must create `profiles(id, full_name, role)` with default `student`. Verify it does not accept a role from signup metadata.
- Enforces one enrollment per user/course; it aborts on existing duplicates without deleting records.
- Enables RLS, allows own-profile and own-enrollment reads, prevents client role changes, and permits students to insert only their own active enrollments.
- Adds restrictive guards that can narrow existing policies. Staff profile/enrollment management is not supported by this initial policy set; review impact before applying to an environment with existing staff workflows. Future staff policies must update these guards as well.
- Makes all existing course catalog rows publicly readable. If any courses must remain private, do not apply the catalog policy until publication rules are defined. No protected lesson content is queried by these pages.

Check existing foreign keys (`profiles.id` → `auth.users.id`, `courses.instructor_id` → `profiles.id`, `enrollments.user_id` → `profiles.id`, `enrollments.course_id` → `courses.id`), NOT NULL constraints, and UUID/default timestamp generation before rollout. No tables or columns are renamed or dropped.

Without the migration or equivalent existing policies and unique constraint, the client code alone cannot guarantee database privacy or duplicate prevention across concurrent requests. Do not disable RLS to fix a failed query.

## Course behavior

The landing page shows the four newest courses returned by Supabase, ordered by `created_at` then ID. `/courses` lists available courses, and `/courses/[courseId]` provides public title/description previews. Existing learner course URLs remain supported. Cards omit demo ratings, counts, levels, and instructor biographies because those fields are absent from the supplied schema.

Enrollment checks happen on the server before rendering. The client button calls a Server Action that rechecks identity, student role, course access, and enrollment; no user ID is accepted from the browser. A duplicate-key race becomes an already-enrolled result. Existing inactive/dropped enrollments require administrator assistance rather than being silently reactivated.

## Verification

Run `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, and `npm.cmd run build` on Windows.

Using dedicated test accounts, verify:

- Signup creates a student profile with the supplied name; verify email and resend/expired-link behavior.
- Incorrect credentials and unverified emails show errors; each role reaches its own dashboard after login and reload.
- A student cannot visit admin/instructor routes, alter their profile role through the API, or insert an enrollment for someone else.
- Logged-out course enrollment returns through login to the same course; external `next` URLs are rejected.
- Enrollment persists after reload, concurrent clicks create one row, and private enrollment records cannot be read by other accounts or anonymous users.
- Logout removes the session; protected routes redirect to login. Missing/unknown roles and database failures show errors without redirect loops.
- Empty catalogs and failed course queries have distinct messages. Missing course IDs return 404.

Password recovery, lesson delivery, staff CRUD, and reactivation/withdrawal are outside this implementation.
