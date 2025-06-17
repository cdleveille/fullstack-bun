import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { ErrorBoundary, NotFound } from "@/client/components/Error";
import { Header } from "@/client/components/Header";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
