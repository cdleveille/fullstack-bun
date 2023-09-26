/// <reference lib="dom" />

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";

import { Hello } from "@components";
import { IConfig } from "@types";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
};

window.addEventListener("load", async () => {
	const res = await fetch("/config");
	const { IS_PROD, HOST, WS_PORT } = (await res.json()) as IConfig;
	const socket = io(`${HOST}:${WS_PORT}`);
	socket.on("hello", () => console.log("socket.io: hello from server!"));
	socket.emit("hello");
	if (IS_PROD) await registerServiceWorker();
});

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = createRoot(rootDiv);
root.render(
	<StrictMode>
		<Hello width={200} height={200} />
	</StrictMode>
);
