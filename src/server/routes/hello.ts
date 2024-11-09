import { Elysia, t } from "elysia";

export const helloRouter = new Elysia()
	.get(
		"",
		c => {
			const { name } = c.query;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			query: t.Object({ name: t.Optional(t.String()) }),
			response: t.Object({ message: t.String() })
		}
	)
	.post(
		"",
		c => {
			const { name } = c.body;
			return {
				message: `hello ${name ? name : "world"}!`
			};
		},
		{
			body: t.Object({ name: t.String() }),
			response: t.Object({ message: t.String() })
		}
	);
