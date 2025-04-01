import { createContext, useEffect } from "react";

import { useApi, usePersistedState } from "@hooks";
import type { TAppContext } from "@types";

export const AppContext = createContext<TAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState(0, "count");

	const { hello } = useApi();

	const { data: message } = hello("hello from client!");

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
