/*
 * Service worker de la invitación: permite abrir la recepción (#/checkin) sin internet.
 * Primero intenta la red (para tener siempre lo último); si no hay señal, usa lo guardado.
 */
const CACHE = "invitacion-offline-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
   const req = e.request;
   if (req.method !== "GET") return;
   const url = new URL(req.url);
   const mismoSitio = url.origin === self.location.origin;
   const fuentes = /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
   if (!mismoSitio && !fuentes) return;

   e.respondWith(
      fetch(req)
         .then((res) => {
            if (res.ok || res.type === "opaque") {
               const copia = res.clone();
               caches.open(CACHE).then((c) => c.put(req, copia));
            }
            return res;
         })
         .catch(async () => {
            const guardado = await caches.match(req, { ignoreSearch: true });
            if (guardado) return guardado;
            if (req.mode === "navigate") {
               const inicio = await caches.match(self.registration.scope);
               if (inicio) return inicio;
            }
            return Response.error();
         }),
   );
});
