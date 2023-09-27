import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import { Config } from "@helpers";

export const useSecureHeaders = (app: Hono) =>
	app.use(
		"*",
		secureHeaders({
			contentSecurityPolicy: {
				defaultSrc: ["'self'"],
				baseUri: ["'self'"],
				childSrc: ["'self'"],
				connectSrc: [
					"'self'",
					`${Config.HOST}:${Config.WS_PORT}`,
					`${Config.HOST.replace("http", "ws")}:${Config.WS_PORT}`
				],
				fontSrc: ["'self'", "https:", "data:"],
				formAction: ["'self'"],
				frameAncestors: ["'self'"],
				frameSrc: ["'self'"],
				imgSrc: ["'self'", "data:"],
				manifestSrc: ["'self'"],
				mediaSrc: ["'self'"],
				objectSrc: ["'none'"],
				reportTo: "endpoint-1",
				sandbox: ["allow-same-origin", "allow-scripts"],
				scriptSrc: ["'self'"],
				scriptSrcAttr: ["'none'"],
				scriptSrcElem: ["'self'"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcAttr: ["none"],
				styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				workerSrc: ["'self'"]
			},
			xFrameOptions: false,
			xXssProtection: false
		})
	);
