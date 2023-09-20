import { Hono } from "hono";

import { useCors, useSecureHeaders } from "@plugins";

export const initPlugins = (app: Hono) => {
	useCors(app);
	useSecureHeaders(app);
};

export * from "./cors";
export * from "./secureHeaders";
