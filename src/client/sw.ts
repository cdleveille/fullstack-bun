import { HASH_REGEX } from "@shared/constants";

declare const self: ServiceWorkerGlobalScope & {
	__WB_DISABLE_DEV_LOGS: boolean;
	__WB_MANIFEST: { url: string }[];
};
self.__WB_DISABLE_DEV_LOGS = true;

const manifest = self.__WB_MANIFEST;

const urlsToPrecache = ["/", "/api/hello", ...manifest.map(({ url }) => url)];

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

const isCacheFirstRequest = (request: Request) => {
	const { url } = request;
	if (isCacheFirstWithoutHash(url)) return true;
	if (isCacheFirstWithHash(url)) return true;
	return false;
};

const getFromCache = async (request: Request) => {
	const cache = await caches.open(cacheName);
	const match = await cache.match(request, { ignoreVary: true });
	return match;
};

const fetchFromNetworkAndCacheResponse = async (request: Request) => {
	const res = await fetch(request);
	if (request.method !== "GET" || !res?.ok) return res;
	const resClone = res.clone();
	// To avoid delaying response, do not await async cache write
	caches.open(cacheName).then(cache => cache.put(request, resClone));
	return res;
};

const cacheFirstStrategy = async (request: Request) => {
	try {
		const res = await getFromCache(request);
		return res ?? (await fetchFromNetworkAndCacheResponse(request));
	} catch (error) {
		return await fetchFromNetworkAndCacheResponse(request);
	}
};

const networkFirstStrategy = async (request: Request) => {
	try {
		return await fetchFromNetworkAndCacheResponse(request);
	} catch (error) {
		return await getFromCache(request);
	}
};

const precacheUrls = async (urlsToPrecache: string[]) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(urlsToPrecache);
};

const deleteOldCaches = async (newCacheName: string) => {
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames.filter(name => name !== newCacheName).map(name => caches.delete(name))
	);
};

const handleFetchRequest = async (request: Request) => {
	if (isCacheFirstRequest(request)) return await cacheFirstStrategy(request);
	const res = await networkFirstStrategy(request);
	if (!res || !res.ok) throw new Error(`Failed to fetch ${request.url} and not in sw cache`);
	return res;
};

self.addEventListener("install", event => {
	self.skipWaiting();
	event.waitUntil(precacheUrls(urlsToPrecache));
});

self.addEventListener("activate", event => {
	event.waitUntil(
		Promise.all([
			deleteOldCaches(cacheName),
			self.clients.claim(),
			self.registration.navigationPreload?.enable()
		])
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(handleFetchRequest(event.request));
});
