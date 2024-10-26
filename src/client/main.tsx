/// <reference lib="dom" />

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { AppContextProvider, ErrorBoundary, Main } from "@components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config } from "@utils";

window.addEventListener("load", async () => {
	if (!Config.IS_PROD || !navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("./sw.js");
});

const rootDiv = document.getElementById("root")!;
const root = createRoot(rootDiv);
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
