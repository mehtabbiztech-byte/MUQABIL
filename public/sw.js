const CACHE_NAME = 'muqabil-shell-v7';
const BASE_URL = new URL('./', self.registration.scope).toString();
const APP_SHELL = [BASE_URL, new URL('manifest.webmanifest', BASE_URL).toString(), new URL('muqabil-icon.svg', BASE_URL).toString()];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('muqabil-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

const cacheResponse = (request, response) => {
  if (!response.ok || response.type !== 'basic') return Promise.resolve(response);
  return caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response.clone()))
    .then(() => response);
};

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Do not intercept non-GET, external, API, dev tools, or source module requests
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(new URL(BASE_URL).pathname) ||
    url.pathname.includes('/api/') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.includes('/@') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.tsx') ||
    url.pathname.endsWith('.jsx') ||
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.hostname.includes('ais-') ||
    url.hostname.endsWith('.run.app') ||
    url.hostname.includes('e2b.app') ||
    url.port === '3000'
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => (await caches.match(request)) || (await caches.match(BASE_URL)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => cacheResponse(request, response));
    })
  );
});
