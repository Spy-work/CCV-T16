// Service worker : garde l'appli en mémoire sur le téléphone pour un usage hors ligne.
// Après chaque modification du site, augmentez le numéro de VERSION (v2, v3…).
const VERSION = 'ccv-t16-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];
const FONTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !FONTS.includes(url.hostname)) return;

  // Pages : réseau d'abord (pour les mises à jour), sinon la copie hors ligne.
  // Si le réseau ne répond pas en 3 s (zone mal couverte), on ouvre la copie locale.
  if (req.mode === 'navigate') {
    const net = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); }
      return res;
    });
    const local = () => caches.match('index.html', { ignoreSearch: true });
    const timeout = new Promise(r => setTimeout(r, 3000)).then(local);
    e.respondWith(
      Promise.race([net.catch(local), timeout]).then(r => r || net)
    );
    return;
  }

  // Fichiers et polices : copie locale tout de suite, mise à jour en arrière-plan.
  e.respondWith(
    caches.open(VERSION).then(c =>
      c.match(req, { ignoreSearch: same }).then(hit => {
        const net = fetch(req)
          .then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; })
          .catch(() => hit);
        return hit || net;
      })
    )
  );
});
