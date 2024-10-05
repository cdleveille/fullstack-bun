import { NextFunction, Request, Response, Router } from "express";

export const helloRouter = Router();

helloRouter.get("/hello", (_req: Request, res: Response, next: NextFunction) => {
	try {
		res.json({ message: "hello from bun!" });
	} catch (error) {
		next(error);
	}
});
