// Service Worker — caching + notifications
const CACHE = 'aya-guide-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

// Show a local notification when the page asks for one
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'notify') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      lang: 'ar',
      dir: 'rtl',
      tag: e.data.tag || 'aya',
      vibrate: [120, 60, 120]
    });
  }
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});

// Web Push — يُستقبل من Supabase Edge Function (يعمل حتى لو التطبيق مغلق)
self.addEventListener('push', (e) => {
  let d = { title: 'دليل آية 🌿', body: 'تذكير لطيف 🤍' };
  try { if (e.data) d = e.data.json(); } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    lang: 'ar',
    dir: 'rtl',
    tag: d.tag || 'aya-push',
    renotify: true,
    vibrate: [120, 60, 120]
  }));
});
