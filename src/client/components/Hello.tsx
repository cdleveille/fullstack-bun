import { useAppContext } from "@hooks";

export const Hello = () => {
	const { message } = useAppContext();

	return <h1>{message}</h1>;
};
