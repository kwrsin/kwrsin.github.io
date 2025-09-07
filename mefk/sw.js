const CACHE_NAME = 'mefk-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './libs/FileSaver.min.js',
  './libs/jszip.min.js',
  './libs/marked.min.js',
  './libs/MindElixir.js',
  './libs/normalize.css',
  './images/apple-touch-icon.png',
  './images/favicon-16.png',
  './images/favicon-32.png',
  './images/favicon-48.png',
  './images/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

