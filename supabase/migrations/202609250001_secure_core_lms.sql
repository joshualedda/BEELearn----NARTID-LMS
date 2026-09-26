-- Run once in the Supabase SQL Editor. This replaces the two unapplied
-- beelearn migrations and preserves the existing auth.users signup trigger.
-- Run the preflight checks before enabling RLS; a failure rolls everything back.
begin;

do $$
begin
  if not exists (select 1 from public.profiles where role::text = 'admin') then
    raise exception 'Create and verify an admin profile before enabling RLS.';
  end if;
  if exists (select 1 from public.enrollments group by user_id, course_id having count(*) > 1) then
    raise exception 'Duplicate enrollments must be reconciled first.';
  end if;
  if exists (select 1 from public.submissions group by user_id, assignment_id having count(*) > 1) then
    raise exception 'Duplicate submissions must be reconciled first.';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'attendance_logs'
      and column_name = 'session_duration' and data_type in ('smallint','integer','bigint','numeric')
  ) then
    raise exception 'attendance_logs.session_duration must store numeric seconds.';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'assignments'
      and column_name = 'due_date' and data_type = 'timestamp with time zone'
  ) then
    raise exception 'assignments.due_date must be timestamp with time zone.';
  end if;
  if exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename in ('profiles','courses','enrollments','attendance_logs','assignments','submissions','quiz_results','quizzes')
      and left(policyname, 9) <> 'beelearn_'
  ) then
    raise exception 'Unrecognized LMS policies exist. Review them before running this script.';
  end if;
end;
$$;

-- Remove only policies owned by this project. This also handles a database
-- where an earlier beelearn policy was created while RLS remained disabled.
do $$
declare old_policy record;
begin
  for old_policy in
    select tablename, policyname from pg_policies
    where schemaname = 'public'
      and tablename in ('profiles','courses','enrollments','attendance_logs','assignments','submissions','quiz_results','quizzes')
      and left(policyname, 9) = 'beelearn_'
  loop
    execute format('drop policy %I on public.%I', old_policy.policyname, old_policy.tablename);
  end loop;
end;
$$;

create unique index if not exists beelearn_enrollments_user_course_unique on public.enrollments (user_id, course_id);
alter table public.submissions add column if not exists content text;
create unique index if not exists beelearn_submission_user_assignment_unique on public.submissions (user_id, assignment_id);
create index if not exists beelearn_assignments_course on public.assignments (course_id, due_date);
create index if not exists beelearn_attendance_user_course on public.attendance_logs (user_id, course_id, login_timestamp);
create index if not exists beelearn_quiz_results_user_course on public.quiz_results (user_id, course_id, attempt_date);

-- Step 5 stores answer keys with the quiz. Students receive questions through
-- a separate RPC that removes correctOptionId before returning JSON.
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null check (length(btrim(title)) between 1 and 200),
  questions jsonb not null check (jsonb_typeof(questions) = 'array' and jsonb_array_length(questions) > 0),
  created_at timestamptz not null default now()
);
create index if not exists beelearn_quizzes_course on public.quizzes (course_id, created_at);
do $$
begin
  if exists (select 1 from public.quiz_results r left join public.quizzes q on q.id = r.quiz_id where q.id is null) then
    raise exception 'Existing quiz results reference unknown quizzes; reconcile them first.';
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.quiz_results'::regclass and conname = 'beelearn_quiz_results_quiz_fk') then
    alter table public.quiz_results add constraint beelearn_quiz_results_quiz_fk
      foreign key (quiz_id) references public.quizzes(id);
  end if;
end;
$$;

-- Internal helpers avoid policy recursion between profiles, courses and
-- enrollments. Keep this schema out of Supabase's exposed API schemas.
create schema if not exists private;
revoke usage on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.beelearn_role()
returns text language sql stable security definer set search_path = '' as $$
  select p.role::text from public.profiles p where p.id = (select auth.uid());
