// Crew Check-In service worker. CHANGE the version below on every update.
const V='crew-v9.1',LIBS=['https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js','https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.all([...LIBS.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{})),c.add('./').catch(()=>{})])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(LIBS.includes(r.url)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put(r,cp));return x})));return}
 if(new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>{
  const f=fetch(r).then(x=>{if(x.ok){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x}).catch(()=>h);
  e.waitUntil(f.catch(()=>{}));return h||f}))});
