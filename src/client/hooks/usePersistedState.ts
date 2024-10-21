import { useEffect, useMemo, useState } from "react";

import { STORED_STATE_PREFIX } from "@constants";
import { storage } from "@utils";

export const usePersistedState = <T>(
	initialValue: T,
	id: string,
	isPersistDisabled = false
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		if (isPersistDisabled) return initialValue;
		const storedValue = storage.session.getItem<T>(`${STORED_STATE_PREFIX}:${id}`);
		return storedValue ?? initialValue;
	}, []);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		if (isPersistDisabled) return;
		storage.session.setItem(`${STORED_STATE_PREFIX}:${id}`, state);
	}, [state]);

	return [state, setState];
};
