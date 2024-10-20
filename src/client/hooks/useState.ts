import { useEffect, useMemo, useState as useStateReact } from "react";

export const useState = <T>(initialValue: T, id: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const persistedInitialValue = useMemo(() => {
		const storedValue = sessionStorage.getItem(`state:${id}`);
		if (storedValue) return JSON.parse(storedValue);
		return initialValue;
	}, []);

	const [state, setState] = useStateReact<T>(persistedInitialValue);

	useEffect(() => {
		const stateStr = JSON.stringify(state);
		sessionStorage.setItem(`state:${id}`, stateStr);
	}, [state]);

	return [state, setState];
};
