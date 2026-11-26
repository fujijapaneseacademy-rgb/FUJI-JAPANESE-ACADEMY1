-- =====================================================================
-- FUJI JAPANESE ACADEMY: SECURITY & AUTHORIZATION HARDENING MIGRATION
-- Migration: 20261026_security_hardening.sql
-- Date: October 26, 2026
-- Description:
--   1. Authoritative certificates table with status & masked lookup RPC
--   2. Dedicated user_roles RBAC table & server-enforced is_admin() / has_role()
--   3. Row Level Security policies preventing cross-student data leakage
--   4. Idempotent payment & enrollment tracking
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. EXTENSIONS
-- ---------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- 2. USER ROLES & SERVER-ENFORCED RBAC
-- ---------------------------------------------------------------------
create table if not exists public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('admin', 'instructor', 'student')),
  created_at timestamptz default timezone('utc'::text, now()),
  unique (user_id, role)
);

create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_user_roles_role on public.user_roles(role);

alter table public.user_roles enable row level security;

-- Function: has_role (Security Definer, explicitly search_path secured)
create or replace function public.has_role(check_user_id uuid, check_role text)
returns boolean as $$
  select exists (
    select 1 from public.user_roles
    where user_id = check_user_id and role = check_role
  );
$$ language sql security definer set search_path = public;

-- Function: is_admin (Security Definer, evaluates caller auth.uid() against user_roles)
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$ language sql security definer set search_path = public;

-- RLS: user_roles
drop policy if exists "Users can view own roles or admin" on public.user_roles;
create policy "Users can view own roles or admin"
  on public.user_roles for select
  using ( auth.uid() = user_id or public.is_admin() );

drop policy if exists "Only admins can manage roles" on public.user_roles;
create policy "Only admins can manage roles"
  on public.user_roles for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- ---------------------------------------------------------------------
