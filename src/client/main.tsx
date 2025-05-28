import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "@client/components/AppProvider";
import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Main } from "@client/components/Main";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";

registerServiceWorker().catch(console.error);

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={new QueryClient()}>
				<AppProvider>
					<BrowserRouter>
						<Main />
					</BrowserRouter>
				</AppProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>
);
