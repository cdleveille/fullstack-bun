import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type { TClientToServerSocketEvent, TServerToClientPayload } from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type TReqParams<SocketEventType extends keyof TServerToClientPayload> = {
	event: SocketEventType;
	data?: unknown;
	callback?: ((res: TServerToClientPayload[SocketEventType]) => void) | (() => void);
};

export const useApi = () => {
	const to = useCallback(
		<SocketEventType extends keyof TClientToServerSocketEvent>({ event, data }: TReqParams<SocketEventType>) => {
			// @ts-ignore
			socket.emit(event, data);
		},
		[socket]
	);

	const toAndFrom = useCallback(
		async <SocketEventType extends keyof TServerToClientPayload>({
			event,
			data,
			callback
		}: TReqParams<SocketEventType>) => {
			return new Promise<TServerToClientPayload[SocketEventType]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				const onRes = (res: TServerToClientPayload[SocketEventType]) => {
					// @ts-ignore
					socket.off(event, onRes);
					clearTimeout(timeout);
					callback?.(res);
					resolve(res);
				};
				// @ts-ignore
				socket.once(event, onRes);
				to({ event, data });
			});
		},
		[socket, to]
	);

	const helloToAndFrom = (message: string, callback?: (res: string) => void) =>
		useQuery({
			queryKey: ["helloToAndFrom"],
			queryFn: () => toAndFrom({ event: SocketEvent.Hello, data: message, callback })
		});

	const getScores = () =>
		useQuery({
			queryKey: ["getScores"],
			queryFn: () => toAndFrom({ event: SocketEvent.Scores })
		});

	return { socket, helloToAndFrom, getScores };
};
