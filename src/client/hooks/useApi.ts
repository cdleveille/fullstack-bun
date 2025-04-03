import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { emitAndReceive } from "@utils";

export const useApi = () => {
	const hello = (message: string) =>
		useQuery({
			queryKey: ["hello-socket"],
			queryFn: () => emitAndReceive({ event: SocketEvent.Hello, data: [message] })
		});

	return { hello };
};
