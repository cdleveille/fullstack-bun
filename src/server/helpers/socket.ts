import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config, log } from "@helpers";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

const { WS_PORT, HOST, PORT, VITE_PORT } = Config;

export const initSocket = () => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>(WS_PORT, {
		cors: { origin: [HOST, `${HOST}:${PORT}`, `${HOST}:${VITE_PORT}`] },
		serveClient: false
	});

	io.on(SocketEvent.Connect, socket => {
		const onHello = (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
		};

		socket.on(SocketEvent.Hello, onHello);
	});

	log.info(`Socket.IO server started on port ${WS_PORT}`);
};
