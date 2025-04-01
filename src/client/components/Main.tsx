import { bunSvg } from "@assets";
import { useAppContext } from "@hooks";

export const Main = () => {
	const { message, count, setCount } = useAppContext();

	return (
		<div className="flex-center-col">
			<h1>{message}</h1>
			<img src={bunSvg} width={200} height={200} alt="hello from bun!" />
			<p>Automatically reloads with persisted state on file save.</p>
			<button type="button" onClick={() => setCount(count => count + 1)}>
				Count: {count}
			</button>
			<button type="button" onClick={() => setCount(0)}>
				Reset Count
			</button>
		</div>
	);
};
