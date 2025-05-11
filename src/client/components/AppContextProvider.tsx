import { useEffect } from "react";

import { AppContext } from "@client/contexts/app";
import { useApi } from "@client/hooks/useApi";
import { usePersistedState } from "@client/hooks/usePersistedState";

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
