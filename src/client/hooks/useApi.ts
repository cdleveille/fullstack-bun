import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { http, socket } from "@utils";

export const useApi = () => {
	const helloSocket = (message: string) =>
		useQuery({
			queryKey: ["hello-socket"],
			queryFn: () => socket.emitAndReceive({ event: SocketEvent.Hello, data: [message] })
		});

	const helloHttp = (name?: string) =>
		useQuery({
			queryKey: ["hello-http"],
			queryFn: () => http.GET<{ message: string }>(`hello${name ? `?name=${name}` : ""}`)
		});

	return { helloSocket, helloHttp };
};
