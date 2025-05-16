import Bun from "@client/assets/bun.svg";
import { useApp } from "@client/hooks/useApp";

export const Main = () => {
	const { count, setCount } = useApp();

	return (
		<div className="flex-center-col">
			<h1>hello from bun!</h1>
			<Bun width={300} height={300} />
			<p>Hot-reloads with persisted state on file save.</p>
			<button type="button" onClick={() => setCount(count => count + 1)}>
				Count: {count}
			</button>
			<button type="button" className="link-btn" onClick={() => setCount(0)}>
				Reset Count
			</button>
		</div>
	);
};
