import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type { TClientToServerPayload, TClientToServerSocketEvent, TServerToClientPayload } from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type THelloToAndFromPayload = TClientToServerPayload[SocketEvent.Hello];

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
		async <T extends keyof TServerToClientPayload>({ event, data }: TReqParams<T>) => {
			return new Promise<TServerToClientPayload[T]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				const onRes = (res: TServerToClientPayload[T]) => {
					// @ts-ignore
					socket.off(event, onRes);
					clearTimeout(timeout);
					resolve(res);
				};
				// @ts-ignore
				socket.once(event, onRes);
				to({ event, data });
			});
		},
		[socket, to]
	);

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