-- 3. AUTHORITATIVE CERTIFICATES REGISTRY & PUBLIC VERIFICATION RPC
-- ---------------------------------------------------------------------
create table if not exists public.certificates (
  id uuid default gen_random_uuid() primary key,
  certificate_id text not null unique,
  student_name text not null,
  student_email text,
  course_name text not null,
  jlpt_level text not null,
  issue_date date not null,
  expiry_date date,
  status text not null check (status in ('issued', 'revoked', 'expired')),
  grade text default 'Pass',
  issuing_authority text default 'Fuji Japanese Academy Academic Council, Bengaluru',
  revocation_reason text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

create index if not exists idx_certificates_cert_id on public.certificates(certificate_id);
create index if not exists idx_certificates_status on public.certificates(status);

alter table public.certificates enable row level security;

-- Certificates table is NOT readable directly by anon to prevent bulk data scraping.
-- Only administrators or verified service roles can query raw records.
drop policy if exists "Only admins can manage certificates" on public.certificates;
create policy "Only admins can manage certificates"
  on public.certificates for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- Authoritative RPC function for single certificate verification
-- Returns masked student name and minimal verification payload without leaking PII.
create or replace function public.verify_certificate(p_cert_id text)
returns jsonb as $$
declare
  v_cert record;
  v_clean_id text;
  v_masked_name text;
  v_name_parts text[];
  v_first text;
  v_last text;
begin
  if p_cert_id is null or length(trim(p_cert_id)) = 0 then
    return jsonb_build_object(
      'status', 'NOT_FOUND',
      'error', 'Invalid certificate identifier'
    );
  end if;

  v_clean_id := upper(trim(p_cert_id));

  -- Lookup certificate record
  select * into v_cert
  from public.certificates
  where certificate_id = v_clean_id;

  if not found then
    return jsonb_build_object(
      'status', 'NOT_FOUND',
      'certificateId', v_clean_id,
      'message', 'No matching certificate found in academy records'
    );
  end if;

  -- Check status: Revoked
  if v_cert.status = 'revoked' then
    return jsonb_build_object(
      'status', 'REVOKED',
      'certificateId', v_cert.certificate_id,
      'courseCompleted', v_cert.course_name,
      'issueDate', to_char(v_cert.issue_date, 'FMMonth DD, YYYY'),
      'revocationReason', coalesce(v_cert.revocation_reason, 'Revoked by Academic Council'),
      'issuingAuthority', v_cert.issuing_authority
    );
  end if;

  -- Check status: Expired
  if v_cert.status = 'expired' or (v_cert.expiry_date is not null and v_cert.expiry_date < current_date) then
    return jsonb_build_object(
      'status', 'EXPIRED',
      'certificateId', v_cert.certificate_id,
      'courseCompleted', v_cert.course_name,
      'issueDate', to_char(v_cert.issue_date, 'FMMonth DD, YYYY'),
      'expiryDate', to_char(coalesce(v_cert.expiry_date, v_cert.issue_date), 'FMMonth DD, YYYY'),
      'issuingAuthority', v_cert.issuing_authority
    );
  end if;

  -- Mask student name for privacy: "Rahul M. Sharma" -> "Rahul S." / "A**** B****"
  v_name_parts := regexp_split_to_array(trim(v_cert.student_name), '\s+');
  if array_length(v_name_parts, 1) = 1 then
    v_masked_name := v_name_parts[1];
  elsif array_length(v_name_parts, 1) > 1 then
    v_first := v_name_parts[1];
    v_last := v_name_parts[array_length(v_name_parts, 1)];
    v_masked_name := v_first || ' ' || left(v_last, 1) || '.';
  else
    v_masked_name := 'Verified Scholar';
  end if;

  -- Valid & Authentic
  return jsonb_build_object(
    'status', 'AUTHENTIC',
    'certificateId', v_cert.certificate_id,
    'studentName', v_masked_name,
    'courseCompleted', v_cert.course_name,
    'jlptLevelEquivalent', v_cert.jlpt_level,
    'issueDate', to_char(v_cert.issue_date, 'FMMonth DD, YYYY'),
    'grade', coalesce(v_cert.grade, 'Pass (Certified)'),
    'issuingAuthority', v_cert.issuing_authority
  );
end;
$$ language plpgsql security definer set search_path = public;

-- Grant execution of verify_certificate to public / anon
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- Seed authentic records for historical official verifications
insert into public.certificates (
  certificate_id, student_name, student_email, course_name, jlpt_level, issue_date, status, grade, issuing_authority
) values
  (
    'FJA-2026-N5-8841',
    'Rahul M. Sharma',
    'rahul.sharma@example.com',
    'JLPT N5 Foundation Japanese Program',
    'JLPT N5 Proficiency',
    '2026-10-15',
    'issued',
    'A+ (Pass with Distinction)',
    'Fuji Japanese Academy Academic Council, Bengaluru'
  ),
  (
    'FJA-2026-N4-4192',
    'Sneha Venkatesh',
    'sneha.v@example.com',
    'JLPT N4 Elementary & Spoken Immersion',
    'JLPT N4 Proficiency',
    '2026-09-28',
    'issued',
    'A (High Distinction)',
    'Fuji Japanese Academy Academic Council, Bengaluru'
  ),
  (
    'FJA-2026-N3-1024',
    'Karthik Subbaraman',
    'karthik.s@example.com',
    'Japanese for IT Professionals & JLPT N3',
    'JLPT N3 Business & Tech',
    '2026-08-10',
    'issued',
    'A+ (Honors - Placed in Tokyo)',
    'Fuji Japanese Academy Academic Council, Bengaluru'
  ),
  (
    'FJA-2025-N5-REVOKED',
    'Test Disqualified Student',
    'revoked.student@example.com',
    'JLPT N5 Foundation Japanese Program',
    'JLPT N5',
    '2025-05-10',
    'revoked',
    'Revoked',
    'Fuji Japanese Academy Academic Council, Bengaluru'
  ),
  (
    'FJA-2024-N5-EXPIRED',
    'Test Expired Student',
    'expired.student@example.com',
    'Short-Term Immersion Certificate',
    'Elementary Japanese',
    '2024-01-15',
    'expired',
    'Completed',
    'Fuji Japanese Academy Academic Council, Bengaluru'
  )
on conflict (certificate_id) do update set
  student_name = excluded.student_name,
  course_name = excluded.course_name,
  jlpt_level = excluded.jlpt_level,
  status = excluded.status,
  updated_at = now();

-- ---------------------------------------------------------------------
-- 4. HARDENED ROW LEVEL SECURITY FOR CORE TABLES
-- ---------------------------------------------------------------------

-- Enrollments table
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id text not null,
  course_title text not null,
  status text default 'active' check (status in ('active', 'completed', 'cancelled', 'pending')),
  progress integer default 0 check (progress >= 0 and progress <= 100),
  enrolled_at timestamptz default timezone('utc'::text, now()),
  unique(user_id, course_id)
);

alter table public.enrollments enable row level security;

drop policy if exists "Users can view own enrollments" on public.enrollments;
drop policy if exists "Users can enroll themselves" on public.enrollments;
drop policy if exists "Admins or service role can manage enrollments" on public.enrollments;
drop policy if exists "Users can delete own enrollments" on public.enrollments;

