/*
 * Offline support for the meal plan.
 *
 * The plan is static and content-hashed by Next.js, so build output is cached
 * permanently and pages are served network-first with a cached fallback. That
 * keeps an installed home screen app usable on a phone with no signal while
 * still picking up new deploys as soon as the network allows.
 */

const VERSION = "v1";
const SHELL_CACHE = `ph-lean-shell-${VERSION}`;
const ASSET_CACHE = `ph-lean-assets-${VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE];

// Evict oldest-first so repeated deploys cannot grow the asset cache forever.
const ASSET_CACHE_LIMIT = 150;

const scopeUrl = new URL(self.registration.scope);
const startUrl = scopeUrl.pathname;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.add(new Request(startUrl, { cache: "reload" })))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter(
              (name) =>
                name.startsWith("ph-lean-") && !CURRENT_CACHES.includes(name),
            )
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function trimCache(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - limit))) {
    await cache.delete(key);
  }
}

async function handlePageRequest(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (
      (await cache.match(request)) ??
      (await cache.match(startUrl)) ??
      Response.error()
    );
  }
}

async function handleAssetRequest(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    trimCache(ASSET_CACHE, ASSET_CACHE_LIMIT);
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== scopeUrl.origin) return;
  if (!url.pathname.startsWith(startUrl)) return;

  if (request.mode === "navigate") {
    event.respondWith(handlePageRequest(request));
    return;
  }

  event.respondWith(handleAssetRequest(request));
});
