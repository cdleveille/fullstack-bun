import type { Server as HTTPServer } from "node:http";
import { Server } from "socket.io";

import { Config } from "@server/helpers/config";
import { SocketEvent } from "@shared/constants";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@shared/types";

const { HOST, PORT, DEV_PORT } = Config;

export const initSocket = (server: HTTPServer) => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>({
		cors: { origin: [HOST, `${HOST}:${PORT}`, `${HOST}:${DEV_PORT}`] },
		serveClient: false
	});

	io.on(SocketEvent.Connect, socket => {
		const onHello = (message: string) => {
			console.log(message);
			socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
		};

		socket.on(SocketEvent.Hello, onHello);
	});

	const shutdown = () => {
		console.log("Shutting down Socket.IO...");

		io.close(() => {
			console.log("Socket.IO server closed");
			process.exit(0);
		});

		setTimeout(() => {
			console.error(
				"Could not close connections in time, forcefully shutting down Socket.IO"
			);
			process.exit(1);
		}, 10000);
	};

	process.on("SIGTERM", shutdown);
	process.on("SIGINT", shutdown);

	io.attach(server);
};
