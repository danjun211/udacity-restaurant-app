self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    '/css/styles.css',
    '/js/main.js'
  ];

  event.waitUntil(
    caches.open('mws-restaurant-stage-1').then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondeWith(caches.match(event.request).then(function(response) {
    if(response) return response;
    return fetch(event.request);
  }));
});