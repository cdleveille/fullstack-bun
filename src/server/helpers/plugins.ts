import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Config } from "@helpers";

import { description, name, version } from "../../../package.json";

const { HOST, WS_PORT } = Config;
const WS_HOST = Config.HOST.replace("http", "ws");

export const plugins = new Elysia()
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
	.use(
		swagger({
			path: "/reference",
			documentation: { info: { title: name, version, description } },
			exclude: ["/health"]
		})
	);
