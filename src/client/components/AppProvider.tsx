import { AppContext } from "@client/contexts/app";
import { usePersistedState } from "@client/hooks/usePersistedState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState(0, "count");

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
