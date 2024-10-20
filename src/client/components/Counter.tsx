import { usePersistedState } from "@hooks";

export const Counter = () => {
	const [count, setCount] = usePersistedState(0, "count");

	return (
		<>
			<button onClick={() => setCount(count => count + 1)}>Count: {count}</button>
			<a onClick={() => setCount(0)}>Reset Count</a>
		</>
	);
};
