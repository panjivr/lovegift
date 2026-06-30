-- LoveGift — Supabase schema
-- Run in Supabase Dashboard → SQL Editor → New query → Run

-- 1) gifts table (columns match src/lib/types.ts Gift)
create table if not exists public.gifts (
  slug         text primary key,
  gender       text not null check (gender in ('cewe','cowo')),
  recipient    text not null,
  sender       text not null,
  opening_msg  text default '',
  quotes       text[] default '{}',
  photos       text[] default '{}',
  music_type   text not null check (music_type in ('spotify','youtube')),
  music_id     text default '',
  theme        text not null check (theme in ('rose','midnight','sunset')),
  created_at   timestamptz default now()
);

-- 2) RLS: public can READ gifts (reads use the anon key).
--    Inserts go through the service-role key, which bypasses RLS.
alter table public.gifts enable row level security;

drop policy if exists "public read gifts" on public.gifts;
create policy "public read gifts"
  on public.gifts for select
  to anon, authenticated
  using (true);

-- 3) Public storage bucket for uploaded photos (PHOTO_BUCKET = 'gift-photos')
insert into storage.buckets (id, name, public)
values ('gift-photos', 'gift-photos', true)
on conflict (id) do update set public = true;

-- 4) Allow public read of objects in that bucket
drop policy if exists "public read gift-photos" on storage.objects;
create policy "public read gift-photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gift-photos');
