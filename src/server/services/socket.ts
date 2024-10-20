import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config } from "@helpers";
import { log } from "@services";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	(async () => {
		if (Config.IS_PROD) return;
		const { initWatch } = await import("@processes");
		const emitReload = () => io.emit(SocketEvent.RELOAD);
		await initWatch(emitReload);
	})();

	io.on("connect", socket => {
		socket.on(SocketEvent.HELLO, (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.HELLO, "hello from bun!");
		});
	});
};
