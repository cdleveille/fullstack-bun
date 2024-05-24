/// <reference lib="dom" />

import "./style.css";

import { createRoot } from "react-dom/client";

import { Hello } from "@components";
import { useApi, useConfig } from "@hooks";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
};

window.addEventListener("load", async () => {
	const {
		Config: { IS_PROD }
	} = useConfig();
	const { helloToAndFrom } = useApi();
	await helloToAndFrom("socket.io: hello from client!", result => console.log(result));
	if (IS_PROD) await registerServiceWorker();
});

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = createRoot(rootDiv);
root.render(<Hello width={200} height={200} />);
