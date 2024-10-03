import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data } = helloToAndFrom("hello from client!", res => console.log(res));

	if (!data) return null;

	return (
		<div className="hello">
			<h1>{data}</h1>
			<img src="./assets/bun.svg" width={300} height={300} alt="hello"></img>
		</div>
	);
};
