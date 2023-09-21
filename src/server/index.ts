import { Hono } from "hono";
import { Server, Socket } from "socket.io";

import { initRoutes } from "@controllers";
import { Config } from "@helpers";
import { initPlugins } from "@plugins";
import { buildClient } from "@scripts";
import { connectToDatabase, log } from "@services";

await Promise.all([buildClient(), connectToDatabase()]);

log.info(`Starting server in ${Config.IS_PROD ? "production" : "development"} mode...`);

const app = new Hono();
initPlugins(app);
initRoutes(app);

// @ts-ignore
const io = new Server(Config.WS_PORT, { cors: { origin: `${Config.HOST}:${Config.PORT}` } });
io.on("connect", (socket: Socket) => {
	socket.on("hello", () => {
		log.info("hello from client!");
		socket.emit("hello");
	});
});

export default app;
