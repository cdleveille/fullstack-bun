import express from "express";
import { createServer } from "http";

import { Env } from "@constants";
import { initEndpoints } from "@endpoints";
import { Config } from "@helpers";
import { errorHandler, initMiddleware, notFound } from "@middleware";
import { connectToDatabase, initSocket, log } from "@services";

const { IS_PROD, PORT, SKIP_DB } = Config;

if (!IS_PROD) {
	const { buildClient } = await import("@processes");
	await buildClient();
}

if (!SKIP_DB) await connectToDatabase();

const app = express();

app.set("json spaces", 2);

app.disable("x-powered-by");

const httpServer = createServer(app);
await initSocket(httpServer);

initMiddleware(app);

initEndpoints(app);

// these must be applied last
app.use(notFound());
app.use(errorHandler());

httpServer.listen(PORT, () => {
	log.info(
		`Server started in ${IS_PROD ? Env.Production : Env.Development} mode - listening on ${!IS_PROD ? "http://localhost:" : "port "}${PORT}`
	);
});
