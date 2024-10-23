import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { GREETINGS, SocketEvent } from "@constants";
import { Config, getRandomElements } from "@helpers";
import { log } from "@services";
import { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

export const initSocket = async (httpServer: HttpServer) => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>(httpServer);

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

		socket.on(SocketEvent.Greetings, () => {
			socket.emit(SocketEvent.Greetings, getRandomElements(GREETINGS, 5));
		});
	});
};

const getGreeting = () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
