import { Server } from "socket.io";

import { Config, isCustomHost } from "@server/helpers/config";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@shared/types";

const { HOST } = Config;

export const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>({
	cors: { origin: isCustomHost ? HOST : "*" },
	serveClient: false
});

const shutdown = () => {
	console.log("Closing connections and shutting down server...");

	io.close(() => {
		console.log("Server closed");
		process.exit(0);
	});

	setTimeout(() => {
		console.error("Could not close connections in time, forcefully shutting down server");
		process.exit(1);
	}, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
