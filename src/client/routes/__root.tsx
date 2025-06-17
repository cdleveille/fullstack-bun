import { createRootRoute } from "@tanstack/react-router";

import { ErrorBoundary, NotFound } from "@/client/components/Error";
import { Root } from "@/client/components/Root";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return <Root />;
}
