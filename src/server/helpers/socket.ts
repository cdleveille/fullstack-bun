import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config, log } from "@helpers";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

const { HOST, PORT } = Config;

export const initSocket = () => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>({
		cors: { origin: [HOST, `${HOST}:${PORT}`] },
		serveClient: false
	});

	io.on(SocketEvent.Connect, socket => {
		const onHello = (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
		};

		socket.on(SocketEvent.Hello, onHello);
	});

	return io;
};
