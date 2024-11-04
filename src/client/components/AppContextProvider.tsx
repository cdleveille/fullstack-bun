import { useEffect, useState } from "react";

import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [message, setMessage] = useState("hello!");
	const [count, setCount] = usePersistedState(0, "count");

	const { helloToAndFrom } = useApi();

	const { data: hello, mutate: sendHello } = helloToAndFrom("hello from client!");

	useEffect(sendHello, []);

	useEffect(() => {
		if (!hello) return;
		setMessage(hello);
		console.log(hello);
	}, [hello]);

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
