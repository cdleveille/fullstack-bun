/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import { Header } from "@components";
import { IConfig } from "@types";

(async () => {
	const res = await fetch("/ws");
	const { HOST, WS_PORT } = (await res.json()) as IConfig;
	const socket = io(`${HOST}:${WS_PORT}`);
	socket.on("hello", () => console.log("hello from server!"));
	socket.emit("hello");
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header text="hello from bun!" />
	</React.StrictMode>
);
