import { SocketEvent } from "@constants";
import { useSocket } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export const useApi = () => {
	const { toAndFrom } = useSocket();

	const helloToAndFrom = (message: string) =>
		useQuery({
			queryKey: ["hello"],
			queryFn: () => toAndFrom({ event: SocketEvent.Hello, data: [message] })
		});

	return { helloToAndFrom };
};
