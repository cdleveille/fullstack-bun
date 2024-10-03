import { SocketEvent } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { socket } from "@util";

import type { TSocketEvent } from "@types";

const TIMEOUT_MS = 5000;

type TReqParams<T = unknown> = {
	event: TSocketEvent;
	data?: unknown;
	callback?: ((res: T) => void) | (() => void);
};

export const useApi = () => {
	const to = ({ event, data, callback }: TReqParams) => {
		socket.emit(event, data);
		callback?.(null);
	};

	const toAndFrom = async <T>({ event, data, callback }: TReqParams<T>) => {
		return new Promise<T>((resolve, reject) => {
			const timeout = setTimeout(() => reject(`Request timed out after ${TIMEOUT_MS}ms.`), TIMEOUT_MS);
			socket.once(event, res => {
				socket.off(event);
				clearTimeout(timeout);
				callback?.(res);
				resolve(res);
			});
			to({ event, data });
		});
	};

	const helloToAndFrom = (message: string, callback?: (res: string) => void) =>
		useQuery({
			queryKey: ["helloToAndFrom"],
			queryFn: () => toAndFrom({ event: SocketEvent.HELLO, data: message, callback })
		});

	return { socket, helloToAndFrom };
};
