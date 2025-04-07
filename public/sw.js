/* eslint-disable */
/* global self, caches, fetch */
// @ts-nocheck - Ce Service Worker utilise des API spécifiques qui ne sont pas reconnues par TypeScript standard
/**
 * Service Worker pour 3W Solutions
 * Ce fichier est volontairement exclu des vérifications TypeScript
 */
const CACHE_NAME = "v7_3w-solutions-cache";
const urlsToCache = [
  "/",
  "/projets",
  "/contact",
  "/manifest.json",
  "/3w_favicon.svg",
  "/icons/icon-192x192.svg",
  "/icons/icon-384x384.svg",
  "/icons/icon-512x512.svg",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  // Force le remplacement de l'ancien SW
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert");
      // Mise en cache séquentielle pour éviter les erreurs
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.log(`Échec de mise en cache pour ${url}:`, err);
            // Continue malgré l'erreur
            return Promise.resolve();
          })
        )
      );
    })
  );
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  // Ignorer les requêtes non HTTP/HTTPS (comme chrome-extension://)
  if (!event.request.url.startsWith("http")) {
    return;
  }

  // Ignorer les requêtes vers _next/static pendant le développement
  if (event.request.url.includes("/_next/static/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // On ne met en cache que les ressources de notre domaine
        if (response.type === "basic") {
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      });
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Suppression du vieux cache:", cacheName);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
});
