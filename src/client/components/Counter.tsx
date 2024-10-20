import { useState } from "@hooks";

export const Counter = () => {
	const [count, setCount] = useState(0, "count");

	return (
		<>
			<p>Automatically reloads with persisted state on file save.</p>
			<button onClick={() => setCount(count => count + 1)}>Count: {count}</button>
			<a onClick={() => setCount(0)}>Reset Count</a>
		</>
	);
};
