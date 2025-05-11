import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { Route } from "@constants";
import { Config } from "@server/helpers/config";

import { description, name, version } from "../../../package.json";

const WS_HOST = Config.HOST.replace("http", "ws");

export const plugins = new Elysia()
	.use(cors())
	.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					baseUri: ["'self'"],
					childSrc: ["'self'"],
					connectSrc: [
						"'self'",
						`${Config.HOST}:${Config.PORT}`,
						`${WS_HOST}:${Config.PORT}`
					],
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
			documentation: { info: { title: name, version, description } }
		})
	);
