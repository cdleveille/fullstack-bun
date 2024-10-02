import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { log } from "@services";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	io.on("connect", socket => {
		socket.on(SocketEvent.HELLO, (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.HELLO, "hello from bun!");
		});
	});
};
