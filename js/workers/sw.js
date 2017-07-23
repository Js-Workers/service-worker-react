const CACHE_VERSION = 'v1';
const RESOURCES = [
  '/',
  'localhost',
  'bundle.js'
];

self.addEventListener('install', event => {
  console.error('install');
    event.waitUntil(
      caches.open(CACHE_VERSION).then(cache => cache.addAll(RESOURCES))
    );
});


self.addEventListener('activate', event => {
  console.error('onActivate', event);
});

self.addEventListener('fetch', event => {
  const {request} = event;
  const {host} = new URL(request.url);
  const isExternalApi = host => host === 'api.themoviedb.org' || host === 'image.tmdb.org';

  if (isExternalApi(host)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) return response;

          return fetch(request)
            .then(fetchResponse => caches.open(CACHE_VERSION).then(cache => {
              cache.put(request, fetchResponse.clone());

              return fetchResponse;
            }))
            .catch(err => console.error('Fetch error', err));
        })
        .catch(err => console.error('Caches match error', err))
    );
  } else {
    event.respondWith(caches.match(request));
  }
});

self.addEventListener('sync', event => {
  console.error('onSync', event);
});

self.addEventListener('message', event => {
  console.error('oMessage', event);
});
