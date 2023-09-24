import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { initRoutes } from "@controllers";
import { buildClient, Config } from "@helpers";
import { initMiddleware } from "@middleware";
import { connectToDatabase, initSocket, log } from "@services";

await Promise.all([buildClient(), connectToDatabase()]);

log.info(`Starting server in ${Config.IS_PROD ? "production" : "development"} mode...`);

const app = new Hono();
initMiddleware(app);
initRoutes(app);
app.use("/*", serveStatic({ root: "public" }));
initSocket();

export default app;
