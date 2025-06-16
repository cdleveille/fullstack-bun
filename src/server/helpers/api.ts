import { Elysia, t } from "elysia";

import { Route } from "@/shared/constants";

export const api = new Elysia({ prefix: Route.Api })
	.get(
		Route.Hello,
		c => {
			const { name } = c.query;
			return { message: `hello ${name || "from bun"}!` };
		},
		{
			query: t.Object({ name: t.Optional(t.String()) }),
			response: {
				200: t.Object({ message: t.String() }),
				500: t.Object({ message: t.String() })
			}
		}
	)
	.post(
		Route.Hello,
		c => {
			const { name } = c.body;
			return { message: `hello ${name}!` };
		},
		{
			body: t.Object({ name: t.String() }),
			response: {
				200: t.Object({ message: t.String() }),
				422: t.Object({ message: t.String() }),
				500: t.Object({ message: t.String() })
			}
		}
	)
	.ws(Route.Hello, {
		message(ws, { message }) {
			console.log(message);
			ws.send({ message: "hello from bun!" });
		},
		idleTimeout: 1000 * 60 * 5, // 5 minutes
		body: t.Object({ message: t.String() }),
		response: t.Object({ message: t.String() })
	});

export type TApi = typeof api;
