import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config, log } from "@helpers";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

const { IS_PROD, WS_PORT, HOST, PORT } = Config;

export const initSocket = async () => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>(WS_PORT, {
		cors: { origin: [HOST, `${HOST}:${PORT}`] },
		serveClient: false
	});

	if (!IS_PROD) {
		const { initWatch } = await import("@processes");
		initWatch(() => io.emit(SocketEvent.Reload));
	}

	io.on(SocketEvent.Connect, socket => {
		const onHello = (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.Hello, "hello from bun!");
		};

		socket.on(SocketEvent.Hello, onHello);
	});

	log.info(`Socket.IO server started on port ${WS_PORT}`);
};
