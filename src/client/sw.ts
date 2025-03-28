/// <reference lib="webworker" />

import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope & { __WB_DISABLE_DEV_LOGS: boolean; __WB_MANIFEST: { url: string }[] };
self.__WB_DISABLE_DEV_LOGS = true;
const manifest = self.__WB_MANIFEST;

const cacheName = "sw-cache";
const cacheFirstHashPrefix = "-";
const cacheFirstWithoutHashFileTypes = [".webp", ".ttf", ".woff", ".woff2"];

const isCacheFirstWithHash = (filename: string) => filename.includes(cacheFirstHashPrefix);
const isCacheFirstWithoutHash = (filename: string) => {
	for (const fileType of cacheFirstWithoutHashFileTypes) if (filename.endsWith(fileType)) return true;
	return false;
};

self.addEventListener("install", event => {
	void self.skipWaiting();
	event.waitUntil(
		(async () => {
			const urlsToPrecache = ["/", ...(manifest?.map(({ url }) => url) ?? [])];
			const cache = await caches.open(cacheName);
			await cache.addAll([...urlsToPrecache.map(url => url)]);
		})()
	);
});

self.addEventListener("activate", event => {
	event.waitUntil(
		(async () => {
			const existingCacheNames = await caches.keys();
			await Promise.all(
				existingCacheNames.reduce(
					(acc, existingCacheName) => {
						if (existingCacheName !== cacheName) acc.push(() => caches.delete(existingCacheName));
						return acc;
					},
					[] as (() => Promise<boolean>)[]
				)
			);
		})()
	);
});

const trimCache = (url: URL) => {
	if (isCacheFirstWithoutHash(url.href)) return true;
	if (!isCacheFirstWithHash(url.href)) return false;
	const urlPrefix = url.href.split(cacheFirstHashPrefix)[0];
	const hash = url.href.split(cacheFirstHashPrefix)[1];
	const urlSuffixSplit = url.href.split(".");
	const urlSuffix = urlSuffixSplit[urlSuffixSplit.length - 1];
	void (async () => {
		const cache = await caches.open(cacheName);
		const requests = await cache.keys();
		for (const request of requests) {
			const cacheHash = request.url.split(cacheFirstHashPrefix)[1];
			if (request.url.startsWith(urlPrefix) && request.url.endsWith(urlSuffix) && hash !== cacheHash)
				return await cache.delete(request);
		}
	})();
	return true;
};

registerRoute(({ url }) => trimCache(url), new CacheFirst({ cacheName }));

registerRoute(({ url }) => !url.href.includes("socket.io"), new NetworkFirst({ cacheName }));
