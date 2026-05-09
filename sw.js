self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));

self.addEventListener('message', e => {
  if (e.data.type !== 'UPDATE_BADGE') return;
  const count = e.data.count;
  self.registration.getNotifications({ tag: 'bicycle-badge' }).then(list => {
    list.forEach(n => n.close());
    if (count > 0) {
      self.registration.showNotification('🚲 自転車置場', {
        body: `使用中 ${count} 台`,
        icon: './icon.svg',
        badge: './icon.svg',
        tag: 'bicycle-badge',
        silent: true,
        renotify: false
      });
    }
  });
});
