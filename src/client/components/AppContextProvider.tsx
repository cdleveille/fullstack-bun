import { createContext, useEffect } from "react";

import { useApi, usePersistedState } from "@hooks";
import type { TAppContext } from "@types";

export const AppContext = createContext<TAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState(0, "count");

	const { helloSocket, helloHttp } = useApi();

	const { data: messageSocket } = helloSocket("hello from client!");
	useEffect(() => {
		if (messageSocket) console.log(`socket: ${messageSocket.message}`);
	}, [messageSocket]);

	const { data: messageHttp } = helloHttp();
	useEffect(() => {
		if (messageHttp) console.log(`http: ${messageHttp.message}`);
	}, [messageHttp]);

	return (
		<AppContext.Provider
			value={{
				count,
				setCount
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
