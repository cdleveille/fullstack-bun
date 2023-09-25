import { Server, ServerOptions } from "socket.io";

import { Config } from "@helpers";
import { log } from "@services";

export const initSocket = () => {
	const io = new Server(Config.WS_PORT, {
		cors: { origin: [Config.HOST, `${Config.HOST}:${Config.PORT}`] },
		serveClient: false
	} as Partial<ServerOptions>);
	io.on("connect", socket => {
		socket.on("hello", () => {
			log.info("socket.io: hello from client!");
			socket.emit("hello");
		});
	});
};
