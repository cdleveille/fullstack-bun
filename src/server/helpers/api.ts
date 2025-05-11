import { Elysia, t } from "elysia";

import { io } from "@server/helpers/socket";
import { SocketEvent } from "@shared/constants";
import { Route } from "@shared/constants";

export type TApi = typeof api;

export const api = new Elysia({ prefix: Route.Api })
	.get(
		Route.Hello,
		c => {
			const { name } = c.query;
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

io.on(SocketEvent.Connect, socket => {
	socket.on(SocketEvent.Hello, message => {
		console.log(message);
		socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
	});
});
