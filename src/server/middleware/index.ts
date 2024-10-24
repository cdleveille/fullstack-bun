import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import nocache from "nocache";
import path from "path";

import { Path } from "@constants";

export const initMiddleware = (app: Express) => {
	app.use(express.static(path.resolve(Path.Public)));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(compression());

	app.use(cors());

	app.use(nocache());

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
};

export * from "./errorHandler";
export * from "./notFound";
