import { useQuery } from "react-query";

import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data } = useQuery("hello", () => helloToAndFrom("hello from client!"));

	if (!data) return null;

	return (
		<div className="hello">
			<h1>{data}</h1>
			<img src="./assets/hello.svg" width={200} height={200} alt="hello"></img>
		</div>
	);
};
