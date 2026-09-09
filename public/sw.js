// @ts-nocheck
/* Retire the previous Pixyll service worker and its cache on this origin. */
const LEGACY_CACHE = 'pixyll2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await caches.delete(LEGACY_CACHE);
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
