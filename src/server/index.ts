import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import type { StatusCode } from "hono/utils/http-status";

import { Env, Path } from "@constants";
import { Config, initSocket } from "@helpers";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { TMessageRes } from "@types";

const resMessageSchema = z.object({ message: z.string() });
const reqQuerySchema = z.object({ name: z.string().optional() });
const reqBodySchema = z.object({ name: z.string().min(1) });

const { IS_PROD, PORT, WS_PORT, HOST } = Config;
const WS_HOST = Config.HOST.replace("http", "ws");

const app = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: result.error.errors
						.map(err => {
							const error = err as typeof err & { expected?: string };
							const path = error.path.join(".");
							const message = error.message;
							const expected = error.expected ? ` <${error.expected}>` : "";
							return `${path}${expected}: ${message}`;
						})
						.join(", ")
				},
				400
			);
		}
	},
	strict: false
});

if (!IS_PROD) void (await import("@processes")).buildClient();

app.use(cors());
app.use(
	secureHeaders({
		contentSecurityPolicy: {
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
			scriptSrcElem: ["'self'"],
			styleSrc: ["'self'", "https:", "'unsafe-inline'"],
			styleSrcAttr: ["'self'", "https:", "'unsafe-inline'"],
			styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
			upgradeInsecureRequests: [],
			workerSrc: ["'self'", "blob:"]
		}
	})
);

app.openapi(
	createRoute({
		method: "get",
		path: "/hello",
		request: {
			query: reqQuerySchema
		},
		responses: {
			200: {
				content: { "application/json": { schema: resMessageSchema } },
				description: "ok"
			}
		}
	}),
	c => {
		const { name } = c.req.valid("query");
		const message = `Hello ${name ? name : "World"}!`;
		return c.json({ message }, 200);
	}
);

app.openapi(
	createRoute({
		method: "post",
		path: "/hello",
		request: {
			body: {
				content: { "application/json": { schema: reqBodySchema } }
			}
		},
		responses: {
			200: {
				content: { "application/json": { schema: resMessageSchema } },
				description: "ok"
			},
			400: {
				content: { "application/json": { schema: resMessageSchema } },
				description: "bad request"
			}
		}
	}),
	c => {
		const body = c.req.valid("json");
		const message = `Hello ${body.name || "World"}!`;
		return c.json({ message }, 200);
	}
);

app.get("/health", c => c.text("OK"));

app.get("/*", serveStatic({ root: Path.Public }));

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "fullstack-bun"
	}
});

app.notFound(c => c.json({ message: "Not Found" }, 404));
app.onError((e, c) => {
	const errorStatus = ("status" in e && typeof e.status === "number" ? e.status : 500) as StatusCode;
	return c.json<TMessageRes>({ message: e.message || "Internal Server Error" }, errorStatus);
});

await initSocket();

console.log(`Starting server on port ${PORT} in ${IS_PROD ? Env.Production : Env.Development} mode...`);

export default {
	port: Config.PORT,
	fetch: app.fetch
};
