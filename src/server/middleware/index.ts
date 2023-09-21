import { Hono } from "hono";

import { useCors, useSecureHeaders } from "@middleware";

export const initMiddleware = (app: Hono) => {
	useCors(app);
	useSecureHeaders(app);
};

export * from "./cors";
export * from "./secureHeaders";
