/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom/client";

import { Header } from "@components";

// import { Config } from "@helpers";

const socket = new WebSocket("ws://localhost:3001");
socket.addEventListener("message", event => {
	console.log(event.data);
});
socket.addEventListener("open", () => {
	socket.send("Hello from client");
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Header text="Hello From Bun!" />
	</React.StrictMode>
);
