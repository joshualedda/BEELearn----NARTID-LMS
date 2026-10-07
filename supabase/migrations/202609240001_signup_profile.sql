-- Run in the Supabase SQL Editor after creating public.profiles.
-- Creates a profile when Supabase Auth creates a user. The role column is
-- omitted so the profiles table assigns its default 'learner' value.
begin;

create schema if not exists private;

create or replace function private.beelearn_create_signup_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

revoke all on function private.beelearn_create_signup_profile() from public, anon, authenticated;

do $$
begin
  if exists (
    select 1 from pg_catalog.pg_trigger
    where tgrelid = 'auth.users'::pg_catalog.regclass
      and not tgisinternal
      and (tgtype & 4) = 4 -- INSERT trigger
  ) then
    raise exception 'auth.users already has an INSERT trigger. Inspect it before adding a second signup trigger.';
  end if;

  create trigger beelearn_create_signup_profile
    after insert on auth.users
    for each row execute function private.beelearn_create_signup_profile();
end;
$$;

-- The new public table must not expose all profile rows through the API.
alter table public.profiles enable row level security;
revoke insert on public.profiles from public, anon, authenticated;
grant select on public.profiles to authenticated;
grant insert (id) on public.profiles to authenticated;
create policy beelearn_profile_self_read on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy beelearn_profile_self_insert on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));

commit;
