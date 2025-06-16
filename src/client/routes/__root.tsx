import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ErrorBoundary } from "@/client/components/ErrorBoundary";
import { loader, useApi } from "@/client/hooks/useApi";

export const Route = createRootRoute({
	component: () => {
		useApi();
		return (
			<>
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
	loader,
	errorComponent: ErrorBoundary,
	notFoundComponent: () => <ErrorBoundary error={new Error("Not Found")} />
});
