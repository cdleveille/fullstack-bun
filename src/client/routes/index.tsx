import { createFileRoute } from "@tanstack/react-router";

// import { loader } from "@/client/hooks/useApi";

import { Main } from "@/client/components/Main";

export const Route = createFileRoute("/")({
	component: Index
	// loader
});

function Index() {
	return <Main />;
}
