# Supabase Database Setup & Security Hardening

To set up and run the Fuji Japanese Academy backend, apply the versioned migrations located in `supabase/migrations/`:
- `supabase/migrations/20261026_security_hardening.sql`: Full hardened schema (RBAC, user_roles, authoritative certificates, secure RLS, payment tracking).
- `supabase/migrations/20261026_rollback.sql`: Reversible rollback script.

## 1. Open Supabase SQL Editor

Go to your [Supabase Dashboard](https://supabase.com/dashboard), select your project, and go to the **SQL Editor** tab.

## 2. Server-Enforced RBAC & Schema Setup

Run `supabase/migrations/20261026_security_hardening.sql` or paste the SQL below:

```sql
-- 0. USER ROLES & RBAC HELPER FUNCTIONS
create table if not exists public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('admin', 'instructor', 'student')),
  created_at timestamptz default timezone('utc'::text, now()),
  unique (user_id, role)
);

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$ language sql security definer set search_path = public;

-- 1. ENROLLMENTS TABLE
create table if not exists enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  course_id text not null,
  course_title text not null,
  status text default 'active', -- active, completed
  progress integer default 0,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Prevent duplicates
  unique(user_id, course_id)
);

-- Enable RLS
alter table enrollments enable row level security;

-- Drop insecure policies
drop policy if exists "Users can view own enrollments" on enrollments;
drop policy if exists "Users can enroll themselves" on enrollments;
drop policy if exists "Admins or service role can manage enrollments" on enrollments;

-- Secure policies:
-- Users can view their own enrollments, Admins can view all
create policy "Users can view own enrollments" 
  on enrollments for select 
  using ( auth.uid() = user_id or public.is_admin() );

-- Only Admins and verified backend (service role) can create enrollments
create policy "Admins or service role can manage enrollments" 
  on enrollments for all 
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 2. PROFILES TABLE (Store student full name & phone)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  updated_at timestamp with time zone
);

alter table profiles enable row level security;

-- Drop insecure policies
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;
drop policy if exists "Users can view own profile or admin" on profiles;

-- Secure policies:
-- Only the user or an admin can view private profile info (protects student phone numbers and names)
create policy "Users can view own profile or admin" on profiles
  for select using ( auth.uid() = id or public.is_admin() );

create policy "Users can insert their own profile." on profiles
  for insert with check ( auth.uid() = id or public.is_admin() );

create policy "Users can update own profile." on profiles
  for update using ( auth.uid() = id or public.is_admin() );


-- 3. COURSES TABLE
create table if not exists courses (
    id text primary key, -- "N5", "N4", etc.
    title text not null,
    price text not null,
    level text not null, -- "Beginner", "Intermediate", etc.
    "jlptLevel" text,
    duration text,
    image text,
    description text,
    features jsonb default '[]'::jsonb
);

alter table courses enable row level security;
drop policy if exists "Public can view courses" on courses;
drop policy if exists "Admins can manage courses" on courses;

create policy "Public can view courses" on courses for select using (true);
create policy "Admins can manage courses" on courses for all
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 4. BLOGS TABLE
create table if not exists blogs (
    id text primary key,
    title text not null,
    excerpt text,
    date text,
    category text,
    image text,
    content text,
    related_link text
);

alter table blogs enable row level security;
drop policy if exists "Public can view blogs" on blogs;
drop policy if exists "Admins can manage blogs" on blogs;

create policy "Public can view blogs" on blogs for select using (true);
create policy "Admins can manage blogs" on blogs for all
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 5. JOBS TABLE (Careers)
create table if not exists jobs (
  id text primary key,
  title text not null,
  department text,
  type text,
  location text,
  description text,
  requirements jsonb default '[]'::jsonb,
  active boolean default true
);

alter table jobs enable row level security;
drop policy if exists "Public can view jobs" on jobs;
drop policy if exists "Admins can manage jobs" on jobs;

create policy "Public can view jobs" on jobs for select using (true);
create policy "Admins can manage jobs" on jobs for all
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 6. FREE COURSES TABLE
create table if not exists free_courses (
  id text primary key,
  title text not null,
  description text,
  type text,
  duration text,
  image text,
  resource_link text
);

alter table free_courses enable row level security;
drop policy if exists "Public can view free_courses" on free_courses;
drop policy if exists "Admins can manage free_courses" on free_courses;

create policy "Public can view free_courses" on free_courses for select using (true);
create policy "Admins can manage free_courses" on free_courses for all
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 7. INQUIRIES TABLE
create table if not exists inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text,
  email text,
  phone text,
  subject text,
  message text,
  status text default 'new', -- new, read, replied
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table inquiries enable row level security;
drop policy if exists "Admins can manage inquiries" on inquiries;
drop policy if exists "Public can insert inquiries" on inquiries;

create policy "Public can insert inquiries" on inquiries for insert with check (true);
create policy "Admins can manage inquiries" on inquiries for all
  using ( public.is_admin() )
  with check ( public.is_admin() );


-- 7. USER MANAGEMENT TRIGGER
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing; -- Safe if profile already exists
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists
drop trigger if exists on_auth_user_created on auth.users;

-- Re-create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

## 3. Verify

Run this script again in the SQL Editor. It should now complete successfully without duplicate policy errors.
