-- =====================================================================
-- FUJI JAPANESE ACADEMY: ROLLBACK SCRIPT FOR 20261026 MIGRATION
-- Migration: 20261026_rollback.sql
-- Date: October 26, 2026
-- Description:
--   Safely reverts 20261026_security_hardening.sql changes in reverse order.
-- =====================================================================

-- Drop function verify_certificate
drop function if exists public.verify_certificate(text);

-- Drop certificates policies and table
drop policy if exists "Only admins can manage certificates" on public.certificates;
drop table if exists public.certificates cascade;

-- Revert payments table
drop policy if exists "Admins can view and manage payments" on public.payments;
drop policy if exists "Students can view own payments" on public.payments;
drop table if exists public.payments cascade;

-- Revert inquiries policies
drop policy if exists "Anyone can submit inquiry" on public.inquiries;
drop policy if exists "Only admins can view inquiries" on public.inquiries;
drop policy if exists "Only admins can manage inquiries" on public.inquiries;

-- Revert leads policies
drop policy if exists "Anyone can insert leads" on public.leads;
drop policy if exists "Only admins can view and manage leads" on public.leads;

-- Revert content policies
drop policy if exists "Anyone can read jobs" on public.jobs;
drop policy if exists "Admins can manage jobs" on public.jobs;

drop policy if exists "Anyone can read blogs" on public.blogs;
drop policy if exists "Admins can manage blogs" on public.blogs;

drop policy if exists "Anyone can read free courses" on public.free_courses;
drop policy if exists "Admins can manage free courses" on public.free_courses;

drop policy if exists "Anyone can read courses" on public.courses;
drop policy if exists "Admins can manage courses" on public.courses;

-- Revert enrollments policies to previous state
drop policy if exists "Users can view own enrollments" on public.enrollments;
drop policy if exists "Admins or service role can manage enrollments" on public.enrollments;
drop policy if exists "Users can delete own enrollments" on public.enrollments;

-- Revert profiles policies to previous state
drop policy if exists "Users can view own profile or admin" on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;

-- Revert RBAC functions and user_roles table
drop policy if exists "Users can view own roles or admin" on public.user_roles;
drop policy if exists "Only admins can manage roles" on public.user_roles;
drop function if exists public.is_admin();
drop function if exists public.has_role(uuid, text);
drop table if exists public.user_roles cascade;

-- Restore legacy fallback admin helper if required
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    auth.jwt() ->> 'email' = 'fujijapaneseacademy@gmail.com'
  );
end;
$$ language plpgsql security definer;
