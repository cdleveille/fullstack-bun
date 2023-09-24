/// <reference lib="webworker" />

import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

const cacheName = "sw-cache";

const isCacheFirstRequest = (filename: string) => filename.includes("~");

self.addEventListener("install", async () => await self.skipWaiting());

const trimCache = (url: URL) => {
	const cacheFirst = isCacheFirstRequest(url.href);
	if (!cacheFirst) return false;
	const urlPrefix = url.href.split("~")[0];
	const hash = url.href.split("~")[1];
	const urlSuffixSplit = url.href.split(".");
	const urlSuffix = urlSuffixSplit[urlSuffixSplit.length - 1];
	(async () => {
		const cache = await caches.open(cacheName);
		(await cache.keys()).forEach(async request => {
			const cacheHash = request.url.split("~")[1];
			if (request.url.startsWith(urlPrefix) && request.url.endsWith(urlSuffix) && hash !== cacheHash)
				await cache.delete(request);
		});
	})();
	return true;
};

registerRoute(({ url }) => trimCache(url), new CacheFirst({ cacheName }));

registerRoute(({ url }) => !url.href.includes("socket.io"), new NetworkFirst({ cacheName }));
