import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config } from "@helpers";
import { initWatch, log } from "@services";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	io.on("connect", socket => {
		socket.on(SocketEvent.HELLO, (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.HELLO, "hello from bun!");
		});
	});

	if (!Config.IS_PROD) {
		const emitReload = () => io.emit(SocketEvent.RELOAD);
		initWatch(emitReload);
	}
};
