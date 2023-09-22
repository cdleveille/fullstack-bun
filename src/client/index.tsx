/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import { Header } from "@components";
import { IConfig } from "@types";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
};

(async () => {
	const res = await fetch("/config");
	const { HOST, WS_PORT } = (await res.json()) as IConfig;
	const socket = io(`${HOST}:${WS_PORT}`);
	socket.on("hello", () => console.log("socket.io: hello from server!"));
	socket.emit("hello");
	await registerServiceWorker();
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header text="hello from bun!!!" />
	</React.StrictMode>
);
