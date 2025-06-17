import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { loader } from "@/client/hooks/useApi";

export const Route = createFileRoute("/")({
  component: Index,
  loader,
});

function Index() {
  return <Home />;
}
