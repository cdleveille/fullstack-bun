import compression from "compression";
import cors from "cors";
import type { Express } from "express";
import helmet from "helmet";
import nocache from "nocache";

import { errorHandler, notFound } from "@middleware";

export const initMiddleware = (app: Express) => {
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				baseUri: ["'self'"],
				childSrc: ["'self'"],
				connectSrc: ["'self'"],
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

	app.use(compression());

	app.use(cors());

	app.use(nocache());

	app.use(notFound());

	app.use(errorHandler());
};

export * from "./errorHandler";
export * from "./notFound";
