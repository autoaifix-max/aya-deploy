# إعداد الإشعارات — خطوات يدوية في Supabase

> بعد اكتمال هذه الخطوات، الإشعارات ستعمل بالكامل على جوال آية.

---

## **الخطوة ١: إضافة Secrets (٥ دقائق)**

1. اذهب إلى: https://app.supabase.com/project/vwzppnjxbmkdknzxyrle
2. اختر **Settings** (أسفل القائمة اليسار)
3. اختر **Edge Functions** من القائمة الفرعية
4. اضغط على **Secrets** (في الأعلى)
5. اضغط **Add new secret** وأضف الثلاثة:

### Secret ١:
```
Name: VAPID_PUBLIC
Value: BDTO_PlU8X0mcPsRQtnC1PWSOlNyAOmrlxFE1n3CYlHXbOFADapusmkbN4z-hep9PO78A0AQqzyAaG2gcB3MC10
```
اضغط **Add secret**

### Secret ٢:
```
Name: VAPID_PRIVATE
Value: KdgQ6hnPsUjXi1tzrKgrY0sfKh-43ng1VITo3egh6EU
```
اضغط **Add secret**

### Secret ٣:
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: sb_secret_2ACONng_ZY_c5NtX-1DEHQ_YQlsC_Gz
```
اضغط **Add secret**

✅ **النتيجة:** ستظهر الثلاثة في القائمة

---

## **الخطوة ٢: إنشاء Edge Function (٣ دقائق)**

1. من نفس Dashboard، اختر **Functions** (يسار الشاشة)
2. اضغط **Create a new function** (أزرق)
3. اسم الدالة: `send-reminders`
4. اختر **TypeScript**
5. اضغط **Create function**

**الآن ستفتح محرّر الكود:**
- احذف الكود الموجود بالكامل
- انسخ محتوى ملف `send-reminders.ts` من مجلد المشروع
- الصقه في المحرّر
- اضغط **Deploy**

✅ **النتيجة:** ستظهر رسالة "Function deployed successfully"

---

## **الخطوة ٣: تفعيل Cron (٢ دقيقة)**

1. بعد Deploy، ستظهر صفحة الدالة `send-reminders`
2. اختر **Cron** (في الأعلى بجانب Console)
3. في حقل **Schedule:**
   ```
   */5 * * * *
   ```
4. اضغط **Save**

✅ **النتيجة:** ستظهر الـ Cron وتقول "Active"

---

## **التحقق:**

- افتح `index.html` على جوالك (Chrome، Android)
- اضغط **تفعيل الإشعارات**
- أضفِ التطبيق للشاشة الرئيسية
- استثني التطبيق من توفير البطارية (إعدادات البطارية)

**عند حلول وقت التذكير الأول (٨:٠٠ صباحاً):** ستصل إشعارات حتى لو التطبيق مغلق 🎉

---

## **ملاحظات:**

- مفاتيح VAPID جديدة كل مرة، لا تحتاج للتغيير
- الـ Cron يعمل بتوقيت UTC+3 (السعودية)
- أي مشكلة؟ تحقق من Supabase Logs في Dashboard
