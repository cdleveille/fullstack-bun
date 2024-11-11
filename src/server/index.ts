import { Elysia, ValidationError } from "elysia";

import { Env, Path } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { Config, initSocket, log, plugins } from "@helpers";
import { helloRouter } from "@routes";

const { IS_PROD, PORT } = Config;

const buildIfDev = IS_PROD ? [] : [(await import("@processes")).buildClient()];

await Promise.all([...buildIfDev, initSocket()]);

new Elysia()
	.onError(c => {
		if (c.error instanceof ValidationError) {
			c.set.status = 400;
			return { message: c.error.all.map(e => e.summary).join(", ") };
		}
		return { message: c.error?.message ?? "Internal Server Error" };
	})
	.onBeforeHandle(c => {
		c.set.headers.vary = "Origin";
	})
	.use(plugins)
	.use(staticPlugin({ prefix: "/", assets: Path.Public, noCache: true }))
	.get("/health", "OK")
	.group("/hello", app => app.use(helloRouter))
	.listen({ port: PORT });

log.info(`HTTP server listening on port ${PORT} in ${IS_PROD ? Env.Production : Env.Development} mode`);
