/// <reference lib="dom" />

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppContextProvider, ErrorBoundary, Main } from "@components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config, assertGetElementById } from "@utils";

if (Config.IS_PROD && navigator.serviceWorker && !navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("sw.js", { type: "module", scope: "/" }).catch(console.error);
}

const root = assertGetElementById("root");
createRoot(root).render(
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
