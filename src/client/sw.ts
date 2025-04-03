/// <reference lib="webworker" />

import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope & {
	__WB_DISABLE_DEV_LOGS: boolean;
	__WB_MANIFEST: { url: string }[];
};
self.__WB_DISABLE_DEV_LOGS = true;
const manifest = self.__WB_MANIFEST;

const cacheName = "sw-cache";
const cacheFirstHashPrefix = "~";
const cacheFirstWithoutHashFileTypes = [".webp", ".ttf", ".woff", ".woff2"];

const isCacheFirstWithHash = (filename: string) => filename.includes(cacheFirstHashPrefix);

const isCacheFirstWithoutHash = (filename: string) =>
	cacheFirstWithoutHashFileTypes.some(fileType =>
		filename.toLowerCase().endsWith(fileType.toLowerCase())
	);

self.addEventListener("install", event => {
	self.skipWaiting();
	event.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			if (!cache) return;
			const urlsToPrecache = ["/", ...(manifest?.map(({ url }) => url) ?? [])];
			await cache.addAll(urlsToPrecache.map(url => url));
		})()
	);
});

self.addEventListener("activate", event => {
	event.waitUntil(
		(async () => {
			const existingCacheNames = await caches.keys();
			await Promise.all(
				existingCacheNames
					.filter(existingCacheName => existingCacheName !== cacheName)
					.map(existingCacheName => caches.delete(existingCacheName))
			);
		})()
	);
});

const trimCache = (url: URL) => {
	if (isCacheFirstWithoutHash(url.href)) return true;
	if (!isCacheFirstWithHash(url.href)) return false;
	// delete stale cache entries asynchronously
	(async () => {
		const urlPrefix = url.href.split(cacheFirstHashPrefix)[0];
		const hash = url.href.split(cacheFirstHashPrefix)[1];
		const urlSuffixSplit = url.href.split(".");
		const urlSuffix = urlSuffixSplit[urlSuffixSplit.length - 1];
		const cache = await caches.open(cacheName);
		if (!cache) return;
		const entries = await cache.keys();
		await Promise.all(
			entries
				.filter(
					entry =>
						entry.url.startsWith(urlPrefix) &&
						entry.url.endsWith(urlSuffix) &&
						hash !== entry.url.split(cacheFirstHashPrefix)[1]
				)
				.map(entry => cache.delete(entry))
		);
	})();
	return true;
};

registerRoute(({ url }) => trimCache(url), new CacheFirst({ cacheName }));

registerRoute(({ url }) => true, new NetworkFirst({ cacheName }));
