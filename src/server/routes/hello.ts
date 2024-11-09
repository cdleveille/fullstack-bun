import { Elysia, t } from "elysia";

import { resMessageSchema } from "@helpers";

export const helloRouter = new Elysia()
	.get(
		"/",
		c => {
			const { name } = c.query;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			query: t.Object({ name: t.Optional(t.String()) }),
			response: resMessageSchema
		}
	)
	.post(
		"/",
		c => {
			const { name } = c.body;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			body: t.Object({ name: t.String() }),
			response: resMessageSchema
		}
	);
