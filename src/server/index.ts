import { Elysia, ValidationError } from "elysia";

import { Env, ErrorMessage, Path } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { Config, initSocket, log, plugins } from "@helpers";
import { helloRouter } from "@routes";

const { IS_PROD, PORT } = Config;

const buildIfDev = async () => {
	if (IS_PROD) return;
	const { buildClient } = await import("@processes");
	await buildClient();
};

await Promise.all([buildIfDev(), initSocket()]);

new Elysia()
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
	.use(staticPlugin({ prefix: "/", assets: Path.Public, noCache: true }))
	.get("/health", "OK")
	.group("/hello", app => app.use(helloRouter))
	.listen({ port: PORT, development: !IS_PROD }, ({ development, url }) =>
		log.info(
			`HTTP server listening on ${url.origin} in ${development ? Env.Development : Env.Production} mode`
		)
	);
