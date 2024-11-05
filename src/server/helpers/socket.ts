import { Server, type ServerOptions } from "socket.io";

import { SocketEvent } from "@constants";
import { Config } from "@helpers";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

const { IS_PROD, WS_PORT, HOST, PORT } = Config;

export const initSocket = async () => {
	const io = new Server<TClientToServerSocketEvent, TServerToClientSocketEvent>(WS_PORT, {
		cors: { origin: [HOST, `${HOST}:${PORT}`] },
		serveClient: false
	} as Partial<ServerOptions>);

	if (!IS_PROD) {
		const { initWatch } = await import("@processes");
		const emitReload = () => io.emit(SocketEvent.Reload);
		initWatch(emitReload);
	}

	io.on("connect", socket => {
		socket.on(SocketEvent.Hello, (message: string) => {
			console.log(message);
			socket.emit(SocketEvent.Hello, "hello from bun!");
		});
	});

	console.log(`Socket.IO server started on port ${WS_PORT}`);
};
