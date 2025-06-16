import { getRouteApi } from "@tanstack/react-router";
import { useCallback } from "react";

import BunLogo from "@/client/assets/bun.svg";
import { useApi } from "@/client/hooks/useApi";
import { useApp } from "@/client/hooks/useApp";

export const Main = () => {
	const { count, setCount } = useApp();

	const onWsHelloMessage = useCallback(
		({ message }: { message: string }) => console.log(`ws: ${message}`),
		[]
	);

	const { useWsHello, useGetHello, usePostHello } = useApi();

	useWsHello(onWsHelloMessage);

	const { mutate: getHello } = useGetHello();
	const { mutate: postHello } = usePostHello("from bun");

	const rootRoute = getRouteApi("__root__");
	const { message } = rootRoute.useLoaderData();

	return (
		<div className="center">
			<h1>{message}</h1>
			<BunLogo width={250} height={250} />
			<div className="btn-row">
				<button type="button" onClick={() => setCount(0)} className="link-btn">
					Reset
				</button>
				<span>Count: {count}</span>
				<button
					type="button"
					onClick={() => setCount(count => count + 1)}
					className="link-btn"
				>
					+1
				</button>
			</div>
			<div className="btn-row">
				<button type="button" onClick={() => getHello()} className="link-btn">
					GET
				</button>
				<button type="button" onClick={() => postHello()} className="link-btn">
					POST
				</button>
			</div>
		</div>
	);
};
