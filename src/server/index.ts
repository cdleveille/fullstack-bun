import { Elysia, t, ValidationError } from "elysia";

import { Env } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Config, initSocket, resMessageSchema } from "@helpers";

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
	.get(
		"/hello",
		c => {
			const { name } = c.query;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			query: t.Object({ name: t.Optional(t.String()) }),
			response: resMessageSchema
		}
	)
	.post(
		"/hello",
		c => {
			const { name } = c.body;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			body: t.Object({ name: t.String() }),
			response: resMessageSchema
		}
	)
	.listen(PORT);

const url = app?.server?.url?.toString();
console.log(`HTTP server listening on ${url} in ${IS_PROD ? Env.Production : Env.Development} mode`);
