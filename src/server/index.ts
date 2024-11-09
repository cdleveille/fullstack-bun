import { Elysia, ValidationError } from "elysia";

import { Env } from "@constants";
import { Config, initSocket, log, middleware } from "@helpers";
import { helloRouter } from "@routes";

const { IS_PROD, PORT } = Config;

const buildIfDev = IS_PROD ? [] : [(await import("@processes")).buildClient()];

await Promise.all([...buildIfDev, initSocket()]);

new Elysia()
	.onError(c => {
		if (c.error instanceof ValidationError)
			return {
				message: c.error.all.map(e => e.summary).join(", ")
			};
		return { message: c.error?.message ?? "Internal Server Error" };
	})
	.use(middleware)
	.get("/health", () => "OK")
	.group("/hello", app => app.use(helloRouter))
	.listen({ port: PORT });

log.info(`HTTP server listening on port ${PORT} in ${IS_PROD ? Env.Production : Env.Development} mode`);
