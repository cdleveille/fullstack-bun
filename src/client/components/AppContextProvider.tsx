import { useEffect } from "react";

import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState(0, "count");

	const { helloToAndFrom } = useApi();

	const { data: message } = helloToAndFrom("hello from client!");

	useEffect(() => {
		if (message) console.log(message);
	}, [message]);

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
