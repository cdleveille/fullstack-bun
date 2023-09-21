import { Server, Socket } from "socket.io";

import { Config } from "@helpers";
import { log } from "@services";

export const initSocket = () => {
	// @ts-ignore
	const io = new Server(Config.WS_PORT, { cors: { origin: `${Config.HOST}:${Config.PORT}` } });
	io.on("connect", (socket: Socket) => {
		socket.on("hello", () => {
			log.info("hello from client!");

			socket.emit("hello");
		});
	});
};
