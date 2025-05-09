import { createServer } from "node:http";
import { Elysia, ValidationError } from "elysia";

import { Env, ErrorMessage, Path } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { Config, createNodeHandler, initSocket, log, plugins } from "@helpers";
import { apiRouter } from "@routes";

const { IS_PROD, PORT } = Config;

const app = new Elysia()
	.onError(c => {
		if (c.error instanceof ValidationError) {
			c.set.status = 400;
			return { message: c.error.all.map(e => e.summary).join(", ") };
		}
		const message =
			c.error instanceof Error
				? (c.error?.message ?? ErrorMessage.InternalServerError)
				: ErrorMessage.InternalServerError;
		return { message };
	})
	.onBeforeHandle(c => {
		c.set.headers.vary = "Origin";
	})
	.use(plugins)
	.use(staticPlugin({ prefix: "/", assets: IS_PROD ? Path.Public : "", noCache: true }))
	.get("/health", "OK")
	.group("/api", app => app.use(apiRouter));

const server = createServer(createNodeHandler(app));

initSocket(server);

server.listen(PORT, () =>
	log.info(
		`HTTP server listening on http://localhost:${PORT} in ${IS_PROD ? Env.Production : Env.Development} mode`
	)
);
