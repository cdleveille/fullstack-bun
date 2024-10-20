import { useEffect, useMemo, useState } from "react";

import { Config } from "@util";

console.log(Config.IS_PROD);

export const usePersistedState = <T>(initialValue: T, id: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		const storedValue = sessionStorage.getItem(`state:${id}`);
		if (storedValue) return JSON.parse(storedValue);
		return initialValue;
	}, []);

	const [state, setState] = useState<T>(Config.IS_PROD ? initialValue : persistedInitialValue);

	useEffect(() => {
		const stateStr = JSON.stringify(state);
		sessionStorage.setItem(`state:${id}`, stateStr);
	}, [state]);

	return [state, setState];
};
