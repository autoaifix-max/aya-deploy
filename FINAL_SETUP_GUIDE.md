# 🚀 دليل الإعداد النهائي — نشر دليل آية

> **الحالة الحالية:** التطبيق كامل محلياً ✅  
> **المتطلب الآن:** إضافة المفاتيح والبيانات الشخصية

---

## 📋 ملخص سريع

البرنامج **جاهز تماماً**، لكن يحتاج بيانات شخصية:

1. **ANTHROPIC_API_KEY** → في Vercel (لـ Claude AI)
2. **Supabase Credentials** → في `index.html` و `dashboard.html` (للمزامنة)

كل خطوة موضحة أدناه بالتفصيل.

---

## ✅ الخطوة 1: رفع الكود إلى GitHub

### الخيار أ: GitHub Web Upload (الأسهل) ✨

```
1. اذهب إلى: https://github.com/autoaifix-max/aya-deploy
2. اضغط: "Add file" > "Upload files"
3. اسحب هذه الملفات:
   ✓ index.html (معدل بالكامل)
   ✓ js/app.js (معدل)
   
4. رسالة Commit:
   "💌 إضافة لمسات عاطفية دافئة من أحمد والبيبي"
   
5. اضغط: "Commit changes"
```

### الخيار ب: GitHub CLI

```bash
cd "C:\New folder (8)\aya-handoff"
gh auth login
git push origin master
```

✅ **بعد الرفع:** Vercel سينشر تلقائياً خلال 1-2 دقيقة

---

## 🔑 الخطوة 2: إضافة ANTHROPIC_API_KEY في Vercel

### مكان الإضافة:

```
1. اذهب إلى: https://vercel.com/dashboard
2. اختر project: "aya-deploy-blond"
3. اضغط: "Settings" (أعلى اليسار)
4. اختر من القائمة اليسار: "Environment Variables"
```

### إضافة المتغير:

```
┌─────────────────────────────────────────┐
│ Name:                                   │
│ ANTHROPIC_API_KEY                       │
├─────────────────────────────────────────┤
│ Value:                                  │
│ sk-ant-v0-xxxxxxxxxxxxxxxxxxxxxxxx      │ ← مفتاحك من Anthropic
├─────────────────────────────────────────┤
│ Environments:                           │
│ ✓ Production  ✓ Preview  ✗ Development │
└─────────────────────────────────────────┘
```

### أين تحصل على المفتاح:

```
1. اذهب إلى: https://console.anthropic.com/keys
2. اضغط: "Create new API key"
3. انسخ القيمة (تبدأ بـ sk-ant-v0-)
4. الصقها في Vercel
```

### بعد الإضافة:

```
✅ اضغط: "Save"
✅ Vercel سيعيد تشغيل التطبيق تلقائياً
⏳ انتظر 30 ثانية
✅ افتح التطبيق وجرب Claude AI
```

---

## 🌊 الخطوة 3: إضافة Supabase Credentials (اختياري - للمزامنة السحابية)

### لماذا؟

- **بدون Supabase:** البيانات تُحفظ محلياً فقط (localStorage)
- **مع Supabase:** النسخ الاحتياطي السحابي + مزامنة بين الأجهزة

### أين تحصل على البيانات:

**من Supabase Dashboard:**

```
1. اذهب إلى: https://app.supabase.com
2. اختر project
3. اذهب إلى: "Settings" (أسفل اليسار)
4. اختر: "API" من القائمة الفرعية
```

**ابحث عن:**

```
📌 Project URL
   → انسخها في: SUPA_URL

📌 anon public
   → انسخها في: SUPA_KEY

📌 FAMILY_ID
   → سؤال: إذا كنت أضفت العائلة من قبل:
     - اذهب إلى SQL Editor
     - شغّل: SELECT id FROM family LIMIT 1;
     - انسخ ال uuid
   → إذا لم تضف:
     - شغّل SUPABASE_SCHEMA.sql
     - انسخ ال id من النتيجة
```

### الإضافة في التطبيق:

**في `index.html` (السطر ~64):**

```html
<script>
  var SUPA_URL='https://your-project.supabase.co';      // ← هنا
  var SUPA_KEY='eyJhbGciOi...';                          // ← هنا
  var FAMILY_ID='00c5bd1d-38b7-...';                     // ← هنا
```

**في `dashboard.html` (السطر ~71):**

```html
<script>
  var SUPA_URL='https://your-project.supabase.co';      // ← نفس البيانات
  var SUPA_KEY='eyJhbGciOi...';
  var FAMILY_ID='00c5bd1d-38b7-...';
```

### ⚠️ تحذير أمني:

```
✅ SUPA_URL (عام - يمكن نشره)
✅ SUPA_KEY (anon key - محمي بـ RLS)
❌ SUPABASE_SERVICE_ROLE_KEY (سري - لا تضعه في GitHub)
```

### بعد الإضافة:

```
1. احفظ الملفات
2. اختبر المزامنة:
   - أضف ماء من "احتياجات الجسم"
   - انفتح Supabase Dashboard
   - تحقق من جدول daily_logs
```

