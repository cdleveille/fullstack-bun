import { createFileRoute } from "@tanstack/react-router";

import { Index } from "@/client/components/Index";
import { apiClient } from "@/client/helpers/network";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  loader: async () => {
    const { data, error } = await apiClient.http.hello.get({ query: {} });
    if (error) throw new Error(error.value.message);
    return data;
  },
});

function IndexComponent() {
  return <Index />;
}
