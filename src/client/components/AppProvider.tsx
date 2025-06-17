import { AppContext } from "@/client/helpers/context";
import { usePersistedState } from "@/client/hooks/usePersistedState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = usePersistedState({ initialValue: 0, id: "count" });

  const incrementCount = () => setCount(count => count + 1);

  const resetCount = () => setCount(0);

  return (
    <AppContext.Provider
      value={{
        count,
        incrementCount,
        resetCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
