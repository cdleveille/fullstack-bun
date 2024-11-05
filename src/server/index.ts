import { Env } from "@constants";
import { Config, initErrorHandling, initSocket } from "@helpers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { initMiddleware } from "@middleware";
import { initRoutes } from "@routes";

const { IS_PROD, PORT } = Config;

const buildIfDev = IS_PROD ? [] : [(await import("@processes")).buildClient()];

await Promise.all([...buildIfDev, initSocket()]);

const app = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: result.error.errors
						.map(err => {
							const error = err as typeof err & { expected?: string };
							const path = error.path.join(".");
							const message = error.message;
							const expected = error.expected ? ` <${error.expected}>` : "";
							return `${path}${expected}: ${message}`;
						})
						.join(", ")
				},
				400
			);
		}
	},
	strict: false
});

initMiddleware(app);

initRoutes(app);

initErrorHandling(app);

console.log(`HTTP server started on port ${PORT} in ${IS_PROD ? Env.Production : Env.Development} mode`);

export default {
	port: Config.PORT,
	fetch: app.fetch
};
