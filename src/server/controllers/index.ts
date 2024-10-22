import type { Express } from "express";

import { helloRouter } from "@controllers";

export const initRoutes = (app: Express) => {
	app.use(helloRouter);
};

export * from "./hello";
