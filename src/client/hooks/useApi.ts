import { treaty } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";

import { socket } from "@client/helpers/socket";
import type { TApi } from "@server/helpers/api";
import { SocketEvent } from "@shared/constants";

const httpClient = treaty<TApi>(window.location.origin);

export const useApi = () => {
	const helloSocket = (message: string) =>
		useQuery({
			queryKey: ["hello-socket", message],
			queryFn: () => socket.emitAndReceive({ event: SocketEvent.Hello, data: [message] })
		});

	const helloHttp = (name?: string) =>
		useQuery({
			queryKey: ["hello-http", name],
			queryFn: async () => {
				const { data } = await httpClient.api.hello.get({
					query: { name }
				});
				return data;
			}
		});

	return { helloSocket, helloHttp };
};
