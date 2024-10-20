import { useEffect, useMemo, useState } from "react";

import { Config } from "@utils";

export const usePersistedState = <T>(initialValue: T, id: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		if (Config.IS_PROD) return initialValue;
		const storedValue = sessionStorage.getItem(`state:${id}`);
		if (storedValue) return JSON.parse(storedValue);
		return initialValue;
	}, []);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		if (Config.IS_PROD) return;
		const stateStr = JSON.stringify(state);
		sessionStorage.setItem(`state:${id}`, stateStr);
	}, [state]);

	return [state, setState];
};
