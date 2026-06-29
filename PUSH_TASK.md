# PUSH_TASK.md — بناء إشعارات Push الحقيقية + محرّر التذكيرات

> الهدف: إشعارات تصل لجوال آية (Samsung Galaxy A25 5G / أندرويد) حتى لو التطبيق مغلق،
> بأوقات قابلة للتعديل من لوحة أبو مانع. كله مجاني (Supabase + Vercel).

اتبع الخطوات بالترتيب. اسأل أحمد قبل أي خطوة تكلّف مال. التزم بقواعد CLAUDE.md.

---

## ① قاعدة البيانات
شغّل `PUSH_SCHEMA.sql` في Supabase (ينشئ جدولي `reminders` و `push_subscriptions` ويعبّئ الأوقات).

## ② مفاتيح VAPID
ولّد زوج مفاتيح VAPID (مثلاً عبر `npx web-push generate-vapid-keys`).
- ضع `VAPID_PUBLIC` و `VAPID_PRIVATE` كـ **Secrets** في Supabase Edge Functions.
- ضع **القيمة العامة فقط** (`VAPID_PUBLIC`) كثابت في `index.html` (CONFIG) باسم `VAPID_PUBLIC`.

## ③ Edge Function للإرسال
أنشئ Edge Function باسم `send-reminders` (Deno). مرجع جاهز للتكييف:

```ts
import webpush from 'npm:web-push@3'
import { createClient } from 'npm:@supabase/supabase-js@2'

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
webpush.setVapidDetails('mailto:abumane@diagpro.tech', Deno.env.get('VAPID_PUBLIC')!, Deno.env.get('VAPID_PRIVATE')!)

Deno.serve(async () => {
  const now = new Date(Date.now() + 3 * 3600 * 1000)   // توقيت السعودية UTC+3
  const today = now.toISOString().slice(0, 10)
  const h = now.getUTCHours(), m = now.getUTCMinutes()

  const { data: rem } = await supabase.from('reminders').select('*').eq('enabled', true)
  const due = (rem || []).filter(r => r.hour === h && Math.abs(r.minute - m) < 5 && r.last_sent !== today)
  if (!due.length) return new Response('none')

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  for (const r of due) {
    for (const s of subs || []) {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify({ title: 'دليل آية 🌿', body: `${r.emoji} ${r.title}`, tag: 'rem-' + r.id })
        )
      } catch (e) {
        // اشتراك ميّت → احذفه
        if (String(e).includes('410') || String(e).includes('404')) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', s.endpoint)
        }
      }
    }
    await supabase.from('reminders').update({ last_sent: today }).eq('id', r.id)
  }
  return new Response('sent ' + due.length)
})
```

## ④ الجدولة (Cron)
شغّل الدالة **كل ٥ دقائق** (من Supabase Cron / pg_cron). نافذة الـ ٥ دقائق + `last_sent` يمنعان التكرار.

## ⑤ اشتراك آية بالإشعارات (في index.html)
- `sw.js` جاهز مسبقًا (فيه معالج `push`). لا تكرّره.
- أضف زر «تفعيل الإشعارات» يطلب الإذن ثم يشترك ويحفظ الاشتراك:

```js
function b64ToUint8(s){const p='='.repeat((4-s.length%4)%4);const b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...b].map(c=>c.charCodeAt(0)));}
async function enablePush(){
  if(!('serviceWorker'in navigator)||!('PushManager'in window))return;
  const perm=await Notification.requestPermission(); if(perm!=='granted')return;
  const reg=await navigator.serviceWorker.ready;
  const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64ToUint8(VAPID_PUBLIC)});
  const j=sub.toJSON();
  await supa.from('push_subscriptions').upsert(
    {family_id:FAMILY_ID,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth},
    {onConflict:'endpoint'}
  );
}
```

## ⑥ شاشة ترحيب لآية (أول فتح)
اعرض بطاقة ترحيب لطيفة (بنفس نظام التصميم) فيها ٣ خطوات:
1. **زر «فعّلي التذكيرات»** → يستدعي `enablePush()`.
2. **«أضيفي التطبيق للشاشة الرئيسية»** → استمعي لحدث `beforeinstallprompt` وأظهري زر تثبيت؛ وإن لم يتوفر، اعرضي تعليمات: قائمة Chrome ⋮ → «إضافة إلى الشاشة الرئيسية».
3. **«اسمحي بالإشعارات في الخلفية» (مهم لسامسونج)**: نص لطيف يطلب استثناء التطبيق من توفير البطارية: الإعدادات → البطارية → التطبيق → غير مقيّد/Unrestricted.
- خزّن في localStorage أن الترحيب اكتمل حتى لا يتكرر.

## ⑦ محرّر التذكيرات (في dashboard.html — لأبو مانع)
أضف قسمًا «التذكيرات» يقرأ/يكتب جدول `reminders`:
- قائمة بالتذكيرات (إيموجي + اسم + وقت + مفتاح تشغيل).
- تعديل الوقت والاسم، تبديل التفعيل، حذف.
- زر «+ إضافة تذكير» (إيموجي + اسم + وقت) — مثل سناك فاكهة ١٠ص.
- الإشعارات تقرأ من نفس الجدول تلقائيًا، فأي تعديل يسري من الغد.

## ⑧ التحقق
1. على جوال آية (Chrome): افتح الرابط، فعّل الإشعارات، أضِف للشاشة الرئيسية.
2. اختبر يدويًا: استدعِ Edge Function أو أضِف تذكيرًا بعد دقيقتين وتأكد وصول الإشعار والتطبيق مغلق.
3. من لوحة أبو مانع: عدّل وقتًا وأضف وجبة، وتأكد أنها تظهر.
4. `commit` + `push`.

## ملاحظات
- أندرويد لا يشترط الإضافة للشاشة الرئيسية للإشعارات، لكنها تحسّن التجربة.
- لا تمسّ الإهداء ولا التنويه الطبي. ملف واحد لكل صفحة، بدون framework.
