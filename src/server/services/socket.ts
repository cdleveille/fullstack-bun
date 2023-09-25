import { Server } from "socket.io";

import { Config } from "@helpers";
import { log } from "@services";

export const initSocket = () => {
	const io = new Server(Config.WS_PORT, {
		// @ts-ignore
		cors: { origin: [Config.HOST, `${Config.HOST}:${Config.PORT}`] }
	});
	io.on("connect", socket => {
		socket.on("hello", () => {
			log.info("socket.io: hello from client!");
			socket.emit("hello");
		});
	});
};
