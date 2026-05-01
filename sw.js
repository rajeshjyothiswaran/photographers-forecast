// Halcyon — The Photographer's Forecast · Service Worker
// Caches the app shell for fast loads and basic offline support
// © 2026 Rajesh Jyothiswaran / LadyBugFarm Images

const CACHE = 'halcyon-v1';
const SHELL = [
  '/photographers-forecast/',
  '/photographers-forecast/index.html',
  '/photographers-forecast/guide.html',
  '/photographers-forecast/icons/icon-192.png',
  '/photographers-forecast/icons/icon-512.png',
  '/photographers-forecast/icons/apple-touch-icon.png',
];

// Install: cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fall back to cache
// API calls (weather, tides) always go to network — never serve stale data
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Always fetch live data from external APIs
  if (
    url.includes('open-meteo.com') ||
    url.includes('tidesandcurrents.noaa.gov') ||
    url.includes('tidecheck.com') ||
    url.includes('nominatim.openstreetmap.org')
  ) {
    return; // Let browser handle — no caching
  }

  // App shell: cache first, then network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