---

## 🧪 الخطوة 4: الاختبار الكامل

### على الويب (من الحاسوب):

```
1. افتح: https://aya-deploy-blond.vercel.app
2. اختبر كل تبويب:
   ✓ اليوم (رسائل أحمد والبيبي)
   ✓ حالتي (Claude AI)
   ✓ احتياجات الجسم (الماء)
   ✓ الطبيبة (المواعيد)
   ✓ التنبيهات
3. اختبر الأزرار:
   ✓ Dark Mode
   ✓ WhatsApp الرئيسي
   ✓ الأزرار السريعة
```

### على الجوال (Samsung Galaxy A25):

```
1. افتح: https://aya-deploy-blond.vercel.app
2. اضغط Menu > "Install app"
3. أضف للشاشة الرئيسية
4. جرب كل شيء:
   ✓ الرسائل العاطفية تظهر؟
   ✓ Claude يرد على الحالات؟
   ✓ الماء يُحفظ؟
   ✓ الواتساب يفتح بالرسالة الصحيحة؟
```

---

## 🔧 استكشاف الأخطاء

### مشكلة: Claude AI لا يرد

**الحل:**

```
1. تحقق من ANTHROPIC_API_KEY في Vercel:
   Settings > Environment Variables > تأكد من وجوده

2. تحقق من المفتاح:
   - اذهب إلى https://console.anthropic.com/keys
   - هل المفتاح نشط؟

3. شغّل Vercel Logs:
   - Deployments > آخر deployment > Logs
   - ابحث عن أخطاء
```

### مشكلة: المزامنة لا تعمل

**الحل:**

```
1. تحقق من Supabase Credentials:
   - SUPA_URL صحيحة؟
   - SUPA_KEY صحيحة؟
   - FAMILY_ID صحيح؟

2. تحقق من Supabase Status:
   - اذهب إلى Supabase Dashboard
   - هل هناك أخطاء في Logs؟

3. بدلاً من ذلك:
   - استخدم localStorage (بدون Supabase)
   - البيانات تُحفظ محلياً
```

### مشكلة: الواتساب لا يفتح

**الحل:**

```
1. تحقق من رقم الهاتف:
   - اذهب إلى js/app.js
   - ابحث عن: AHMED_WHATSAPP_NUMBER
   - تأكد أنه: 966535473565

2. الرقم يجب أن يكون:
   - ✓ بدون +
   - ✓ بدون 00
   - ✓ بدون spaces
   - مثال: 966535473565
```

---

## 📱 النتيجة النهائية

بعد إكمال كل الخطوات:

```
✅ تطبيق كامل وآمن
✅ Claude AI يعمل
✅ Supabase مزامن
✅ رسائل أحمد والبيبي تظهر يومياً
✅ واتساب سريع وسهل
✅ Dark Mode يعمل
✅ PWA محفوظ
✅ جوال آية سعيدة 🎉
```

---

## 📞 ملخص المفاتيح المطلوبة

| المفتاح | مكان الإضافة | نوع البيانات | أمان |
|---------|-------------|------------|------|
| ANTHROPIC_API_KEY | Vercel Env Vars | sk-ant-v0-... | سري ✅ |
| SUPA_URL | index.html / dashboard.html | URL عام | عام ✅ |
| SUPA_KEY | index.html / dashboard.html | JWT (anon) | محمي ✅ |
| FAMILY_ID | index.html / dashboard.html | UUID | عام ✅ |

---

## ✨ التعليمات الأمنية الأخيرة

```
❌ لا تضع ANTHROPIC_API_KEY في GitHub
✅ استخدم Vercel Environment Variables فقط

❌ لا تضع SUPABASE_SERVICE_ROLE_KEY في أي مكان
✅ استخدم anon key محمي بـ RLS فقط

❌ لا تضع المفاتيح في commit messages
✅ استخدم آخر commit آمن
```

---

## 🎯 قائمة تفصيلية

- [ ] رفعت الملفات إلى GitHub
- [ ] أضفت ANTHROPIC_API_KEY في Vercel
- [ ] أضفت Supabase Credentials (أو قررت عدم استخدام Supabase)
- [ ] اختبرت التطبيق على الويب
- [ ] اختبرت التطبيق على جوال آية
- [ ] تحققت من Claude AI
- [ ] تحققت من الرسائل العاطفية
- [ ] تحققت من الواتساب

---

## 📝 ملاحظات نهائية

**إذا واجهت مشكلة:**

```
1. تحقق من البيانات المُدخلة (copy-paste دقيق)
2. انتظر 1-2 دقيقة لإعادة التشغيل
3. امسح cache المتصفح (Ctrl+Shift+Delete)
4. جرب متصفح مختلف
5. تحقق من Vercel/Supabase Logs
```

**إذا كل شيء يعمل:**

```
🎉 تهانينا!
التطبيق جاهز لآية
استمتع بـ الحمل الصحي والآمن 🤍
```

---

**صُنع بحب من أحمد لآية**  
**2026-06-29**
