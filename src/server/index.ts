import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { StatusCode } from "hono/utils/http-status";
import { z } from "zod";

import { Env, Path } from "@constants";
import { Config, initSocket, validatePayloadSchema } from "@helpers";
import type { TMessageRes } from "@types";

const app = new Hono();

const { IS_PROD, PORT, WS_PORT, HOST } = Config;
const WS_HOST = Config.HOST.replace("http", "ws");

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
			styleSrcAttr: ["'none'"],
			styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
			upgradeInsecureRequests: [],
			workerSrc: ["'self'", "blob:"]
		}
	})
);

app.get("/hello", c => {
	const name = c.req.query("name");
	const message = `Hello ${name ?? "World"}!`;
	return c.json<TMessageRes>({ message });
});

app.post("/hello", async c => {
	const bodySchema = z.object({ name: z.string().min(1) });
	const body = await c.req.json<z.infer<typeof bodySchema>>();
	validatePayloadSchema({ payload: body, schema: bodySchema, message: "Invalid request body" });
	const message = `Hello ${body.name || "World"}!`;
	return c.json<TMessageRes>({ message });
});

app.get("/health", c => c.text("OK"));

app.get("/*", serveStatic({ root: Path.Public }));

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
