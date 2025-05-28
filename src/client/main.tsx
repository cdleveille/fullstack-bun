import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppProvider } from "@client/components/AppProvider";
import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Main } from "@client/components/Main";
import { NotFound } from "@client/components/NotFound";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";

registerServiceWorker().catch(console.error);

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={new QueryClient()}>
				<AppProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</AppProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>
);
