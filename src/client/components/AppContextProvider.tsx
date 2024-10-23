import { useEffect } from "react";

import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [message, setMessage] = usePersistedState("", "message");
	const [count, setCount] = usePersistedState(0, "count");

	const { helloToAndFrom, getScores } = useApi();

	const { data } = helloToAndFrom("hello from client!");

	const { data: scores } = getScores();

	if (scores) console.log(scores);

	useEffect(() => {
		if (data) setMessage(data);
	}, [data]);

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
