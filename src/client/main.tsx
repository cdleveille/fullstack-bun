/// <reference lib="dom" />

import "./manifest.json";
import "./index.html";
import "./style.css";
import "./favicon.ico";
import "./browserconfig.xml";

import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import { Hello } from "@components";
import { IConfig } from "@types";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
};

(async () => {
	const res = await fetch("/config");
	const { IS_PROD, HOST, WS_PORT } = (await res.json()) as IConfig;
	const socket = io(`${HOST}:${WS_PORT}`);
	socket.on("hello", () => console.log("socket.io: hello from server!"));
	socket.emit("hello");
	if (IS_PROD) await registerServiceWorker();
})();

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = ReactDOM.createRoot(rootDiv);
root.render(
	<React.StrictMode>
		<Hello width={200} height={200} />
	</React.StrictMode>
);
