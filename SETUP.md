# SETUP.md — إعداد لمرة واحدة (ثم تعديل بالمطالبة فقط)

الهدف: بعد هذه الخطوات، تطلب أي تعديل بالعربي من Claude Code → يصير live بدون نشر يدوي.

---

## ① ثبّت تطبيق Claude Code (Desktop)
- نزّل تطبيق Claude Code لسطح المكتب (macOS / Windows) وسجّل الدخول بحساب Claude المدفوع.
- يخليك تعدّل بالمحادثة بدون terminal.

## ② جهّز المشروع على GitHub
1. أنشئ ريبو جديد (مثلاً `aya-guide`).
2. ارفع كل ملفات هذا المجلد إليه.
   - تقدر تطلب من Claude Code: «أنشئ ريبو وارفع هذي الملفات».

## ③ اربط Vercel بالنشر التلقائي
1. من لوحة Vercel: **Add New → Project → Import** الريبو.
2. Framework Preset: **Other** (موقع ثابت، بدون build).
3. **Deploy**. بعدها أي push على الريبو ينشر تلقائيًا.
4. احصل على رابطك: `xxx.vercel.app`.

## ④ أنشئ مشروع Supabase
1. من supabase.com أنشئ مشروعًا جديدًا.
2. افتح **SQL Editor → New query**، الصق محتوى `SUPABASE_SCHEMA.sql` كاملاً، ثم **Run**.
3. انسخ ثلاث قيم:
   - **FAMILY_ID**: قيمة `id` التي ظهرت بعد التشغيل.
   - **SUPA_URL**: من Project Settings → Data API → Project URL.
   - **SUPA_KEY**: من Project Settings → API Keys → **anon public**.

## ⑤ عبّئ الإعدادات
ضع القيم الثلاث في كتلة CONFIG أعلى **كلا** الملفين بنفس القيم:
- `index.html`  (تطبيق آية)
- `dashboard.html`  (لوحتك)

> اطلب من Claude Code: «عبّئ SUPA_URL و SUPA_KEY و FAMILY_ID بالقيم التالية في الملفين» وألصق القيم.

## ⑥ (اختياري) اربط الـ MCP داخل Claude Code
- أضف Supabase و GitHub كـ MCP ليتولّى Claude Code قاعدة البيانات والنشر مباشرة.

## ⑦ انشر وجرّب
- بعد تعبئة الإعدادات: `commit` + `push` (أو اطلبها من Claude Code) → Vercel ينشر.
- افتح `index.html` على جوال آية (وثبّتها كتطبيق: مشاركة → إضافة للشاشة الرئيسية).
- افتح `dashboard.html` على جوالك واحفظه كمرجعية.

---

## ملاحظة أمان (اقرأها)
الإعداد الحالي **بدون تسجيل دخول** لتسهيل استخدام آية. الحماية تعتمد على أن المعرّف العائلي (UUID) غير قابل للتخمين. هذا مقبول لتطبيق عائلي خاص ببيانات بسيطة. إذا رغبت بتشديد أعلى لاحقًا، اطلب من Claude Code التحويل إلى **Supabase Auth** (رابط سحري بالبريد) — سير عمل أكبر قليلًا لكنه أكثر أمانًا.

## أول رسالة لـ Claude Code
> «اقرأ CLAUDE.md و TASK.md، ونفّذ المطلوب.»
