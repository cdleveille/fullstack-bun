import { useLoaderData } from "react-router-dom";

import Bun from "@client/assets/bun.svg";
import type { loader } from "@client/hooks/useApi";
import { useApp } from "@client/hooks/useApp";

export const Main = () => {
	const { count, setCount } = useApp();

	const { message } = useLoaderData<typeof loader>();

	return (
		<div className="flex-center-col">
			<h1>{message}</h1>
			<Bun width={300} height={300} />
			<button type="button" onClick={() => setCount(count => count + 1)}>
				Count: {count}
			</button>
			<button type="button" className="link-btn" onClick={() => setCount(0)}>
				Reset Count
			</button>
		</div>
	);
};
