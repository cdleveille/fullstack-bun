import { useEffect, useMemo, useState } from "react";

export const usePersistedState = <T>(initialValue: T, id: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		const storedValue = sessionStorage.getItem(`state:${id}`);
		if (storedValue) return JSON.parse(storedValue);
		return initialValue;
	}, []);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		const stateStr = JSON.stringify(state);
		sessionStorage.setItem(`state:${id}`, stateStr);
	}, [state]);

	return [state, setState];
};
