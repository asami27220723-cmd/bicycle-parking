self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));

self.addEventListener('message', e => {
  if (e.data.type !== 'UPDATE_BADGE') return;
  const nums = e.data.nums;
  self.registration.getNotifications({ tag: 'bicycle-badge' }).then(list => {
    list.forEach(n => n.close());
    if (nums.length > 0) {
      self.registration.showNotification('🚲 自転車置場', {
        body: `${nums.join('・')}番 に停車中`,
        icon: './icon.svg',
        badge: './icon.svg',
        tag: 'bicycle-badge',
        silent: true,
        renotify: true
      });
    }
  });
});
