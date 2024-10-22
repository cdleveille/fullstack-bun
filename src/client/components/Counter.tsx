import { useAppContext } from "@hooks";

export const Counter = () => {
	const { count, setCount } = useAppContext();

	return (
		<>
			<p>Automatically reloads with persisted state on file save.</p>
			<button onClick={() => setCount(count => count + 1)}>Count: {count}</button>
			<span className="reset" onClick={() => setCount(0)}>
				Reset Count
			</span>
		</>
	);
};
