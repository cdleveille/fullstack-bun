import { useEffect, useMemo, useState } from "react";

import { STORED_STATE_PREFIX } from "@constants";
import { Config, storage } from "@utils";

export const usePersistedState = <T>(initialValue: T, id: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		if (Config.IS_PROD) return initialValue;
		const storedValue = storage.session.getItem<T>(`${STORED_STATE_PREFIX}:${id}`);
		return storedValue ?? initialValue;
	}, []);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		if (Config.IS_PROD) return;
		storage.session.setItem(`${STORED_STATE_PREFIX}:${id}`, state);
	}, [state]);

	return [state, setState];
};
