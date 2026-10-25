-- Run once in the Supabase SQL editor.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  mode text not null check (mode in ('join','trial')),
  name text not null,
  phone text not null,
  email text,
  age int,
  gender text,
  plan text,
  billing text,
  batch text,
  goal text,
  personal_training boolean default false,
  joining_date date,
  message text,
  status text not null default 'new'
);

-- The API route uses the service role key (bypasses RLS). Block all public access:
alter table public.leads enable row level security;
