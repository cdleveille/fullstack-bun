import { Hono } from "hono";

import { useCacheControl, useCors, useSecureHeaders } from "@middleware";

export const initMiddleware = (app: Hono) => {
	useCacheControl(app);
	useCors(app);
	useSecureHeaders(app);
};

export * from "./cacheControl";
export * from "./cors";
export * from "./secureHeaders";
