import { Elysia, t } from "elysia";

import { Route } from "@constants";

export const api = new Elysia({ prefix: Route.Api })
	.get(
		Route.Hello,
		c => {
			const { name } = c.query ?? {};
			return {
				message: `hello ${name || "from bun"}!`
			};
		},
		{
			query: t.Object({
				name: t.Optional(t.String())
			}),
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
			return {
				message: `hello ${name || "from bun"}!`
			};
		},
		{
			body: t.Object({ name: t.String() }),
			response: {
				200: t.Object({ message: t.String() }),
				400: t.Object({ message: t.String() }),
				500: t.Object({ message: t.String() })
			}
		}
	);

export type TApi = typeof api;
