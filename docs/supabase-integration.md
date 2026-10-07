# Supabase authentication and courses

## Configuration

Use the existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. No service-role key is needed in the application.

In Supabase Authentication:

1. **Confirm email** is currently disabled in the Supabase project, so signup returns a session immediately. If you enable confirmation later, add `http://localhost:3000/auth/confirm` and your deployed `/auth/confirm` URL to the redirect allowlist.
2. If you enable confirmation later and want links to work on another device, set the Confirm signup email link to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`. The app also accepts the default PKCE `code` callback, which requires the browser that initiated signup.

With confirmation disabled, the registration Server Action calls Supabase Auth signup and reports success when it returns a session. The existing `auth.users` trigger creates the matching profile; the application does not insert one or send a role. The database default assigns `learner`. If confirmation is enabled later, signup shows a check-your-email notice first. Login reads `profiles.role`: `learner` maps to `/learner/dashboard`, with instructor/admin using their existing dashboard routes. Unknown or missing profiles lead to a recoverable account error. Never set authorization roles through user metadata.

`auth.signUp()` creates the account in Supabase Auth's built-in `auth.users` table. The application does not create or insert into a separate users table. Supabase stores the submitted full name in the Auth user's metadata.

The LMS reads the existing `public.profiles` table for authorization. The Supabase database trigger creates the profile when Auth creates a user, leaving `role` to its database default. Registration never asks for or sends a role. The full name remains in Supabase Auth metadata; the database trigger may also copy it into `profiles.full_name` if configured to do so. The repository's signup-profile migration is for projects without this trigger; do not apply a second trigger to a project where one already exists.

With email confirmation disabled, signup returns a session and goes directly through `/auth/complete`. That page reads the profile role but does not create profiles. An Auth account missing its profile needs a database-side repair by an administrator.

Before applying the migration, inspect the project's existing signup triggers in the SQL Editor:

```sql
select t.tgname, pg_get_triggerdef(t.oid) as definition
from pg_trigger t
where t.tgrelid = 'auth.users'::regclass
  and not t.tgisinternal
  and (t.tgtype & 4) = 4;
```

If another `auth.users` INSERT trigger exists, the migration stops so it cannot create duplicate profile rows. Inspect that trigger before changing it. The publishable key cannot inspect or apply triggers; an HTTP 200 from the Auth endpoint proves reachability, not that registration and profile creation work.

After registering a new test account, use the SQL Editor to verify its Auth and profile rows share an ID and the profile role is `learner`. Confirm that sign-in reaches `/learner/dashboard`. Do not log or share the test account's password.

Supabase can deliberately mask duplicate-email signups. The UI reports explicit duplicate errors when returned, but otherwise shows the same confirmation notice to avoid claiming a new account was definitely created. Resend confirmation is available on login. Sessions persist using the existing SSR cookie client; the nonfunctional “Remember this device” checkbox was replaced with an accurate session explanation.

If registration reports an email rate limit, check for an earlier confirmation email and inspect **Authentication → Logs** and **Authentication → Rate Limits** in the Supabase dashboard. Supabase's built-in email service has a small project-wide quota, shared by signup and other Auth emails. Wait for it to reset or configure custom SMTP or a Send Email hook before repeated testing. Retrying the form immediately does not reset the limit. A request rate limit is separate and may depend on the user's IP address or recent signup attempts.

If the Auth user already exists but the first confirmation link expired, do not register again with the same email. Go to `/login`, enter that email, and use **Resend confirmation email** after the email quota resets. If a newly delivered link fails immediately, inspect Auth logs and the confirmation email template; link scanners can consume single-use confirmation URLs before the user clicks them.

## Database rollout

The configured project's REST API confirmed the documented columns on `profiles`, `courses`, and `enrollments`; `courses.status` does not exist. The public key cannot inspect SQL policies, triggers, constraints, or apply migrations. The TypeScript database definitions cover the verified columns used here and are not a full generated schema.

Before production, inspect the existing signup trigger and policies in Supabase, then review and apply `supabase/migrations/202609250001_secure_core_lms.sql` once through the SQL editor or the project's migration workflow. This transactional migration replaces the two unapplied development migrations and is not executed by the application.

The migration:

- Preserves the existing signup trigger, which creates the profile and uses the database's default `learner` role. Do not add a second signup trigger.
- Enforces one enrollment per user/course and one submission per student/assignment; it aborts on existing duplicates without deleting records.
- Enables RLS and narrow grants on LMS tables. Students read their own records, course owners read their students' records, and admins read all LMS activity. Only admins may change another user's role.
- Creates the Step 5 quiz table and trusted attendance/quiz functions. Browsers cannot write their own duration or score directly.
- Makes all existing course catalog rows publicly readable. If any courses must remain private, do not apply the catalog policy until publication rules are defined. No protected lesson content is queried by these pages.

Check existing foreign keys (`profiles.id` → `auth.users.id`, `courses.instructor_id` → `profiles.id`, `enrollments.user_id` → `profiles.id`, `enrollments.course_id` → `courses.id`), NOT NULL constraints, and UUID/default timestamp generation before rollout. No tables or columns are renamed or dropped.

Without the migration or equivalent existing policies and unique constraint, the client code alone cannot guarantee database privacy or duplicate prevention across concurrent requests. Do not disable RLS to fix a failed query.

## Course behavior

The landing page shows the four newest courses returned by Supabase, ordered by `created_at` then ID. `/courses` lists available courses, and `/courses/[courseId]` provides public title/description previews. Existing learner course URLs remain supported. Cards omit demo ratings, counts, levels, and instructor biographies because those fields are absent from the supplied schema.

Enrollment checks happen on the server before rendering. The client button calls a Server Action that rechecks identity, student role, course access, and enrollment; no user ID is accepted from the browser. A duplicate-key race becomes an already-enrolled result. Existing inactive/dropped enrollments require administrator assistance rather than being silently reactivated.

## Verification

Run `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, and `npm.cmd run build` on Windows.

Using dedicated test accounts, verify:

- Signup creates a profile whose ID matches the Auth user and whose role defaults to `learner`; the supplied name stays in Auth metadata. Verify email and resend/expired-link behavior.
- Incorrect credentials and unverified emails show errors; each role reaches its own dashboard after login and reload.
- A student cannot visit admin/instructor routes, alter their profile role through the API, or insert an enrollment for someone else.
- Logged-out course enrollment returns through login to the same course; external `next` URLs are rejected.
- Enrollment persists after reload, concurrent clicks create one row, and private enrollment records cannot be read by other accounts or anonymous users.
- Logout removes the session; protected routes redirect to login. Missing/unknown roles and database failures show errors without redirect loops.
- Empty catalogs and failed course queries have distinct messages. Missing course IDs return 404.

Password recovery, lesson delivery, staff CRUD, and reactivation/withdrawal are outside this implementation.
