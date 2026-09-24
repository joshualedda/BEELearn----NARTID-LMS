-- Review existing policies before applying in the Supabase SQL editor.
-- This migration intentionally does not replace the existing signup trigger.
-- The catalog assumes all courses are public: no publication column exists.
begin;

-- Abort rather than delete historical duplicates.
do $$
begin
  if exists (
    select 1 from public.enrollments
    group by user_id, course_id having count(*) > 1
  ) then
    raise exception 'Duplicate enrollments exist. Review and reconcile them before applying this migration.';
  end if;
end;
$$;

create unique index if not exists beelearn_enrollments_user_course_unique
  on public.enrollments (user_id, course_id);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;

-- Users may read their own trusted profile. Restrictive guards also constrain
-- any broader policies already present; service-role maintenance is unaffected.
grant select on public.profiles to authenticated;
create policy beelearn_profile_read on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy beelearn_profile_read_guard on public.profiles as restrictive
  for select to authenticated using (id = (select auth.uid()));
create policy beelearn_profile_anonymous_guard on public.profiles as restrictive
  for all to anon using (false) with check (false);
create policy beelearn_profile_insert_guard on public.profiles as restrictive
  for insert to authenticated with check (id = (select auth.uid()) and role = 'student');
create policy beelearn_profile_update_guard on public.profiles as restrictive
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy beelearn_profile_delete_guard on public.profiles as restrictive
  for delete to authenticated using (false);

-- An own-profile UPDATE policy alone must not allow self-promotion.
create or replace function public.beelearn_protect_profile_identity()
returns trigger language plpgsql set search_path = '' as $$
begin
  if (select auth.role()) in ('anon', 'authenticated') and
     (new.role is distinct from old.role or new.id is distinct from old.id) then
    raise exception 'Profile identity and role can only be changed by an administrator.';
  end if;
  return new;
end;
$$;
create trigger beelearn_protect_profile_identity
before update on public.profiles for each row
execute function public.beelearn_protect_profile_identity();

-- Grant only catalog columns to anonymous visitors, not profiles or enrollments.
grant select (id, title, description, instructor_id, created_at) on public.courses to anon, authenticated;
create policy beelearn_catalog_read on public.courses
  for select to anon, authenticated using (true);

grant select, insert on public.enrollments to authenticated;
create policy beelearn_enrollment_read on public.enrollments
  for select to authenticated using (user_id = (select auth.uid()));
create policy beelearn_enrollment_read_guard on public.enrollments as restrictive
  for select to authenticated using (user_id = (select auth.uid()));
create policy beelearn_enrollment_anonymous_guard on public.enrollments as restrictive
  for all to anon using (false) with check (false);

create policy beelearn_enrollment_insert on public.enrollments
  for insert to authenticated with check (
    user_id = (select auth.uid()) and status = 'active'
    and exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role::text in ('student', 'learner'))
    and exists (select 1 from public.courses c where c.id = enrollments.course_id)
  );
create policy beelearn_enrollment_insert_guard on public.enrollments as restrictive
  for insert to authenticated with check (
    user_id = (select auth.uid()) and status = 'active'
    and exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role::text in ('student', 'learner'))
    and exists (select 1 from public.courses c where c.id = enrollments.course_id)
  );
-- Withdrawal, grading, and staff enrollment management are not implemented yet.
create policy beelearn_enrollment_update_guard on public.enrollments as restrictive
  for update to authenticated using (false) with check (false);
create policy beelearn_enrollment_delete_guard on public.enrollments as restrictive
  for delete to authenticated using (false);

commit;
