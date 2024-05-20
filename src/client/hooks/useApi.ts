import { io } from "socket.io-client";

import { SocketEvent } from "@constants";

import type { SocketEventName } from "@types";

const socket = io();

const TIMEOUT_MS = 1000;

export const useApi = () => {
	/**
	 * Synchronously emit an event to the server, expecting no response.
	 */
	const to = (eventName: SocketEventName, data?: unknown) => {
		socket.emit(eventName, data);
	};

	/**
	 * Asynchronously make a request to the server and return a Promise of the expected response.
	 * @param eventName The event name to emit to the server.
	 * @param data The data to send to the server.
	 * @param callback A callback to run when the server responds.
	 */
	const toAndFrom = async <T>(eventName: SocketEventName, data?: unknown, callback?: (result: T) => void) => {
		return new Promise<T>((resolve, reject) => {
			const timeout = setTimeout(() => reject("Request timed out."), TIMEOUT_MS);
			socket.once(eventName, result => {
				socket.off(eventName);
				clearTimeout(timeout);
				callback?.(result);
				resolve(result);
			});
			to(eventName, data);
		});
	};

	const helloTo = (message: string) => to(SocketEvent.HELLO, message);

	const helloToAndFrom = (message: string, callback?: (result: string) => void) =>
		toAndFrom<string>(SocketEvent.HELLO, message, callback);

	return { helloTo, helloToAndFrom };
};
