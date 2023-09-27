import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import { Config } from "@helpers";

export const useSecureHeaders = (app: Hono) => {
	app.use(
		"/",
		secureHeaders({
			...baseHeaders,
			contentSecurityPolicy
		})
	);
	app.use("*", secureHeaders(baseHeaders));
};

const WS_HOST = Config.HOST.replace("http", "ws");

const baseHeaders = {
	xFrameOptions: false,
	xXssProtection: false
};

const contentSecurityPolicy = {
	defaultSrc: ["'self'"],
	baseUri: ["'self'"],
	childSrc: ["'self'"],
	connectSrc: ["'self'", `${Config.HOST}:${Config.WS_PORT}`, `${WS_HOST}:${Config.WS_PORT}`],
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
	styleSrcAttr: ["none"],
	styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
	upgradeInsecureRequests: [],
	workerSrc: ["'self'"]
};
