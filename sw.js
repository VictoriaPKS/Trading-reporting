self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('tj-cache-v1').then(cache => {
    return cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './icons/icon-192.png',
      './icons/icon-512.png'
    ]);
  }));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== 'tj-cache-v1').map(k => caches.delete(k)))
  ));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});