$$;
create or replace function private.beelearn_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select private.beelearn_role() = 'admin';
$$;
create or replace function private.beelearn_owner(p_course_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.beelearn_role() = 'instructor' and exists (
    select 1 from public.courses c where c.id = p_course_id and c.instructor_id = (select auth.uid())
  );
$$;
create or replace function private.beelearn_active_student(p_course_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.beelearn_role() = 'student' and exists (
    select 1 from public.enrollments e where e.course_id = p_course_id
      and e.user_id = (select auth.uid()) and e.status = 'active'
  );
$$;
create or replace function private.beelearn_teaches_student(p_student_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.beelearn_role() = 'instructor' and exists (
    select 1 from public.profiles p
    join public.enrollments e on e.user_id = p.id
    join public.courses c on c.id = e.course_id
    where p.id = p_student_id and p.role::text = 'student'
      and e.status = 'active' and c.instructor_id = (select auth.uid())
  );
$$;
create or replace function private.beelearn_valid_instructor(p_instructor_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = p_instructor_id and p.role::text = 'instructor');
$$;
revoke all on function private.beelearn_role(), private.beelearn_admin(),
  private.beelearn_owner(uuid), private.beelearn_active_student(uuid),
  private.beelearn_teaches_student(uuid), private.beelearn_valid_instructor(uuid)
  from public, anon;
grant execute on function private.beelearn_role(), private.beelearn_admin(),
  private.beelearn_owner(uuid), private.beelearn_active_student(uuid),
  private.beelearn_teaches_student(uuid), private.beelearn_valid_instructor(uuid)
  to authenticated;

-- A self-update policy alone cannot prevent self-promotion. Keep the final
-- admin and profile identities intact, including when using the SQL Editor.
create or replace function private.beelearn_protect_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.id is distinct from old.id then raise exception 'Profile ID cannot change.'; end if;
  if new.role is distinct from old.role then
    if new.role::text not in ('student','instructor','admin') then raise exception 'Invalid profile role.'; end if;
    if old.role::text = 'admin' and new.role::text <> 'admin' and
      (select count(*) from public.profiles where role::text = 'admin') <= 1 then
      raise exception 'The final admin account cannot be demoted.';
    end if;
    if (select auth.role()) = 'authenticated' and
      (not private.beelearn_admin() or old.id = (select auth.uid())) then
      raise exception 'Only an admin may change another user role.';
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists beelearn_protect_profile_identity on public.profiles;
drop trigger if exists beelearn_protect_profile on public.profiles;
create trigger beelearn_protect_profile before update on public.profiles
  for each row execute function private.beelearn_protect_profile();
revoke all on function private.beelearn_protect_profile() from public, anon, authenticated;

-- Submission timestamps and lateness come from the database, including on
-- edits. An edit clears an old score so stale grading is not retained.
create or replace function private.beelearn_stamp_submission()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_course_id uuid; v_due_date timestamptz;
begin
  select a.course_id, a.due_date into v_course_id, v_due_date from public.assignments a where a.id = new.assignment_id;
  if v_course_id is null or not private.beelearn_active_student(v_course_id) then
    raise exception 'Active enrollment is required.';
  end if;
  if tg_op = 'UPDATE' and (new.user_id is distinct from old.user_id or new.assignment_id is distinct from old.assignment_id) then
    raise exception 'Submission identity cannot change.';
  end if;
  new.submitted_at := now();
  new.is_late := new.submitted_at > v_due_date;
  new.score := null;
  return new;
end;
$$;
drop trigger if exists beelearn_stamp_submission on public.submissions;
create trigger beelearn_stamp_submission before insert or update on public.submissions
  for each row execute function private.beelearn_stamp_submission();
revoke all on function private.beelearn_stamp_submission() from public, anon, authenticated;

-- Revoke inherited/default table access before granting the precise API
-- operations. Service-role maintenance and the SQL Editor remain available.
revoke all on table public.profiles, public.courses, public.enrollments,
  public.attendance_logs, public.assignments, public.submissions,
  public.quiz_results, public.quizzes from public, anon, authenticated;
grant select on public.profiles to authenticated;
grant insert (id, full_name, role) on public.profiles to authenticated;
grant update (full_name, role) on public.profiles to authenticated;
grant select on public.courses to anon, authenticated;
grant insert (title, description, instructor_id) on public.courses to authenticated;
grant update (title, description) on public.courses to authenticated;
grant delete on public.courses to authenticated;
grant select on public.enrollments to authenticated;
grant insert (user_id, course_id, status) on public.enrollments to authenticated;
grant select on public.attendance_logs to authenticated;
grant select on public.assignments to authenticated;
grant insert (course_id, title, due_date) on public.assignments to authenticated;
grant update (title, due_date) on public.assignments to authenticated;
grant delete on public.assignments to authenticated;
grant select on public.submissions to authenticated;
grant insert (assignment_id, user_id, content) on public.submissions to authenticated;
grant update (content) on public.submissions to authenticated;
grant select on public.quizzes to authenticated;
grant insert (course_id, title, questions) on public.quizzes to authenticated;
grant select on public.quiz_results to authenticated;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.attendance_logs enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.quiz_results enable row level security;
alter table public.quizzes enable row level security;

-- Profiles: own row, every row for admins, or active students in an
-- instructor's courses. Signup may insert only the caller's student profile.
create policy beelearn_profile_read on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select private.beelearn_admin()) or private.beelearn_teaches_student(id));
create policy beelearn_profile_insert on public.profiles for insert to authenticated
  with check (id = (select auth.uid()) and role::text = 'student');
-- Admins may manage other profiles; the trigger guards role changes.
create policy beelearn_profile_update on public.profiles for update to authenticated
  using (id = (select auth.uid()) or (select private.beelearn_admin()))
  with check (id = (select auth.uid()) or (select private.beelearn_admin()));

-- Courses: the catalog is public. Instructors manage only their own rows;
-- admins may create rows assigned to an instructor account.
create policy beelearn_course_read on public.courses for select to anon, authenticated using (true);
create policy beelearn_course_insert on public.courses for insert to authenticated
  with check (((select private.beelearn_role()) = 'instructor' and instructor_id = (select auth.uid()))
    or ((select private.beelearn_admin()) and private.beelearn_valid_instructor(instructor_id)));
create policy beelearn_course_update on public.courses for update to authenticated
  using (private.beelearn_owner(id)) with check (private.beelearn_owner(id));
create policy beelearn_course_delete on public.courses for delete to authenticated
  using (private.beelearn_owner(id));

-- Enrollments: active students create only their own enrollment. Owners and
-- admins may read enrollments for reporting; no client update/delete is granted.
create policy beelearn_enrollment_read on public.enrollments for select to authenticated
  using (user_id = (select auth.uid()) or private.beelearn_owner(course_id) or (select private.beelearn_admin()));
create policy beelearn_enrollment_insert on public.enrollments for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'active'
    and (select private.beelearn_role()) = 'student'
    and exists (select 1 from public.courses c where c.id = course_id));

