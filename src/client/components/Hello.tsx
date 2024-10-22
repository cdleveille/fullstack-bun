import { useApi } from "@hooks";

export const Hello = () => {
	const { helloToAndFrom } = useApi();

	const { data: helloFromBun } = helloToAndFrom("hello from client!", res => console.log(res));

	if (!helloFromBun) return null;

	return (
		<>
			<h1>{helloFromBun}</h1>
		</>
	);
};
