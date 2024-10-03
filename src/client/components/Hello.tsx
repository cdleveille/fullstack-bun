import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data } = helloToAndFrom("hello from client!", res => console.log(res));

	if (!data) return null;

	return (
		<div className="hello">
			<h1>{data}</h1>
			<img src="./assets/hello.svg" width={200} height={200} alt="hello"></img>
		</div>
	);
};
