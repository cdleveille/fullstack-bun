import { Server } from "socket.io";

import { SocketEvent } from "@constants";
import { Config, log } from "@helpers";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

const { HOST, PORT } = Config;

export const initSocket = () => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>({
		cors: { origin: [HOST, `${HOST}:${PORT}`] },
		serveClient: false,
		transports: ["websocket", "polling"]
	});

	io.on(SocketEvent.Connect, socket => {
		const onHello = (message: string) => {
			log.info(message);
			socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
		};

		socket.on(SocketEvent.Hello, onHello);
	});

	const shutdown = () => {
		log.info("Shutting down Socket.IO...");

		io.close(() => {
			log.info("Socket.IO server closed");
			process.exit(0);
		});

		setTimeout(() => {
			log.error("Could not close connections in time, forcefully shutting down Socket.IO");
			process.exit(1);
		}, 10000);
	};

	process.on("SIGTERM", shutdown);
	process.on("SIGINT", shutdown);

	return io;
};
