import bunSvg from "@client/assets/bun.svg";
import { useAppContext } from "@client/hooks/useAppContext";

export const Main = () => {
	const { count, setCount } = useAppContext();

	return (
		<div className="flex-center-col">
			<h1>hello from bun!</h1>
			<img src={bunSvg} width={250} height={250} alt="hello from bun!" />
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
