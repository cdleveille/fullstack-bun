/// <reference lib="dom" />

import "./style.css";

import { createRoot } from "react-dom/client";

import { Hello } from "@components";
import { useConfig } from "@hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("./sw.js");
};

window.addEventListener("load", async () => {
	const {
		Config: { IS_PROD }
	} = useConfig();
	if (IS_PROD) await registerServiceWorker();
});

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = createRoot(rootDiv);
root.render(
	<QueryClientProvider client={new QueryClient()}>
		<Hello />
	</QueryClientProvider>
);
