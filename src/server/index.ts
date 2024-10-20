import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createServer } from "http";
import nocache from "nocache";
import path from "path";

import { helloRouter } from "@controllers";
import { Config } from "@helpers";
import { errorHandler, notFound } from "@middleware";
import { buildClient, connectToDatabase, initSocket, log } from "@services";

const { IS_PROD, HOST, PORT, SKIP_DB } = Config;

const PUBLIC_DIR = path.resolve("./public");

await buildClient();

if (!SKIP_DB) await connectToDatabase();

const app = express();

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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	handler: (_req, res, _next, options) => {
		res.status(options.statusCode).json({ error: "Too Many Requests" });
	},
	standardHeaders: true,
	legacyHeaders: true
});
if (IS_PROD) app.use(limiter);

app.use(compression());

app.use(cors());

app.use(express.static(PUBLIC_DIR));

app.set("json spaces", 2);

app.disable("x-powered-by");

app.use(helloRouter);

app.use(notFound);

app.use(errorHandler);

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => {
	log.info(`Server started in ${IS_PROD ? "production" : "development"} mode - listening on ${HOST}:${PORT}`);
});
