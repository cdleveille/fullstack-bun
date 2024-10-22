import { type NextFunction, type Request, type Response, Router } from "express";

import { Route } from "@constants";

export const helloRouter = Router();

helloRouter.get(Route.Hello, (_req: Request, res: Response, next: NextFunction) => {
	try {
		res.json({ message: "hello from bun!" });
	} catch (error) {
		next(error);
	}
});
