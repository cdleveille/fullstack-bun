import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { ErrorBoundary } from "@/client/components/ErrorBoundary";
import { Header } from "@/client/components/Header";
import { useApi } from "@/client/hooks/useApi";

export const Route = createRootRoute({
  component: () => {
    useApi();
    return (
      <>
        <Header />
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
      </>
    );
  },
  errorComponent: ErrorBoundary,
  notFoundComponent: () => <ErrorBoundary error={new Error("Not Found")} />,
});
