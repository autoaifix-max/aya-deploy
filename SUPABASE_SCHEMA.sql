-- ============================================================
--  دليل آية الغذائي — مخطط قاعدة بيانات Supabase
--  شغّل هذا الملف كاملاً في:  Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1) جدول العائلة: سجل واحد يربط جهاز آية وجهاز أبو مانع
create table if not exists public.family (
  id          uuid primary key default gen_random_uuid(),
  name        text default 'عائلة آية',
  created_at  timestamptz default now()
);

-- 2) السجل اليومي: صف واحد لكل يوم (القائمة + الماء)
create table if not exists public.daily_logs (
  id              uuid primary key default gen_random_uuid(),
  family_id       uuid not null references public.family(id) on delete cascade,
  log_date        date not null,
  checklist       jsonb not null default '{}'::jsonb,   -- {"folic":true,"bfast":false,...}
  water_count     int  not null default 0,
  pregnancy_week  int,
  notes           text,
  updated_at      timestamptz default now(),
  unique (family_id, log_date)
);

create index if not exists idx_daily_logs_family_date
  on public.daily_logs (family_id, log_date desc);

-- 3) تفعيل حماية الصفوف (RLS)
alter table public.family     enable row level security;
alter table public.daily_logs enable row level security;

-- 4) السياسات
--    تطبيق عائلي خاص: المعرّف العائلي (UUID) غير قابل للتخمين ويعمل كمفتاح وصول.
--    (للتشديد لاحقًا: يمكن التحويل إلى Supabase Auth — انظر ملاحظة الأمان في SETUP.md)
create policy "family read"   on public.family     for select to anon using (true);
create policy "logs read"     on public.daily_logs for select to anon using (true);
create policy "logs insert"   on public.daily_logs for insert to anon with check (true);
create policy "logs update"   on public.daily_logs for update to anon using (true) with check (true);

-- 5) أنشئ سجل العائلة — انسخ قيمة id الناتجة وضعها في FAMILY_ID داخل index.html و dashboard.html
insert into public.family (name) values ('عائلة آية')
returning id;

-- ============================================================
--  بعد التشغيل: ستظهر قيمة id (مثل 3f9a...). هذه هي FAMILY_ID.
--  احصل أيضًا على:
--    SUPA_URL  من:  Project Settings > Data API > Project URL
--    SUPA_KEY  من:  Project Settings > API Keys > anon public
-- ============================================================
