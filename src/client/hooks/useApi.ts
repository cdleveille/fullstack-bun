import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type {
	TClientToServerEventPayload,
	TClientToServerEvents,
	TServerToClientEventPayload,
	TServerToClientEvents
} from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type TReqParams<SocketEvent extends keyof TClientToServerEvents> = {
	event: SocketEvent;
	data?: TClientToServerEventPayload[SocketEvent];
	callback?: TServerToClientEvents[SocketEvent];
};

export const useApi = () => {
	const to = useCallback(
		<SocketEvent extends keyof TClientToServerEvents>({ event, data }: TReqParams<SocketEvent>) => {
			// @ts-ignore
			socket.emit(event, data);
		},
		[socket]
	);

	const toAndFrom = useCallback(
		async <SocketEvent extends keyof TClientToServerEvents>({ event, data, callback }: TReqParams<SocketEvent>) => {
			return new Promise<TServerToClientEventPayload[SocketEvent]>((resolve, reject) => {
				const timeout = setTimeout(() => {
					reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`));
				}, TIMEOUT_MS);

				const onRes = (res: TServerToClientEventPayload[SocketEvent]) => {
					clearTimeout(timeout);
					callback?.(res);
					resolve(res);
				};

				socket.once(event as keyof TServerToClientEvents, onRes);
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

	return { socket, helloToAndFrom };
};
