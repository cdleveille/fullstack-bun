import { AppContext } from "@/client/helpers/context";
import { usePersistedState } from "@/client/hooks/usePersistedState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [count, setCount] = usePersistedState({ initialValue: 0, id: "count" });

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
