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

const assertGetFromCache = async (request: Request) => {
	const cache = await caches.open(cacheName);
	const match = await cache.match(request, { ignoreVary: true });
	if (!match) throw new Error(`Cache miss for ${request.url}`);
	return match;
};

const fetchFromNetworkAndCacheResponse = async (request: Request) => {
	const res = await fetch(request);
	if (request.method !== "GET" || !res?.ok) return res;
	const clone = res.clone();
	// To avoid delaying response, do not await async cache ops
	caches.open(cacheName).then(cache => cache.put(request, clone));
	return res;
};

const cacheFirstStrategy = async (request: Request) => {
	try {
		return await assertGetFromCache(request);
	} catch (error) {
		return await fetchFromNetworkAndCacheResponse(request);
	}
};

const networkFirstStrategy = async (request: Request) => {
	try {
		return await fetchFromNetworkAndCacheResponse(request);
	} catch (error) {
		return await assertGetFromCache(request);
	}
};

const precacheAssets = async (urlsToPrecache: string[]) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(urlsToPrecache);
};

const deleteOldCaches = async () => {
	const cacheNames = await caches.keys();
	const deleteOldCaches = cacheNames
		.filter(name => name !== cacheName)
		.map(name => caches.delete(name));
	await Promise.all([self.clients.claim(), ...deleteOldCaches]);
};

const handleRequest = async (request: Request) => {
	const { url } = request;
	if (isCacheFirstRequest(url)) return await cacheFirstStrategy(request);
	return await networkFirstStrategy(request);
};

self.addEventListener("install", event => {
	self.skipWaiting();
	event.waitUntil(precacheAssets(urlsToPrecache));
});

self.addEventListener("activate", event => {
	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});
