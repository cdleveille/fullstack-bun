import { useApi } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data } = useQuery({ queryKey: ["hello"], queryFn: () => helloToAndFrom("hello from client!") });

	if (!data) return null;

	return (
		<div className="hello">
			<h1>{data}</h1>
			<img src="./assets/hello.svg" width={200} height={200} alt="hello"></img>
		</div>
	);
};