create policy "Users can view own enrollments" 
  on public.enrollments for select 
  using ( auth.uid() = user_id or public.is_admin() );

-- Students CANNOT insert or update enrollments directly from client!
create policy "Admins or service role can manage enrollments" 
  on public.enrollments for all 
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Users can delete own enrollments"
  on public.enrollments for delete
  using ( auth.uid() = user_id or public.is_admin() );

-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  email text,
  updated_at timestamptz default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile or admin" on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;

create policy "Users can view own profile or admin" on public.profiles
  for select using ( auth.uid() = id or public.is_admin() );

create policy "Users can insert their own profile." on public.profiles
  for insert with check ( auth.uid() = id or public.is_admin() );

create policy "Users can update own profile." on public.profiles
  for update using ( auth.uid() = id or public.is_admin() );

create policy "Users can delete own profile" on public.profiles
  for delete using ( auth.uid() = id or public.is_admin() );

-- Inquiries table (Public leads submission, Admin-only reads)
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  course text,
  message text,
  form_type text default 'Inquiry',
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit inquiry" on public.inquiries;
drop policy if exists "Only admins can view inquiries" on public.inquiries;
drop policy if exists "Only admins can update inquiries" on public.inquiries;

create policy "Anyone can submit inquiry" on public.inquiries
  for insert with check ( true );

create policy "Only admins can view inquiries" on public.inquiries
  for select using ( public.is_admin() );

create policy "Only admins can manage inquiries" on public.inquiries
  for all using ( public.is_admin() ) with check ( public.is_admin() );

-- Payments table (Authoritative transaction log)
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  order_id text not null unique,
  cf_order_id text,
  payment_id text unique,
  customer_email text not null,
  customer_phone text,
  course_id text not null,
  course_name text not null,
  amount_inr numeric(10,2) not null,
  currency text default 'INR',
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  raw_payload jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

create index if not exists idx_payments_order_id on public.payments(order_id);
create index if not exists idx_payments_customer_email on public.payments(customer_email);

alter table public.payments enable row level security;

create policy "Admins can view and manage payments" on public.payments
  for all using ( public.is_admin() ) with check ( public.is_admin() );

create policy "Students can view own payments" on public.payments
  for select using ( auth.uid() in (select id from auth.users where email = customer_email) );

-- ---------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY FOR COURSES, CONTENT & LEADS
-- ---------------------------------------------------------------------

-- Courses table
alter table if exists public.courses enable row level security;
drop policy if exists "Anyone can read courses" on public.courses;
drop policy if exists "Admins can manage courses" on public.courses;

create policy "Anyone can read courses" on public.courses
  for select using ( true );

create policy "Admins can manage courses" on public.courses
  for all using ( public.is_admin() ) with check ( public.is_admin() );

-- Free Courses table
alter table if exists public.free_courses enable row level security;
drop policy if exists "Anyone can read free courses" on public.free_courses;
drop policy if exists "Admins can manage free courses" on public.free_courses;

create policy "Anyone can read free courses" on public.free_courses
  for select using ( true );

create policy "Admins can manage free courses" on public.free_courses
  for all using ( public.is_admin() ) with check ( public.is_admin() );

-- Blogs table
alter table if exists public.blogs enable row level security;
drop policy if exists "Anyone can read blogs" on public.blogs;
drop policy if exists "Admins can manage blogs" on public.blogs;

create policy "Anyone can read blogs" on public.blogs
  for select using ( true );

create policy "Admins can manage blogs" on public.blogs
  for all using ( public.is_admin() ) with check ( public.is_admin() );

-- Jobs table
alter table if exists public.jobs enable row level security;
drop policy if exists "Anyone can read jobs" on public.jobs;
drop policy if exists "Admins can manage jobs" on public.jobs;

create policy "Anyone can read jobs" on public.jobs
  for select using ( true );

create policy "Admins can manage jobs" on public.jobs
  for all using ( public.is_admin() ) with check ( public.is_admin() );

-- Leads table (Public lead submission, admin-only reads & management)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  phone text,
  course text,
  message text,
  form_type text default 'Lead',
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.leads enable row level security;
drop policy if exists "Anyone can insert leads" on public.leads;
drop policy if exists "Only admins can view and manage leads" on public.leads;

create policy "Anyone can insert leads" on public.leads
  for insert with check ( true );

create policy "Only admins can view and manage leads" on public.leads
  for all using ( public.is_admin() ) with check ( public.is_admin() );

