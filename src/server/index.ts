import { Elysia, t, ValidationError } from "elysia";
import { helmet } from "elysia-helmet";

import { Env } from "@constants";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Config, initSocket, resMessageSchema } from "@helpers";

import { name, version } from "../../package.json";

const { IS_PROD, PORT, WS_PORT, HOST } = Config;
const WS_HOST = Config.HOST.replace("http", "ws");

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
	.use(cors())
	.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					baseUri: ["'self'"],
					childSrc: ["'self'"],
					connectSrc: ["'self'", `${HOST}:${WS_PORT}`, `${WS_HOST}:${WS_PORT}`],
					fontSrc: ["'self'", "https:", "data:"],
					formAction: ["'self'"],
					frameAncestors: ["'self'"],
					frameSrc: ["'self'"],
					imgSrc: ["'self'", "data:"],
					manifestSrc: ["'self'"],
					mediaSrc: ["'self'"],
					objectSrc: ["'none'"],
					scriptSrc: ["'self'"],
					scriptSrcAttr: ["'none'"],
					scriptSrcElem: ["*", "'unsafe-inline'"],
					styleSrc: ["'self'", "https:", "'unsafe-inline'"],
					styleSrcAttr: ["'self'", "https:", "'unsafe-inline'"],
					styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
					upgradeInsecureRequests: [],
					workerSrc: ["'self'", "blob:"]
				}
			}
		})
	)
	.use(swagger({ path: "/reference", documentation: { info: { title: name, version } } }))
	.use(staticPlugin({ prefix: "/", assets: "./public" }))
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
