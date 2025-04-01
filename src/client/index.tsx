/// <reference lib="dom" />

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { AppContextProvider, ErrorBoundary, Main } from "@components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config } from "@utils";

window.addEventListener("load", async () => {
	if (!Config.IS_PROD || !navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
});

const rootEle = document.getElementById("root");
if (!rootEle) throw new Error("Element with id 'root' not found");
const root = createRoot(rootEle);
root.render(
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={new QueryClient()}>
				<AppContextProvider>
					<Main />
				</AppContextProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>
);
