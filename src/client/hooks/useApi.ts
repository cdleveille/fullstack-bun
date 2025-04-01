import { SocketEvent } from "@constants";
import { useSocket } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export const useApi = () => {
	const { emitAndReceive } = useSocket();

	const hello = (message: string) =>
		useQuery({
			queryKey: ["hello-socket"],
			queryFn: () => emitAndReceive({ event: SocketEvent.Hello, data: [message] })
		});

	return { hello };
};
