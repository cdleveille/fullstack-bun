import { HASH_REGEX } from "@shared/constants";

declare const self: ServiceWorkerGlobalScope & {
	__WB_DISABLE_DEV_LOGS: boolean;
	__WB_MANIFEST: { url: string }[];
};
self.__WB_DISABLE_DEV_LOGS = true;

const manifest = self.__WB_MANIFEST;

// Add any additional URLs to precache here
const urlsToPrecache = ["/api/hello", ...manifest.map(({ url }) => url)];

const cacheName = "sw-cache";
const cacheFirstWithoutHashFileTypes = [
	".ttf",
	".woff",
	".woff2",
	".jpg",
	".jpeg",
	".png",
	".webp"
];

const precacheAssets = async () => {
	const cache = await caches.open(cacheName);
	await cache.addAll(urlsToPrecache);
};

const isCacheFirstWithHash = (filename: string) => HASH_REGEX.test(filename);

const isCacheFirstWithoutHash = (filename: string) =>
	cacheFirstWithoutHashFileTypes.some(fileType =>
		filename.toLowerCase().endsWith(fileType.toLowerCase())
	);

const isCacheFirstRequest = (url: string) => {
	if (isCacheFirstWithoutHash(url)) return true;
	if (isCacheFirstWithHash(url)) return true;
	return false;
};

const cacheResponse = async (event: FetchEvent) => {
	const cache = await caches.open(cacheName);
	return cache.match(event.request, { ignoreVary: true });
};

const networkResponse = async (event: FetchEvent) => {
	const res = await fetch(event.request);
	const cache = await caches.open(cacheName);
	cache.put(event.request, res.clone());
	return res;
};

const cacheFirst = async (event: FetchEvent) => {
	try {
		const res = await cacheResponse(event);
		if (!res) return networkResponse(event);
		return res;
	} catch (error) {
		return await networkResponse(event);
	}
};

const networkFirst = async (event: FetchEvent) => {
	try {
		const res = await networkResponse(event);
		return res;
	} catch (error) {
		return await cacheResponse(event);
	}
};

self.addEventListener("install", event => {
	self.skipWaiting();
	event.waitUntil(precacheAssets().catch(console.error));
});

self.addEventListener("activate", event => {
	event.waitUntil(
		(async () => {
			const cacheNames = await caches.keys();
			const deleteOldCaches = cacheNames
				.filter(name => name !== cacheName)
				.map(name => caches.delete(name));
			await Promise.all(deleteOldCaches);
			await self.clients.claim();
		})().catch(console.error)
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		(async () => {
			const { url } = event.request;
			if (isCacheFirstRequest(url)) return await cacheFirst(event);
			const res = await networkFirst(event);
			if (!res)
				throw new Error(`Error fetching ${url} - not found in sw cache or over network`);
			return res;
		})()
	);
});