-- Attendance: students see their own rows; owners and admins can read course
-- activity. Direct writes are intentionally absent: the validated RPCs below
-- insert sessions and bound duration updates for the risk-model data.
create policy beelearn_attendance_read on public.attendance_logs for select to authenticated
  using (user_id = (select auth.uid()) or private.beelearn_owner(course_id) or (select private.beelearn_admin()));

-- Assignments: active students, the course owner, and admins may read.
-- Only the owner may create, edit, or remove an assignment.
create policy beelearn_assignment_read on public.assignments for select to authenticated
  using (private.beelearn_active_student(course_id) or private.beelearn_owner(course_id) or (select private.beelearn_admin()));
create policy beelearn_assignment_insert on public.assignments for insert to authenticated
  with check (private.beelearn_owner(course_id));
create policy beelearn_assignment_update on public.assignments for update to authenticated
  using (private.beelearn_owner(course_id)) with check (private.beelearn_owner(course_id));
create policy beelearn_assignment_delete on public.assignments for delete to authenticated
  using (private.beelearn_owner(course_id));

-- Submissions: the learner sees their own work; the course owner and admins
-- can review it. Active enrollment is required to submit or revise text.
create policy beelearn_submission_read on public.submissions for select to authenticated
  using (user_id = (select auth.uid()) or (select private.beelearn_admin()) or exists (
    select 1 from public.assignments a where a.id = assignment_id and private.beelearn_owner(a.course_id)));
create policy beelearn_submission_insert on public.submissions for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (
    select 1 from public.assignments a where a.id = assignment_id and private.beelearn_active_student(a.course_id)));
create policy beelearn_submission_update on public.submissions for update to authenticated
  using (user_id = (select auth.uid()) and exists (
    select 1 from public.assignments a where a.id = assignment_id and private.beelearn_active_student(a.course_id)))
  with check (user_id = (select auth.uid()) and exists (
    select 1 from public.assignments a where a.id = assignment_id and private.beelearn_active_student(a.course_id)));

-- Quiz answer keys remain visible only to their instructor. A student-facing
-- RPC below returns questions without correctOptionId.
create policy beelearn_quiz_owner_read on public.quizzes for select to authenticated
  using (private.beelearn_owner(course_id));
create policy beelearn_quiz_owner_insert on public.quizzes for insert to authenticated
  with check (private.beelearn_owner(course_id));

