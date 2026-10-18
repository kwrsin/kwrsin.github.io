const C='lwsm-v49',M='https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js';
const A=['./','index.html','style.css','app.js','icon.svg','manifest.webmanifest','help.html','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png',M];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
/* Only the app's own files and marked are cached. Everything else (images from other sites, etc.) goes straight to the network,
   so it is never stored here and never goes stale. */
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url),s=new URL(self.registration.scope);
  if(!((u.origin===s.origin&&u.pathname.startsWith(s.pathname))||r.url===M))return;
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
