import { treaty } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";

import { SocketEvent } from "@constants";
import type { TApi } from "@routes";
import { socket } from "@utils";

const client = treaty<TApi>(window.location.origin);

export const useApi = () => {
	const helloSocket = (message: string) =>
		useQuery({
			queryKey: ["hello-socket"],
			queryFn: () => socket.emitAndReceive({ event: SocketEvent.Hello, data: [message] })
		});

	const helloHttp = (name?: string) =>
		useQuery({
			queryKey: ["hello-http"],
			queryFn: async () => {
				const { data } = await client.api.hello.get({
					query: { name }
				});
				return data;
			}
		});

	return { helloSocket, helloHttp };
};
