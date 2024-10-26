import { type Express } from "express";

import { registerUserEndpoints } from "@endpoints";

export * from "./user";

export const registerEndpoints = (app: Express) => {
	registerUserEndpoints(app);
};
