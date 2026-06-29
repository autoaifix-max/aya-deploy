# 🚀 خطوات النشر — دليل آية v2.0

## الحالة الحالية
- ✅ جميع الملفات تم إنشاؤها محلياً
- ✅ تم إنشاء 2 commits محلي
- ⏳ بانتظار الرفع إلى GitHub

---

## الطريقة الأولى: رفع يدوي عبر GitHub Web (الأسهل) ✅

### الخطوة 1️⃣: اذهب إلى مستودع GitHub
افتح: https://github.com/autoaifix-max/aya-deploy

### الخطوة 2️⃣: انقر على "Add file" > "Upload files"
![image]
1. في الصفحة الرئيسية للمستودع
2. اضغط على الزر الأخضر "Code" (أعلى يسار)
3. انقر على "Upload files"

### الخطوة 3️⃣: اسحب الملفات التالية

#### الملفات التي تحتاج إلى تحديث أو إنشاء:

**ملفات جديدة تماماً:**
```
📁 api/
  └── symptom-advice.ts

📁 js/
  └── app.js

├── .gitignore
├── README.md
├── REDESIGN_NOTES.md
├── IMPLEMENTATION_SUMMARY.md
├── DEPLOY_INSTRUCTIONS.md
├── package.json
├── tsconfig.json
└── vercel.json
```

**ملفات معدّلة:**
```
├── index.html (معدّل بالكامل)
└── SETUP_PUSH_NOTIFICATIONS.md (إزالة مفتاح سري)
```

### الخطوة 4️⃣: الرسالة (Commit message)

**العنوان:**
```
🎨 تصميم شامل جديد مع Claude AI و Bottom Navigation
```

**الوصف:**
```
تحديثات رئيسية:
✨ واجهة جديدة بـ 5 تبويبات مع Bottom Navigation
🤖 تكامل Claude AI عبر Vercel Function (آمن)
💬 زر WhatsApp سريع: أحتاجك يا أحمد
🔔 نظام تنبيهات محسّن مع كشف الحالات الطارئة
💾 حفظ محلي آمن + Supabase للمزامنة
🌙 Dark Mode كامل
🔐 إزالة جميع البيانات السرية

الملفات المضافة: api/*, js/*, .gitignore, *.json
الملفات المعدّلة: index.html, SETUP_PUSH_NOTIFICATIONS.md
```

### الخطوة 5️⃣: اختر "Commit directly to master branch"

### الخطوة 6️⃣: اضغط "Commit changes"

✅ **تم!** GitHub سيحفظ الملفات و Vercel سينشر تلقائياً

---

## الطريقة الثانية: استخدام GitHub CLI (متقدم)

### المتطلبات
```bash
# تثبيت GitHub CLI
# من: https://cli.github.com
```

### الخطوات
```bash
# 1. تحقق من حالة Git
cd "C:\New folder (8)\aya-handoff"
git status

# 2. تأكد من أن جميع التغييرات مرحلة
git add -A

# 3. سجّل الدخول إلى GitHub
gh auth login
# اختر: GitHub.com
# اختر: HTTPS
# أجب: Y (اختر "Paste an authentication token")
# الصق رمزك من: https://github.com/settings/tokens/new

# 4. ادفع التغييرات
git push origin master
```

---

## الطريقة الثالثة: استخدام GitHub Desktop (بسيط)

### الخطوات
1. ثبّت GitHub Desktop من: https://desktop.github.com
2. أضف المستودع المحلي: **File > Add Local Repository**
3. اختر المجلد: `C:\New folder (8)\aya-handoff`
4. اختر الملفات المراد رفعها (جميعها)
5. اكتب رسالة الـ commit
6. اضغط **Commit to master**
7. اضغط **Push origin**

---

## التحقق من النشر

### بعد الرفع بـ 30-60 ثانية:

#### 1️⃣ تحقق من GitHub
```
https://github.com/autoaifix-max/aya-deploy
```
يجب أن ترى الملفات الجديدة

#### 2️⃣ تحقق من Vercel
```
https://vercel.com/dashboard
```
يجب أن ترى: **"aya-deploy-blond › Latest Deployment"**

#### 3️⃣ افتح التطبيق
```
https://aya-deploy-blond.vercel.app
```

---

## إعدادات Vercel المطلوبة بعد الرفع

### ⚙️ أضف ANTHROPIC_API_KEY

1. اذهب إلى: https://vercel.com/dashboard/aya-deploy-blond
2. اضغط على **Settings**
3. اختر **Environment Variables**
4. أضف:
   ```
   Name: ANTHROPIC_API_KEY
   Value: sk-ant-v0-... (مفتاح Claude API)
   ```
5. اختر **Production** و **Preview**
6. اضغط **Save**

### ⚡ أعد تشغيل الدالة

1. اذهب إلى **Deployments**
2. اضغط على آخر deployment
3. اضغط **Redeploy**

---

## الاختبار على جوال آية

### 1. افتح الرابط
```
https://aya-deploy-blond.vercel.app
```

