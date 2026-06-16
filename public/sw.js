const CACHE = 'aprendojs-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.18/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.18/addon/hint/show-hint.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  if (url.href.includes('codemirror')) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request).then((response) => {
        if (response && response.status === 200 && url.origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
      return cached || fetched;
    })
  );
});
