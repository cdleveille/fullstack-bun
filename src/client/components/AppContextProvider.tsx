import { useEffect, useState } from "react";

import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [message, setMessage] = useState("");
	const [count, setCount] = usePersistedState(0, "count");

	const { helloToAndFrom } = useApi();

	const { data: hello, mutate: sendHello } = helloToAndFrom("hello from client!");

	useEffect(sendHello, []);

	useEffect(() => {
		if (!hello) return;
		setMessage(hello);
		console.log(hello);
	}, [hello]);

	if (!message) return null;

	return (
		<AppContext.Provider
			value={{
				message,
				count,
				setCount
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
