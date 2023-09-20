/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom/client";

import { Header } from "@components";
import { IConfig } from "@types";

(async () => {
	const res = await fetch("/ws");
	const { WS_PORT } = (await res.json()) as IConfig;

	const socket = new WebSocket(`ws://localhost:${WS_PORT}`);
	socket.addEventListener("message", event => {
		console.log(event.data);
	});
	socket.addEventListener("open", () => {
		socket.send("hello from client");
	});
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header text="hello from bun!" />
	</React.StrictMode>
);
