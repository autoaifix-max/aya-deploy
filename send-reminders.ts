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
