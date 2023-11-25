import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { log } from "@services";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	io.on("connect", socket => {
		socket.on("hello", () => {
			log.info("socket.io: hello from client!");
			socket.emit("hello");
		});
	});
};
