import { useAppContext } from "@hooks";

export const Hello = () => {
	const { sendHello, message } = useAppContext();

	return (
		<h1 onClick={sendHello} className="cursor-pointer">
			{message}
		</h1>
	);
};
