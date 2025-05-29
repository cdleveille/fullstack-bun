import { useMutation, useQuery } from "@tanstack/react-query";

import { httpClient } from "@client/helpers/http";
import { socket } from "@client/helpers/socket";
import { SocketEvent } from "@shared/constants";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	const { data, error } = await httpClient.api.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	const hello = (message: string) =>
		useMutation({
			mutationFn: () => socket.emitAndReceive({ event: SocketEvent.Hello, data: [message] }),
			onSuccess: ({ message }) => {
				console.log(`socket: ${message}`);
			}
		});

	return { hello };
};
