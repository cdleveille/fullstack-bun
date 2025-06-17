import { createFileRoute } from "@tanstack/react-router";

import { Index } from "@/client/components/Index";
import { loader } from "@/client/hooks/useApi";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  loader,
});

function IndexComponent() {
  return <Index />;
}
