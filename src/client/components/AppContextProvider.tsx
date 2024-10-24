import { useEffect } from "react";

import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [message, setMessage] = usePersistedState("", "message");
	const [count, setCount] = usePersistedState(0, "count");

	const { helloToAndFrom, getGreetings } = useApi();

	const { data: hello, mutate: sendHello } = helloToAndFrom("hello from client!");

	const { data: greetings } = getGreetings();

	useEffect(sendHello, []);

	useEffect(() => {
		if (hello) setMessage(hello);
	}, [hello]);

	useEffect(() => {
		if (greetings) console.log(greetings.join(", "));
	}, [greetings]);

	if (!message) return null;

	return (
		<AppContext.Provider
			value={{
				sendHello,
				message,
				count,
				setCount
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
