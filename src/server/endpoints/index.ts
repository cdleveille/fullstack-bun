import { type Express } from "express";

import { userRouter } from "@endpoints";

export * from "./user";

export const initEndpoints = (app: Express) => {
	app.use("/user", userRouter);
};
