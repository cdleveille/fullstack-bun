import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

import { Path } from "@constants";
import { Config } from "@helpers";
import type { OpenAPIHono } from "@hono/zod-openapi";

const { WS_PORT, HOST } = Config;
const WS_HOST = Config.HOST.replace("http", "ws");

export const initMiddleware = (app: OpenAPIHono) => {
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
				scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net/npm/@scalar/api-reference"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcAttr: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				workerSrc: ["'self'", "blob:"]
			}
		})
	);

	app.get(
		"/*",
		serveStatic({
			root: Path.Public,
			onFound: (_path, c) => c.header("Cache-Control", "no-store")
		})
	);
};
