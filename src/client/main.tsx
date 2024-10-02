/// <reference lib="dom" />

import "./style.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { Hello } from "@components";
import { useConfig } from "@hooks";

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
