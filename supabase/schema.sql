-- LoveGift — Supabase setup. Paste into the Supabase SQL editor and run.

-- 1. Table
create table if not exists gifts (
  slug          text primary key,        -- nanoid 8 char
  gender        text not null,            -- 'cewe' | 'cowo'
  recipient     text not null,
  sender        text not null,
  opening_msg   text default '',
  quotes        jsonb default '[]',
  photos        jsonb default '[]',
  music_type    text default 'spotify',   -- 'spotify' | 'youtube'
  music_id      text default '',
  theme         text default 'rose',      -- 'rose' | 'midnight' | 'sunset'
  created_at    timestamptz default now()
);

-- 2. Row Level Security: public can read; writes go through the service role
--    (server-side) which bypasses RLS.
alter table gifts enable row level security;

drop policy if exists "public read gifts" on gifts;
create policy "public read gifts" on gifts
  for select using (true);

-- 3. Storage bucket for photos (public read).
insert into storage.buckets (id, name, public)
values ('gift-photos', 'gift-photos', true)
on conflict (id) do nothing;
