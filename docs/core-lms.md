# Core LMS rollout and analytics fields

Run `supabase/migrations/202609250001_secure_core_lms.sql` once in the Supabase
SQL Editor. It replaces the two unapplied development migrations and includes
the Step 5 schema, trusted functions, grants, and RLS policies. The app uses
only the publishable key and cannot apply SQL itself. The transaction stops if
there is no admin profile, duplicate enrollment or submission rows, unknown
policies, or quiz results referencing missing quizzes. It does not delete
historical rows.

The fields used by the later risk model have these meanings:

| Field | Meaning |
| --- | --- |
| `attendance_logs.login_timestamp` | Database time when an actively enrolled student opens a course page. One row per visit. |
| `attendance_logs.session_duration` | Whole seconds the course page was visible, updated every 60 seconds and on exit, capped at 24 hours per visit. |
| `submissions.submitted_at` | Database time of the latest response, including edits. |
| `submissions.is_late` | Whether that latest response time exceeds `assignments.due_date`. |
| `submissions.score` | Cleared on resubmission; instructor grading is not part of Step 5. |
| `quiz_results.score` | Whole-number percentage from 0 to 100. |
| `quiz_results.attempt_date` | Database time of each attempt; retakes create new rows. |

`submissions.content` holds the student's text response. A unique index on
`(user_id, assignment_id)` allows one current response per student and
assignment. `quizzes.questions` is a JSON array of `{id, prompt, options:
[{id, text}], correctOptionId}` objects. Answer keys stay in this protected
column; a database function strips them before returning questions to students.
Quiz grading runs in a database function that verifies active enrollment and
inserts the result. Instructor enrollment counts also use a scoped function so
the existing own-enrollment read policy does not have to expose student rows.

Before applying it, confirm that your admin account can sign in and create a
second admin account for recovery. A profile trigger prevents browser users
from changing their own role or demoting the final admin. Keep SQL Editor
access available during rollout. Do not use a normal SQL Editor query as an
RLS test: the `postgres` role bypasses policies.

After applying it, use dedicated student, instructor, and admin accounts plus
a logged-out browser to check:

| Actor | Allowed | Denied |
| --- | --- | --- |
| Logged out | Read public courses | Read profiles, enrollments, attendance, assignments, submissions, or results |
| Student | Read own profile/activity, enroll, submit work, take quizzes | Read another student's activity, change role, set quiz score or duration directly |
| Course owner | Read active students and course activity; manage own course and assignments | Read or modify another instructor's course activity |
| Admin | Read all LMS records, manage another user's role, create a course for an instructor | Demote the final admin or submit forged analytics directly |

Check course ownership, active enrollment, late resubmission, quiz retakes,
answer-key privacy, and that attendance duration grows only for a visible
page. For SQL-level checks, wrap each scenario in `BEGIN`/`ROLLBACK`, set
`ROLE authenticated` or `ROLE anon`, and set `request.jwt.claim.sub` to a
dedicated test user's UUID. Confirm `auth.uid()` returns that UUID before
testing. Use actual app sessions for the final end-to-end check.

For example, replace the UUID with a dedicated student account and run this
in the SQL Editor after applying the migration:

```sql
begin;
set local role authenticated;
select set_config('request.jwt.claim.sub', '<student-uuid>', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select auth.uid(), auth.role();
select id, role from public.profiles; -- Only the student's own profile.
select id, course_id from public.enrollments; -- Only own enrollments.
rollback;
```

Repeat with an instructor and admin UUID, and use `set local role anon` in a
separate transaction to confirm the public catalog is visible while private
tables are not. Attempt denied writes in their own rollback-only transactions;
an expected SQL error aborts that transaction. For update/delete tests, check
that the intended row actually changed or remained intact, because an RLS
filter can affect zero rows without raising an error.
