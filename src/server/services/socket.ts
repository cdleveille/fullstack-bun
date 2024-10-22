import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { GREETINGS, SocketEvent } from "@constants";
import { Config } from "@helpers";
import { log } from "@services";

export const initSocket = async (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	if (!Config.IS_PROD) {
		const { initWatch } = await import("@processes");
		const emitReload = () => io.emit(SocketEvent.Reload);
		initWatch(emitReload);
	}

	io.on("connect", socket => {
		socket.on(SocketEvent.Hello, (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.Hello, `${getGreeting()} from bun!`);
		});
	});
};

const getGreeting = () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
