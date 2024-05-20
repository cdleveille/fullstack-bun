import { SocketEvent } from "@constants";
import { useSocket } from "@hooks";

import type { SocketEventName } from "@types";

const TIMEOUT_MS = 5000;

interface IReqParams<T = unknown> {
	event: SocketEventName;
	data?: unknown;
	callback?: ((res: T) => void) | (() => void);
}

export const useApi = () => {
	const { socket } = useSocket();

	const to = ({ event, data, callback }: IReqParams) => {
		socket.emit(event, data);
		callback?.(null);
	};

	const toAndFrom = async <T>({ event, data, callback }: IReqParams<T>) => {
		return new Promise<T>((resolve, reject) => {
			const timeout = setTimeout(() => reject("Request timed out."), TIMEOUT_MS);
			socket.once(event, res => {
				socket.off(event);
				clearTimeout(timeout);
				callback?.(res);
				resolve(res);
			});
			to({ event, data });
		});
	};

	const helloTo = (message: string, callback?: () => void) =>
		to({
			event: SocketEvent.HELLO,
			data: message,
			callback
		});

	const helloToAndFrom = (message: string, callback?: (res: string) => void) =>
		toAndFrom({ event: SocketEvent.HELLO, data: message, callback });

	return { helloTo, helloToAndFrom };
};
