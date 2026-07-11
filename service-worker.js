const CACHE_NAME = 'weight-tracker-v1';
const ASSETS = [
    'index.html',
    'manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// 安裝並快取核心檔案
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// 攔截請求，優先使用快取，達到秒開效果
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});