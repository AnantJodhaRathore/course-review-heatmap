-- Course Review Heatmap schema
-- Run this in the Supabase SQL editor if you want a real backend.

create table if not exists public.courses (
  id text primary key,
  code text not null,
  title text not null,
  department text not null,
  professor text not null,
  semester text not null,
  year integer not null,
  enrollment integer not null default 0,
  avg_rating numeric(3, 1) not null default 0,
  difficulty numeric(3, 1) not null default 0,
  workload_hours integer not null default 0,
  attendance_required boolean not null default false,
  grade_distribution jsonb not null default '{"A":0,"B":0,"C":0,"D":0,"F":0}'::jsonb,
  tags text[] not null default '{}',
  created_at timestamp with time zone default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  difficulty integer not null check (difficulty between 1 and 5),
  workload_hours integer not null check (workload_hours between 1 and 40),
  grade text not null check (grade in ('A', 'B', 'C', 'D', 'F')),
  reviewer_type text not null check (reviewer_type in ('Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate')),
  comment text not null check (char_length(comment) >= 12),
  created_at timestamp with time zone default now()
);

alter table public.courses enable row level security;
alter table public.reviews enable row level security;

create policy "Courses are public to read"
  on public.courses for select
  using (true);

create policy "Reviews are public to read"
  on public.reviews for select
  using (true);

create policy "Anyone can insert a review"
  on public.reviews for insert
  with check (true);
