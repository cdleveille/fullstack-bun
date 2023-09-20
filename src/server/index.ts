import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Socket } from "socket.io";

import { initRoutes } from "@controllers";
import { Config } from "@helpers";
import { initPlugins } from "@plugins";
import { buildClient } from "@scripts";
import { connectToDatabase, log } from "@services";

const io = require("socket.io")(Config.WS_PORT, {
	cors: { origin: `${Config.HOST}:${Config.PORT}` }
});

await Promise.all([buildClient(), connectToDatabase()]);

log.info(`Starting server in ${Config.IS_PROD ? "production" : "development"} mode...`);

const app = new Hono();
app.use("/*", serveStatic({ root: "public" }));

initPlugins(app);
initRoutes(app);

io.on("connect", (socket: Socket) => {
	socket.on("hello", () => {
		log.info("hello from client!");
		socket.emit("hello");
	});
});

export default app;
