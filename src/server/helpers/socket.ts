import { Server } from "socket.io";

import { Config } from "@server/helpers/config";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@shared/types";

const { HOST, PORT, DEV_PORT } = Config;

export const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>({
	cors: { origin: [HOST, `${HOST}:${PORT}`, `${HOST}:${DEV_PORT}`] },
	serveClient: false
});

const shutdown = () => {
	console.log("Shutting down Socket.IO...");

	io.close(() => {
		console.log("Socket.IO server closed");
		process.exit(0);
	});

	setTimeout(() => {
		console.error("Could not close connections in time, forcefully shutting down Socket.IO");
		process.exit(1);
	}, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
