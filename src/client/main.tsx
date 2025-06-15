import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProvider } from "@client/components/AppProvider";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { routeTree } from "@client/routes/routeTree.gen";

window.addEventListener("load", () => {
	registerServiceWorker().catch(error => {
		console.error("Service worker registration failed:", error);
	});
});

const router = createRouter({ routeTree });

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<AppProvider>
				<RouterProvider router={createRouter({ routeTree })} />
			</AppProvider>
		</QueryClientProvider>
	</StrictMode>
);

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
