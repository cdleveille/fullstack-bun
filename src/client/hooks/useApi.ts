import { treaty } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";

import { useIsOffline } from "@client/hooks/useIsOffline";
import { socket } from "@client/utils/socket";
import type { TApi } from "@server/helpers/api";
import { SocketEvent } from "@shared/constants";

const client = treaty<TApi>(window.location.origin);

export const useApi = () => {
	const isOffline = useIsOffline();

	const helloSocket = (message: string) =>
		useQuery({
			queryKey: ["hello-socket"],
			queryFn: () => socket.emitAndReceive({ event: SocketEvent.Hello, data: [message] }),
			enabled: !isOffline
		});

	const helloHttp = (name?: string) =>
		useQuery({
			queryKey: ["hello-http", name],
			queryFn: async () => {
				const { data } = await client.api.hello.get({
					query: { name }
				});
				return data;
			},
			enabled: !isOffline
		});

	return { helloSocket, helloHttp };
};
