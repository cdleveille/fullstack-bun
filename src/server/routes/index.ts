import { Elysia, t } from "elysia";

export const apiRouter = new Elysia()
	.get(
		"/hello",
		c => {
			const { name } = c.query;
			return {
				message: `hello ${name || "from bun"}!`
			};
		},
		{
			response: {
				200: t.Object({ message: t.String() }),
				500: t.Object({ message: t.String() })
			}
		}
	)
	.post(
		"/hello",
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
