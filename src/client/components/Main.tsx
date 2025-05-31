import Bun from "@client/assets/bun.svg";
import { useApi } from "@client/hooks/useApi";
import { useApp } from "@client/hooks/useApp";

export const Main = () => {
	const { count, setCount } = useApp();

	const { useHello, loaderData } = useApi();

	const { mutate: helloToServer } = useHello("hello from client!");

	return (
		<div className="flex-center-col">
			<h1>{loaderData.message}</h1>
			<button type="button" onClick={() => helloToServer()} className="bun-logo">
				<Bun width={250} height={250} />
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
