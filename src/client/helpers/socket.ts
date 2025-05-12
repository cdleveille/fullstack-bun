import { type Socket, io as socketIo } from "socket.io-client";

import { Config } from "@client/helpers/config";
import { type SocketEvent, WS_TIMEOUT_MS } from "@shared/constants";
import type {
	TClientToServerSocketEvent,
	TServerToClientSocketEvent,
	TSocketReqParams,
	TSocketResArgs
} from "@shared/types";

const io: Socket<TServerToClientSocketEvent, TClientToServerSocketEvent> = socketIo(
	`${window.location.protocol}//${window.location.hostname}:${Config.PORT}`
);

const emit = <T extends keyof TClientToServerSocketEvent>({
	event,
	data = [] as unknown as Parameters<TClientToServerSocketEvent[T]>
}: TSocketReqParams<T>) => io.emit(event, ...data);

const emitAndReceive = async <T extends keyof TClientToServerSocketEvent>({
	event,
	data
}: TSocketReqParams<T>) => {
	return new Promise<TSocketResArgs<T>[0]>((resolve, reject) => {
		const timeout = setTimeout(
			() => reject(new Error(`Socket.IO request timed out after ${WS_TIMEOUT_MS}ms`)),
			WS_TIMEOUT_MS
		);
		io.once(event as SocketEvent, (...resArgs: TSocketResArgs<T>) => {
			clearTimeout(timeout);
			resolve(resArgs[0]);
		});
		emit({ event, data });
	});
};

export const socket = { io, emit, emitAndReceive };
