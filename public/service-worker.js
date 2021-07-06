const FILES_TO_CACHE =[
    // '../server.js',
    'index.js',
    'index.html',
    'styles.css',
    'manifest.webmanifest',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
];
const cacheName = 'v3';
const RUNTIME = 'runtime';
const PRECACHE = 'precache-v2';
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";


self.addEventListener("fetch", function(evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            console.log(evt.request)
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(
      fetch(evt.request).catch(function(){
          return caches.match(evt.request).then(response => {
              if (response) {return response}
              else if (evt.request.headers.get("accept").includes("text/html")){ 
                  return caches.match("/")
          }
          })
      })
    );
  });



self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

  