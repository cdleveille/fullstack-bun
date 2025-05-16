import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { Config, isCustomHost } from "@server/helpers/config";
import { AppInfo, Route } from "@shared/constants";

const { HOST, PORT } = Config;

const WS_HOST = HOST.replace("http", "ws");

const connectSrc = isCustomHost ? ["'self'", `${HOST}:${PORT}`, `${WS_HOST}:${PORT}`] : ["*"];

export const plugins = new Elysia()
	.use(cors())
	.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					baseUri: ["'self'"],
					childSrc: ["'self'"],
					connectSrc,
					defaultSrc: ["'self'"],
					fontSrc: ["'self'", "https:", "data:"],
					formAction: ["'self'"],
					frameAncestors: ["'self'"],
					imgSrc: ["'self'", "data:"],
					manifestSrc: ["'self'"],
					mediaSrc: ["'self'"],
					objectSrc: ["'none'"],
					scriptSrc: ["'self'"],
					scriptSrcAttr: ["'none'"],
					scriptSrcElem: [
						"'self'",
						"'sha256-TcUB1mzXiQO4GxpTRZ0EMpOXKMU3u+n/q1WrgVIcs1I='",
						"https://cdn.jsdelivr.net/npm/@scalar/"
					],
					styleSrc: ["'self'"],
					styleSrcAttr: ["'self'", "'unsafe-inline'"],
					styleSrcElem: ["'self'", "'unsafe-inline'"],
					upgradeInsecureRequests: [],
					workerSrc: ["'self'"]
				}
			}
		})
	)
	.use(
		swagger({
			path: `${Route.Api}${Route.Reference}`,
			documentation: {
				info: {
					title: AppInfo.name,
					version: AppInfo.version,
					description: AppInfo.description,
					contact: AppInfo.author,
					license: { name: AppInfo.license }
				}
			}
		})
	);
