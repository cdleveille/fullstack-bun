import { useLoaderData } from "react-router-dom";

import Bun from "@client/assets/bun.svg";
import { type loader, useApi } from "@client/hooks/useApi";
import { useApp } from "@client/hooks/useApp";

export const Main = () => {
	const { count, setCount } = useApp();

	const { hello } = useApi();

	const { mutate } = hello("hello from client!");

	const { message } = useLoaderData<typeof loader>();

	return (
		<div className="flex-center-col">
			<h1>{message}</h1>
			<button type="button" onClick={() => mutate()} className="logo">
				<Bun width={300} height={300} />
			</button>
			<button type="button" onClick={() => setCount(count => count + 1)}>
				Count: {count}
			</button>
			<button type="button" onClick={() => setCount(0)} className="link-btn">
				Reset Count
			</button>
		</div>
	);
};
