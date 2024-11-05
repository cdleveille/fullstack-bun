import { resMessageSchema } from "@helpers";
import { createRoute, type OpenAPIHono, z } from "@hono/zod-openapi";

export const initHelloRoutes = (app: OpenAPIHono) => {
	app.openapi(
		createRoute({
			method: "get",
			path: "/hello",
			request: {
				query: z.object({ name: z.string().optional() })
			},
			responses: {
				200: {
					content: { "application/json": { schema: resMessageSchema } },
					description: "ok"
				}
			}
		}),
		c => {
			const { name } = c.req.valid("query");
			const message = `Hello ${name ? name : "World"}!`;
			return c.json({ message }, 200);
		}
	);

	app.openapi(
		createRoute({
			method: "post",
			path: "/hello",
			request: {
				body: {
					content: { "application/json": { schema: z.object({ name: z.string().min(1) }) } }
				}
			},
			responses: {
				200: {
					content: { "application/json": { schema: resMessageSchema } },
					description: "ok"
				},
				400: {
					content: { "application/json": { schema: resMessageSchema } },
					description: "bad request"
				}
			}
		}),
		c => {
			const body = c.req.valid("json");
			const message = `Hello ${body.name || "World"}!`;
			return c.json({ message }, 200);
		}
	);
};
