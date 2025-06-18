import { AppContext } from "@/client/helpers/context";
import { usePersistedState } from "@/client/hooks/usePersistedState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = usePersistedState({ initialValue: 0, id: "count" });

  const minusCount = () => setCount(count => count - 1);

  const plusCount = () => setCount(count => count + 1);

  return (
    <AppContext.Provider
      value={{
        count,
        minusCount,
        plusCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
