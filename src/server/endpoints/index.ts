import { type Express } from "express";

import { registerUserEndpoints } from "@endpoints";

export * from "./user";

export const initEndpoints = (app: Express) => {
	const { userRouter } = registerUserEndpoints();
	app.use("/user", userRouter);
};
