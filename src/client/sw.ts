/// <reference lib="webworker" />

import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope & { __WB_DISABLE_DEV_LOGS: boolean };

self.__WB_DISABLE_DEV_LOGS = true;

const cacheName = "sw-cache";

const cacheFirstChar = "~";

const isCacheFirstRequest = (filename: string) => filename.includes(cacheFirstChar);

self.addEventListener("install", async () => await self.skipWaiting());

const trimCache = (url: URL) => {
	if (!isCacheFirstRequest(url.href)) return false;
	const urlPrefix = url.href.split(cacheFirstChar)[0];
	const hash = url.href.split(cacheFirstChar)[1];
	const urlSuffixSplit = url.href.split(".");
	const urlSuffix = urlSuffixSplit[urlSuffixSplit.length - 1];
	(async () => {
		const cache = await caches.open(cacheName);
		const requests = await cache.keys();
		for (const request of requests) {
			const cacheHash = request.url.split(cacheFirstChar)[1];
			if (request.url.startsWith(urlPrefix) && request.url.endsWith(urlSuffix) && hash !== cacheHash)
				return await cache.delete(request);
		}
	})();
	return true;
};

registerRoute(({ url }) => trimCache(url), new CacheFirst({ cacheName }));

registerRoute(({ url }) => !url.href.includes("socket.io"), new NetworkFirst({ cacheName }));
