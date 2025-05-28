import { useQuery } from "@tanstack/react-query";

import { httpClient } from "@client/helpers/http";
import { socket } from "@client/helpers/socket";
import { SocketEvent } from "@shared/constants";

// For any initial data fetching to be done via React Router loader before React components are rendered
export const mainLoader = async () => {
	const { data, error } = await httpClient.api.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	return data;
};

// For any API interactions to be used within React components
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
				const { data, error } = await httpClient.api.hello.get({
					query: { name }
				});
				if (error) throw new Error(error.value.message);
				return data;
			}
		});

	return { helloSocket, helloHttp };
};
