/// <reference lib="dom" />

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppContextProvider } from "@client/components/AppContextProvider";
import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Main } from "@client/components/Main";
import { assertGetElementById } from "@client/utils/browser";
import { Config } from "@client/utils/config";

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
