import { Elysia, ValidationError } from "elysia";

import { Env } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Config, initSocket } from "@helpers";
import { helloRouter } from "@routes";

import { name, version } from "../../package.json";

const { IS_PROD, PORT } = Config;

const buildIfDev = IS_PROD ? [] : [(await import("@processes")).buildClient()];

await Promise.all([...buildIfDev, initSocket()]);

const app = new Elysia()
	.onError(c => {
		if (c.error instanceof ValidationError) {
			return {
				message: c.error.all.map(e => e.summary).join(", ")
			};
		}
		return { message: c.error?.message ?? "Internal Server Error" };
	})
	.use(swagger({ path: "/reference", documentation: { info: { title: name, version } } }))
	.use(staticPlugin({ prefix: "/", assets: "./public", noCache: true }))
	.get("/health", () => "OK")
	.group("/hello", app => app.use(helloRouter))
	.listen({ port: PORT });

const url = app?.server?.url?.toString();
console.log(`HTTP server listening on ${url} in ${IS_PROD ? Env.Production : Env.Development} mode`);
