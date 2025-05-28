import { useEffect } from "react";

import { AppContext } from "@client/contexts/app";
import { useApi } from "@client/hooks/useApi";
import { usePersistedState } from "@client/hooks/usePersistedState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState(0, "count");

	const { hello } = useApi();

	const { data } = hello("hello from client!");

	useEffect(() => {
		if (data) console.log(`socket: ${data.message}`);
	}, [data]);

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
