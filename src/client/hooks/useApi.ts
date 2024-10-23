import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type { TClientToServerPayload, TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type TReqParams<T extends keyof TClientToServerSocketEvent> = {
	event: T;
	data: Parameters<TClientToServerSocketEvent[T]>;
};

export const useApi = () => {
	const to = useCallback(
		<T extends keyof TClientToServerSocketEvent>({ event, data }: TReqParams<T>) => {
			socket.emit(event, ...data);
		},
		[socket]
	);

	const toAndFrom = useCallback(
		async <T extends keyof TClientToServerSocketEvent>({ event, data }: TReqParams<T>) => {
			return new Promise<Parameters<TServerToClientSocketEvent[T]>[0]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				const onRes = (...args: Parameters<TServerToClientSocketEvent[T]>) => {
					clearTimeout(timeout);
					resolve(args[0]);
				};
				// @ts-ignore
				socket.once(event, onRes);
				to({ event, data });
			});
		},
		[socket, to]
	);

	type THelloToAndFromPayload = TClientToServerPayload[SocketEvent.Hello];
	const helloToAndFrom = (message: THelloToAndFromPayload) =>
		useQuery({
			queryKey: ["helloToAndFrom"],
			queryFn: () => toAndFrom({ event: SocketEvent.Hello, data: [message] })
		});

	const getScores = () =>
		useQuery({
			queryKey: ["getScores"],
			queryFn: () => toAndFrom({ event: SocketEvent.Scores, data: [] })
		});

	return { socket, helloToAndFrom, getScores };
};
