import { useCallback } from "react";

import { SocketEvent } from "@constants";
import type {
	TClientToServerSocketEvent,
	TServerToClientSocketEvent,
	TSocketReqParams
} from "@types";
import { socket } from "@utils";

const TIMEOUT_MS = 5000;

export const useSocket = () => {
	const emit = useCallback(
		<T extends keyof TClientToServerSocketEvent>({
			event,
			data = [] as unknown as Parameters<TClientToServerSocketEvent[T]>
		}: TSocketReqParams<T>) => {
			socket.emit(event, ...data);
		},
		[socket]
	);

	const emitAndReceive = useCallback(
		async <T extends keyof TClientToServerSocketEvent>({
			event,
			data
		}: TSocketReqParams<T>) => {
			type TSocketResArgs = Parameters<TServerToClientSocketEvent[T]>;
			return new Promise<TSocketResArgs[0]>((resolve, reject) => {
				const timeout = setTimeout(
					() => reject(new Error(`Request timed out after ${TIMEOUT_MS}ms.`)),
					TIMEOUT_MS
				);
				socket.once(event as SocketEvent, (...args: TSocketResArgs) => {
					clearTimeout(timeout);
					resolve(args[0]);
				});
				emit({ event, data });
			});
		},
		[socket, emit]
	);

	return { emit, emitAndReceive };
};