-- Quiz results: own attempts, the course owner, or an admin can read.
-- Direct inserts are absent because callers must not choose their own score.
create policy beelearn_quiz_result_read on public.quiz_results for select to authenticated
  using (user_id = (select auth.uid()) or private.beelearn_owner(course_id) or (select private.beelearn_admin()));

-- Public RPC names match the Next.js application. Each definer function
-- verifies the caller and uses a pinned search path before bypassing RLS.
create or replace function public.start_course_session(p_session_id uuid, p_course_id uuid)
returns boolean language plpgsql volatile security definer set search_path = '' as $$
begin
  if not private.beelearn_active_student(p_course_id) then return false; end if;
  insert into public.attendance_logs (id, user_id, course_id, login_timestamp, session_duration)
    values (p_session_id, (select auth.uid()), p_course_id, now(), 0) on conflict (id) do nothing;
  return exists (select 1 from public.attendance_logs a
    where a.id = p_session_id and a.user_id = (select auth.uid()) and a.course_id = p_course_id);
end;
$$;
create or replace function public.update_course_session(p_session_id uuid, p_duration integer)
returns void language plpgsql volatile security definer set search_path = '' as $$
begin
  if p_duration < 0 then raise exception 'Invalid duration.'; end if;
  update public.attendance_logs a set session_duration = greatest(a.session_duration,
    least(p_duration, 86400, greatest(0, floor(extract(epoch from (now() - a.login_timestamp)))::integer)))
    where a.id = p_session_id and a.user_id = (select auth.uid())
      and private.beelearn_active_student(a.course_id);
end;
$$;
create or replace function public.course_quizzes_for_learner(p_course_id uuid)
returns table(id uuid, title text, questions jsonb)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.beelearn_active_student(p_course_id) then raise exception 'Active enrollment is required.'; end if;
  return query select q.id, q.title,
    (select coalesce(jsonb_agg(item.value - 'correctOptionId' order by item.ordinality), '[]'::jsonb)
     from jsonb_array_elements(q.questions) with ordinality as item(value, ordinality))
    from public.quizzes q where q.course_id = p_course_id order by q.created_at, q.id;
end;
$$;
create or replace function public.submit_quiz_attempt(p_quiz_id uuid, p_answers jsonb)
returns numeric language plpgsql volatile security definer set search_path = '' as $$
declare v_quiz public.quizzes%rowtype; v_question jsonb; v_correct integer := 0; v_total integer; v_score numeric;
begin
  select * into v_quiz from public.quizzes where id = p_quiz_id;
  if not found or not private.beelearn_active_student(v_quiz.course_id) then raise exception 'Quiz unavailable.'; end if;
  if jsonb_typeof(p_answers) is distinct from 'object' then raise exception 'Answers must be an object.'; end if;
  v_total := jsonb_array_length(v_quiz.questions);
  if (select count(*) from jsonb_object_keys(p_answers)) <> v_total then raise exception 'Answer every question.'; end if;
  for v_question in select value from jsonb_array_elements(v_quiz.questions) loop
    if not p_answers ? (v_question->>'id') or not exists (
      select 1 from jsonb_array_elements(v_question->'options') o
      where o->>'id' = p_answers->>(v_question->>'id')) then
      raise exception 'Invalid quiz answer.';
    end if;
    if p_answers->>(v_question->>'id') = v_question->>'correctOptionId' then v_correct := v_correct + 1; end if;
  end loop;
  v_score := round(100.0 * v_correct / v_total);
  insert into public.quiz_results (user_id, course_id, quiz_id, score, attempt_date)
    values ((select auth.uid()), v_quiz.course_id, p_quiz_id, v_score, now());
  return v_score;
end;
$$;
create or replace function public.instructor_enrollment_counts()
returns table(course_id uuid, student_count bigint)
language sql stable security definer set search_path = '' as $$
  select c.id, count(e.id) from public.courses c
  left join public.enrollments e on e.course_id = c.id and e.status = 'active'
  where private.beelearn_owner(c.id) group by c.id;
$$;
revoke all on function public.start_course_session(uuid,uuid), public.update_course_session(uuid,integer),
  public.course_quizzes_for_learner(uuid), public.submit_quiz_attempt(uuid,jsonb),
  public.instructor_enrollment_counts() from public, anon;
grant execute on function public.start_course_session(uuid,uuid), public.update_course_session(uuid,integer),
  public.course_quizzes_for_learner(uuid), public.submit_quiz_attempt(uuid,jsonb),
  public.instructor_enrollment_counts() to authenticated;

commit;
