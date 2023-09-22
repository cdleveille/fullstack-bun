/// <reference lib="webworker" />

import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", async () => await self.skipWaiting());

registerRoute(({ url }) => !url.href.includes("socket.io"), new NetworkFirst());
