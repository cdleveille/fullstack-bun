import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type TReqParams<T extends keyof TClientToServerSocketEvent> = {
	event: T;
	data?: Parameters<TClientToServerSocketEvent[T]>;
};

export const useApi = () => {
	const to = useCallback(
		<T extends keyof TClientToServerSocketEvent>({
			event,
			data = [] as unknown as Parameters<TClientToServerSocketEvent[T]>
		}: TReqParams<T>) => {
			socket.emit(event, ...data);
		},
		[socket]
	);

	const toAndFrom = useCallback(
		async <T extends keyof TClientToServerSocketEvent>({ event, data }: TReqParams<T>) => {
			type TResArgs = Parameters<TServerToClientSocketEvent[T]>;
			return new Promise<TResArgs[0]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				socket.once(event as SocketEvent, (...args: TResArgs) => {
					clearTimeout(timeout);
					resolve(args[0]);
				});
				to({ event, data });
			});
		},
		[socket, to]
	);

	const helloToAndFrom = (message: string) =>
		useQuery({ queryKey: ["hello"], queryFn: () => toAndFrom({ event: SocketEvent.Hello, data: [message] }) });

	return { helloToAndFrom };
};
