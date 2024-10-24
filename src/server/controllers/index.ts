import type { Express } from "express";

import { router } from "@controllers";

export const initRoutes = (app: Express) => {
	app.use(router);
};

export * from "./router";
