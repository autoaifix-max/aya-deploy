# 🌿 دليل آية الغذائي

> تطبيق ويب شخصي (PWA) لمتابعة تغذية الحمل — صُنع بحب من أبو مانع (أحمد) لزوجته آية 💚

## ✨ الميزات

### 📱 واجهة جديدة بالكامل (v2.0)
- **Bottom Navigation** مع 5 تبويبات سهلة الوصول
- تصميم **mobile-first** محسّن للجوال
- **Dark Mode** كامل
- **RTL** (اتجاه اليمين لليسار) محسّن

### 📅 اليوم (Today)
- ملخص يومي سريع
- عداد التقدم الغذائي
- تتبع أكواب الماء
- قائمة مهام يومية

### 💭 حالتي (My Status)
- اختيار الحالة الحالية (غثيان، تعب، دوخة...)
- **تكامل مع Claude AI** للحصول على نصائح فورية
- كشف آلي للحالات الطارئة
- تصنيف المخاطر (طبيعي/احذري/طارئ)

### 🍎 احتياجات الجسم (Body Needs)
- قائمة العناصر الغذائية الأساسية
- تتبع تفصيلي لأكواب الماء
- نسبة الإكمال المرئية

### 👨‍⚕️ الطبيبة (Doctor)
- تسجيل مواعيد الطبيبة
- قائمة الأسئلة الموصى بها
- معلومات عن التحاليل المتوقعة
- حفظ محلي للمواعيد

### 🔔 التنبيهات (Alerts)
- علامات تحذيرية للحالات الطارئة
- قائمة الأشياء المحظورة
- معلومات طبية موثوقة

### 💬 تواصل سريع
- زر WhatsApp ثابت: "أحتاجك يا أحمد"
- إرسال رسالة تلقائية إلى أبو مانع

### 📡 المزامنة السحابية
- Supabase للنسخ الاحتياطي
- Web Push Notifications (إشعارات الويب)
- Service Worker (عمل بدون انترنت)
- تثبيت على الجوال (PWA)

---

## 🚀 الإعداد

### المتطلبات
- حساب Vercel (مجاني)
- حساب Supabase (مجاني)
- ANTHROPIC_API_KEY (مفتاح Claude API)

### الخطوات

#### 1️⃣ نسخ المشروع
```bash
git clone https://github.com/autoaifix-max/aya-deploy.git
cd aya-deploy
```

#### 2️⃣ إعدادات Vercel
```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

#### 3️⃣ إضافة البيانات السرية
في **Vercel Dashboard**:
1. اذهب إلى **Settings > Environment Variables**
2. أضف:
   ```
   Name: ANTHROPIC_API_KEY
   Value: [مفتاح Claude API الخاص بك]
   Environments: Production
   ```

#### 4️⃣ تكوين Supabase
في `index.html` و `dashboard.html`:
```js
var SUPA_URL='https://your-project.supabase.co';
var SUPA_KEY='your-anon-key';  // مفتاح عام (آمن)
var FAMILY_ID='your-family-uuid';
```

#### 5️⃣ إنشاء قاعدة البيانات
اذهب إلى **Supabase Dashboard > SQL Editor** وشغّل:
```sql
-- انسخ محتوى SUPABASE_SCHEMA.sql
```

#### 6️⃣ تفعيل الإشعارات (اختياري)
اتبع `SETUP_PUSH_NOTIFICATIONS.md`

---

## 📁 هيكل المشروع

```
aya-deploy/
├── index.html              # التطبيق الرئيسي (5 تبويبات)
├── dashboard.html          # لوحة Abu Manea (الأب)
├── js/
│   └── app.js              # منطق التطبيق
├── api/
│   └── symptom-advice.ts   # وظيفة Claude على Vercel
├── sw.js                   # Service Worker
├── manifest.json           # معلومات PWA
├── send-reminders.ts       # Edge Function للإشعارات
├── vercel.json             # إعدادات النشر
├── package.json            # المكتبات
└── tsconfig.json           # إعدادات TypeScript
```

---

## 🔐 الأمان

### ✅ آمن تماماً
- `SUPABASE_KEY` (anon key) → مفتاح عام محمي بـ RLS
- `ANTHROPIC_API_KEY` → في Vercel Environment Variables فقط
- لا توجد مفاتيح سرية في GitHub

### ⚠️ تحذير
**لا تضع أبداً:**
- `ANTHROPIC_API_KEY` في الملفات
- `SUPABASE_SERVICE_ROLE_KEY` في GitHub
- أي بيانات سرية في commit

---

## 🧪 الاختبار

### على الجوال
1. افتح: `https://aya-deploy-blond.vercel.app`
2. اختبر التبويبات الخمسة
3. جرب Claude AI (اختر حالة وأرسل)
4. اختبر WhatsApp (اضغط "أحتاجك يا أحمد")
5. أضف التطبيق للشاشة الرئيسية

### على الحاسوب
```bash
# بيئة محلية
npm install
npm run dev
```

---

## 🛠️ التطوير

### إضافة ميزة جديدة
1. عدّل `index.html` (HTML/CSS)
2. عدّل `js/app.js` (JavaScript)
3. اختبر محلياً: `npm run dev`
4. ادفع إلى GitHub: `git push`
5. Vercel سينشر تلقائياً

### إضافة وظيفة Vercel جديدة
1. أنشئ ملف في `api/`: `api/my-function.ts`
2. صِغه كمثال `api/symptom-advice.ts`
3. ادفع و Vercel سيدريها تلقائياً

---

## 🐛 استكشاف الأخطاء

### السؤال: "التطبيق لا يحمل"
**الحل:**
1. تحقق من Vercel Logs: **Deployments > {latest} > Logs**
2. افتح Console (F12): هل توجد أخطاء؟
3. تحقق من اتصال الانترنت

### السؤال: "Claude AI لا يرد"
**الحل:**
1. هل أضفت `ANTHROPIC_API_KEY` في Vercel؟
2. هل المفتاح صحيح؟
3. شغّل `vercel env pull` لتنزيل البيانات محلياً

### السؤال: "الإشعارات لا تأتي"
**الحل:**
1. تحقق من Supabase Logs
2. هل جهاز آية مشترك في الإشعارات؟ (انظر `push_subscriptions`)
3. استثن التطبيق من توفير البطارية

---

## 📞 الدعم

### للمشاكل التقنية
- Vercel Logs: https://vercel.com
- Supabase Logs: https://app.supabase.com
- Anthropic API Docs: https://docs.anthropic.com

### للأسئلة عن الحمل
⚠️ **هذا التطبيق للتذكير والدعم فقط، وليس بديلاً عن الطبيبة!**

---

## 📝 الترخيص

MIT License — استخدم وعدّل بحرية

---

## 🎯 الخطط المستقبلية

- [ ] رسوم بيانية أسبوعية متقدمة
- [ ] تتبع الأعراض على مدى الوقت
- [ ] تنبيهات مخصصة أكثر
- [ ] تقرير أسبوعي لـ Abu Manea
- [ ] تكامل مع تطبيقات الصحة الأخرى

---

**صُنع بحب 💚 من أبو مانع لآية**
آخر تحديث: 2026-06-29
