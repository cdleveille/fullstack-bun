import { Hono } from "hono";

import { initRoutes } from "@controllers";
import { Config } from "@helpers";
import { initMiddleware } from "@middleware";
import { buildClient } from "@scripts";
import { connectToDatabase, initSocket, log } from "@services";

await Promise.all([buildClient(), connectToDatabase()]);

log.info(`Starting server in ${Config.IS_PROD ? "production" : "development"} mode...`);

const app = new Hono();
initMiddleware(app);
initRoutes(app);
initSocket();

export default app;
