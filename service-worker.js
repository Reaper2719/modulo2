self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('modulo1-cache-v2').then(cache => {
      // Usar rutas relativas para máxima compatibilidad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      return cache.addAll([
        'index.html',
        'style.css',
        'main.js',
        'indexedDB.js',
        'export.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== 'modulo1-cache-v2').map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      // Si es navegación (modo standalone o PWA), siempre mostrar index.html offline
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
      // Si no es navegación, intenta buscar en red
      return fetch(event.request).catch(() => {
        // Fallback para otros recursos
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
