import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppProvider } from "@client/components/AppProvider";
import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Main } from "@client/components/Main";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { loader } from "@client/hooks/useApi";

registerServiceWorker().catch(console.error);

const router = createBrowserRouter([
	{
		errorElement: <ErrorBoundary />,
		hydrateFallbackElement: <></>,
		children: [
			{ index: true, element: <Main />, loader }
			// Add more routes here as needed
		]
	}
]);

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</QueryClientProvider>
	</StrictMode>
);
