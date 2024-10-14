import { BunSvg } from "@components";
import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data } = helloToAndFrom("hello from client!", res => console.log(res));

	if (!data) return null;

	return (
		<div className="hello">
			<h1>{data}</h1>
			<BunSvg width={300} height={300} />
		</div>
	);
};
