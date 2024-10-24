import express from "express";
import { createServer } from "http";
import path from "path";

import { Env, Path } from "@constants";
import { initRoutes } from "@controllers";
import { Config } from "@helpers";
import { initMiddleware } from "@middleware";
import { connectToDatabase, initSocket, log } from "@services";

const { IS_PROD, PORT, SKIP_DB } = Config;

if (!IS_PROD) {
	const { buildClient } = await import("@processes");
	await buildClient();
}

if (!SKIP_DB) await connectToDatabase();

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(Path.Public)));

app.set("json spaces", 2);

app.disable("x-powered-by");

const httpServer = createServer(app);
await initSocket(httpServer);

initRoutes(app);

initMiddleware(app);

httpServer.listen(PORT, () => {
	log.info(
		`Server started in ${IS_PROD ? Env.Production : Env.Development} mode - listening on ${!IS_PROD ? "http://localhost:" : "port "}${PORT}`
	);
});
