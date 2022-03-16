const cacheName = "v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  const removeOldCache = async () => {
    cahceNames = await caches.keys();
    return Promise.all(
      cahceNames
        .filter((cache) => cache !== cacheName)
        .map((cache) => caches.delete(cache))
    );
  };

  e.waitUntil(removeOldCache());
});

self.addEventListener("fetch", (e) => {
  const fetchResponse = async () => {
    try {
      const res = await fetch(e.request);
      const resClone = res.clone();
      const cache = await caches.open(cacheName);
      await cache.put(e.request, resClone);
      return res;
    } catch {
      const res = await caches.match(e.request);
      return res;
    }
  };

  e.respondWith(fetchResponse());
});
