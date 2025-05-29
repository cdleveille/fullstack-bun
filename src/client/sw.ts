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

const cacheResponse = async (request: Request) => {
	const cache = await caches.open(cacheName);
	return cache.match(request, { ignoreVary: true });
};

const networkResponse = async (request: Request) => {
	const res = await fetch(request);
	const cache = await caches.open(cacheName);
	cache.put(request, res.clone());
	return res;
};

const cacheFirst = async (request: Request) => {
	try {
		const res = await cacheResponse(request);
		if (!res) return networkResponse(request);
		return res;
	} catch (error) {
		return await networkResponse(request);
	}
};

const networkFirst = async (request: Request) => {
	try {
		const res = await networkResponse(request);
		return res;
	} catch (error) {
		return await cacheResponse(request);
	}
};

const precacheAssets = async () => {
	const cache = await caches.open(cacheName);
	await cache.addAll(urlsToPrecache);
};

const deleteOldCaches = async () => {
	const cacheNames = await caches.keys();
	const deleteOldCaches = cacheNames
		.filter(name => name !== cacheName)
		.map(name => caches.delete(name));
	await Promise.all(deleteOldCaches);
	await self.clients.claim();
};

const onFetch = async (request: Request) => {
	const { url } = request;
	if (isCacheFirstRequest(url)) return await cacheFirst(request);
	const res = await networkFirst(request);
	if (!res) throw new Error(`Error fetching ${url} - not found in sw cache or over network`);
	return res;
};

self.addEventListener("install", event => {
	self.skipWaiting();
	event.waitUntil(precacheAssets());
});

self.addEventListener("activate", event => {
	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", event => {
	event.respondWith(onFetch(event.request));
});
