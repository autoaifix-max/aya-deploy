-- ============================================================
--  إضافة الإشعارات (Push) — شغّل هذا بعد SUPABASE_SCHEMA.sql
-- ============================================================

-- 1) جدول التذكيرات (قابل للتعديل من لوحة أبو مانع)
create table if not exists public.reminders (
  id          uuid primary key default gen_random_uuid(),
  family_id   uuid references public.family(id) on delete cascade,
  emoji       text default '🔔',
  title       text not null,
  hour        int  not null,            -- 0..23 (بتوقيت السعودية)
  minute      int  not null default 0,  -- 0..59
  enabled     boolean default true,
  sort        int default 0,
  last_sent   date,                     -- لمنع التكرار في نفس اليوم
  created_at  timestamptz default now()
);
alter table public.reminders enable row level security;
create policy "rem read"   on public.reminders for select to anon using (true);
create policy "rem insert" on public.reminders for insert to anon with check (true);
create policy "rem update" on public.reminders for update to anon using (true) with check (true);
create policy "rem delete" on public.reminders for delete to anon using (true);

-- 2) جدول اشتراكات Push (جهاز آية)
create table if not exists public.push_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  family_id   uuid references public.family(id) on delete cascade,
  endpoint    text unique not null,
  p256dh      text not null,
  auth        text not null,
  created_at  timestamptz default now()
);
alter table public.push_subscriptions enable row level security;
create policy "sub read"   on public.push_subscriptions for select to anon using (true);
create policy "sub insert" on public.push_subscriptions for insert to anon with check (true);
create policy "sub delete" on public.push_subscriptions for delete to anon using (true);

-- 3) التعبئة الأولية بالأوقات المتفق عليها
insert into public.reminders (family_id, emoji, title, hour, minute, sort) values
  ((select id from public.family limit 1), '🍳', 'وقت الفطور', 8, 0, 1),
  ((select id from public.family limit 1), '💊', 'حمض الفوليك — لا تنسيه', 9, 0, 2),
  ((select id from public.family limit 1), '💧', 'اشربي كوب ماء', 11, 0, 3),
  ((select id from public.family limit 1), '🥗', 'وقت الغداء', 13, 30, 4),
  ((select id from public.family limit 1), '💧', 'اشربي كوب ماء', 16, 0, 5),
  ((select id from public.family limit 1), '🌙', 'عشاء خفيف وحليب دافئ', 20, 0, 6);
