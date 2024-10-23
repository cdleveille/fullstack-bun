import { useCallback } from "react";

import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import type {
	TClientToServerSocketEvent,
	TClientToServerSocketPayload,
	TServerToClientSocketEvent,
	TServerToClientSocketPayload
} from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

type TReqParams<TSocketEvent extends keyof TClientToServerSocketEvent> = {
	event: TSocketEvent;
	data: TClientToServerSocketPayload[TSocketEvent];
	callback?: (res: TServerToClientSocketPayload[TSocketEvent]) => void;
};

export const useApi = () => {
	const to = useCallback(
		<SocketEvent extends keyof TClientToServerSocketEvent>({ event, data }: TReqParams<SocketEvent>) => {
			socket.emit(event as keyof TClientToServerSocketEvent, data);
		},
		[socket]
	);

	const toAndFrom = useCallback(
		async <TSocketEvent extends keyof TClientToServerSocketEvent>({
			event,
			data,
			callback
		}: TReqParams<TSocketEvent>) => {
			return new Promise<TServerToClientSocketPayload[TSocketEvent]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				const onRes = (res: TServerToClientSocketPayload[TSocketEvent]) => {
					socket.off(event as keyof TServerToClientSocketEvent, onRes);
					clearTimeout(timeout);
					callback?.(res);
					resolve(res);
				};
				socket.once(event as keyof TServerToClientSocketEvent, onRes);
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

	return { helloToAndFrom };
};
