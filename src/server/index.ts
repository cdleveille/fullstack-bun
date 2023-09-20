import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { initRoutes } from "src/server/controllers";

import { Config } from "@helpers";
import { initPlugins } from "@plugins";
import { build } from "@scripts";
import { connectToDatabase, log } from "@services";

await Promise.all([build(), connectToDatabase()]);

log.info(`Starting server in ${Config.IS_PROD ? "production" : "development"} mode...`);

const app = new Hono();
app.use("/*", serveStatic({ root: "public" }));
initPlugins(app);
initRoutes(app);

Bun.serve({
	port: Config.WS_PORT,
	fetch(req, server) {
		if (server.upgrade(req)) return;
		return new Response("WebSocket upgrade failed", { status: 500 });
	},
	websocket: {
		async message(ws, message) {
			log.info(message);
			ws.send("hello from server!");
		}
	}
});

export default app;
