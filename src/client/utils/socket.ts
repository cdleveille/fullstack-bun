import { type Socket, io as socketIo } from "socket.io-client";

import { SocketEvent, WS_TIMEOUT_MS } from "@constants";
import type {
	TClientToServerSocketEvent,
	TServerToClientSocketEvent,
	TSocketReqParams,
	TSocketResArgs
} from "@types";
import { Config } from "@utils";

const io: Socket<TServerToClientSocketEvent, TClientToServerSocketEvent> = socketIo(
	`${location.protocol}//${location.hostname}:${Config.WS_PORT}`
).on(SocketEvent.Reload, () => location.reload());

const emit = <T extends keyof TClientToServerSocketEvent>({
	event,
	data = [] as unknown as Parameters<TClientToServerSocketEvent[T]>
}: TSocketReqParams<T>) => io.emit(event, ...data);

const emitAndReceive = async <T extends keyof TClientToServerSocketEvent>({
	event,
	data
}: TSocketReqParams<T>) =>
	new Promise<TSocketResArgs<T>[0]>((resolve, reject) => {
		const timeout = setTimeout(
			() => reject(new Error(`Socket.io request timed out after ${WS_TIMEOUT_MS}ms.`)),
			WS_TIMEOUT_MS
		);
		io.once(event as SocketEvent, (...resArgs: TSocketResArgs<T>) => {
			clearTimeout(timeout);
			resolve(resArgs[0]);
		});
		emit({ event, data });
	});

export const socket = { io, emit, emitAndReceive };
