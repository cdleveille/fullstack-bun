import { BunSvg, Counter } from "@components";
import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data: helloFromBun } = helloToAndFrom("hello from client!", res => console.log(res));

	if (!helloFromBun) return null;

	return (
		<div className="hello">
			<h1>{helloFromBun}</h1>
			<BunSvg width={300} height={300} />
			<p>Automatically reloads with persisted state on file save.</p>
			<Counter />
		</div>
	);
};
