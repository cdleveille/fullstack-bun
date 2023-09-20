import { Hono } from "hono";

import { Config, errorResponse, successResponse } from "@helpers";

export const initWsRoutes = (app: Hono) => {
	app.get("/ws", async c => {
		try {
			const { IS_PROD, HOST, WS_PORT } = Config;
			return successResponse(c, { IS_PROD, HOST, WS_PORT });
		} catch (error) {
			return errorResponse(c, error);
		}
	});
};
