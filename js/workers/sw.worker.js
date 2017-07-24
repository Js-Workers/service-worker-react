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
      async function() {
        const cacheResponse = await caches.match(request);

        if (cacheResponse) return cacheResponse;

        try {
          const response = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);

          cache.put(request, response.clone());

          return response;

        } catch (error) {
          console.error('Error: ', error);
          self.request = request;
          self.registration.sync.register('movies-loading');
        }
      }()
    );
  } else {
    event.respondWith(caches.match(request));
  }
});

self.addEventListener('sync', event => {
  console.error('onSync', event);

  switch (event.tag) {
    case 'movies-loading':
      return event.waitUntil(async function() {
        const response = await fetch(self.request);
        delete self.request;
        return response
      }());
  }
});

self.addEventListener('message', event => {
  console.error('oMessage', event);
});
