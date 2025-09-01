const CACHE_NAME = 'mefk-cache-v1';
const FILES_TO_CACHE = [
  'mefk/',
  'mefk/index.html',
  'mefk/libs/FileSaver.min.js',
  'mefk/libs/jszip.min.js',
  'mefk/libs/marked.min.js',
  'mefk/libs/MindElixir.js',
  'mefk/images/apple-touch-icon.png',
  'mefk/images/favicon-16.png',
  'mefk/images/favicon-32.png',
  'mefk/images/favicon-48.png',
  'mefk/images/favicon.ico',
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