### 2. اختبر التبويبات
- [ ] 📅 **اليوم** (Today)
  - اختبر عداد الماء
  - اختبر قائمة المهام

- [ ] 💭 **حالتي** (My Status)
  - اختر حالة
  - أضف ملاحظة
  - اضغط "احصلي على نصيحة"
  - تحقق من رد Claude AI

- [ ] 🍎 **احتياجات الجسم** (Body Needs)
  - اختبر أزرار الماء (+/-)
  - شاهد قائمة العناصر

- [ ] 👨‍⚕️ **الطبيبة** (Doctor)
  - أدخل موعد
  - اضغط "حفظ"
  - أعد فتح التطبيق والتحقق من الحفظ

- [ ] 🔔 **التنبيهات** (Alerts)
  - اقرأ التحذيرات
  - اقرأ الأشياء المحظورة

### 3. اختبر الميزات الإضافية
- [ ] 🌙 Dark Mode (اضغط الزر العلوي الأيسر)
- [ ] 💬 WhatsApp (اضغط "أحتاجك يا أحمد")
- [ ] 📱 تثبيت PWA (Menu > Install app)

---

## استكشاف الأخطاء

### ❌ الصفحة بيضاء / لا تحمل
```
1. اضغط F12 (فتح Console)
2. ابحث عن الأحمر/الأخطاء
3. تحقق من: https://vercel.com/dashboard/aya-deploy-blond/logs
```

### ❌ Claude AI لا يرد
```
1. هل أضفت ANTHROPIC_API_KEY في Vercel؟
2. هل المفتاح صحيح؟
3. تحقق من Logs: https://vercel.com/.../logs
```

### ❌ الماء/القائمة لا تُحفظ
```
1. اضغط F12 > Application > Local Storage
2. تحقق من: water_* و checklist_*
3. إذا لم توجد، جرّب Reload (Ctrl+R)
```

---

## الملفات المراد رفعها تفصيلاً

### 📁 api/ (مجلد جديد)
```
api/
└── symptom-advice.ts (442 أسطر)
```
**الوصف:** وظيفة Vercel تتصل بـ Claude API

### 📁 js/ (مجلد جديد)
```
js/
└── app.js (467 أسطر)
```
**الوصف:** كل منطق التطبيق (tabs, water, dark mode, etc)

### 📄 .gitignore (جديد)
**الوصف:** يحمي البيانات السرية من Git

### 📄 vercel.json (جديد)
**الوصف:** إعدادات Vercel الأساسية

### 📄 package.json (جديد)
**الوصف:** المكتبات والـ scripts

### 📄 tsconfig.json (جديد)
**الوصف:** إعدادات TypeScript

### 📄 README.md (جديد)
**الوصف:** دليل شامل للمشروع

### 📄 REDESIGN_NOTES.md (جديد)
**الوصف:** ملخص التصميم الجديد

### 📄 IMPLEMENTATION_SUMMARY.md (جديد)
**الوصف:** ملخص التنفيذ الكامل

### 📄 DEPLOY_INSTRUCTIONS.md (جديد)
**الوصف:** هذا الملف (خطوات النشر)

### 📄 index.html (معدّل)
**التغييرات:**
- استبدال الهيكل بالكامل
- إضافة Bottom Navigation
- 5 تبويبات جديدة
- تكامل js/app.js

### 📄 SETUP_PUSH_NOTIFICATIONS.md (معدّل)
**التغييرات:**
- إزالة مفتاح Supabase السري (السطر 32)
- استبدال بـ placeholder آمن

---

## ✅ قائمة التحقق النهائية

قبل الرفع:
- [ ] قرأت IMPLEMENTATION_SUMMARY.md
- [ ] لديّ ANTHROPIC_API_KEY
- [ ] اختبرت التطبيق محلياً

بعد الرفع:
- [ ] أضفت ANTHROPIC_API_KEY في Vercel
- [ ] أعدت تشغيل Deployment في Vercel
- [ ] اختبرت على جوال آية
- [ ] كل التبويبات تعمل بشكل صحيح

---

## 📞 للمساعدة

### إذا حدثت مشكلة في الرفع
```
1. تحقق من رسالة الخطأ على GitHub
2. تأكد من أن الملفات موجودة محلياً
3. جرّب الطريقة الأخرى (Web upload بدلاً من CLI)
```

### إذا لم يتم النشر تلقائياً
```
1. اذهب إلى Vercel Dashboard
2. اضغط على "Redeploy"
3. انتظر 2-3 دقائق
```

---

## 🎉 بعد النجاح

### أرسل الرابط إلى آية
```
https://aya-deploy-blond.vercel.app
```

### اطلب الملاحظات
- هل الواجهة سهلة؟
- هل Claude AI يساعد؟
- هل الماء يُحفظ؟
- هل الألوان تنجح معها؟

### العديل بناءً على التعليقات
1. عدّل الملفات محلياً
2. اختبر
3. ادفع إلى GitHub
4. Vercel سيحدّث تلقائياً

---

**صُنع بحب 💚**
**أحمد لآية**
**2026-06-29**
