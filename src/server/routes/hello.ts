import { Elysia, t } from "elysia";

export const helloRouter = new Elysia()
	.get(
		"",
		c => {
			const { name } = c.query;
			return {
				message: `hello ${name ?? "world"}!`
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
		"",
		c => {
			const { name } = c.body;
			return {
				message: `hello ${name ?? "world"}!`
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
