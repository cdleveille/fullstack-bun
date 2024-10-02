import { useEffect, useState } from "react";

import { useApi } from "@hooks";

export const Hello = () => {
	const [message, setMessage] = useState<string>();

	const { helloToAndFrom } = useApi();

	useEffect(() => {
		(async () => {
			const res = await helloToAndFrom("hello from client!");
			setMessage(res);
		})();
	}, []);

	if (!message) return null;

	return (
		<div className="hello">
			<h1>{message}</h1>
			<img src="./assets/hello.svg" width={200} height={200} alt="hello"></img>
		</div>
	);
};
