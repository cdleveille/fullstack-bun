import { useAppContext } from "@hooks";

export const Counter = () => {
	const { count, setCount } = useAppContext();

	return (
		<>
			<button onClick={() => setCount(count => count + 1)}>Count: {count}</button>
			<div className="reset" onClick={() => setCount(0)}>
				Reset Count
			</div>
		</>
	);
};
