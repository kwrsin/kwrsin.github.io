const C='lwsm-v14',A=['./','index.html','style.css','app.js','icon.svg','manifest.webmanifest','help.html','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})))});
