import { Elysia, t } from "elysia";

import { io } from "@/server/helpers/socket";
import { SocketEvent } from "@/shared/constants";
import { Route } from "@/shared/constants";

export const api = new Elysia({ prefix: Route.Api })
	.get(
		Route.Hello,
		c => {
			const { name } = c.query;
			return { message: `get: hello ${name || "from bun"}!` };
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
			return { message: `post: hello ${name || "from bun"}!` };
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
			ws.send({ message: "ws: hello from bun!" });
		},
		body: t.Object({ message: t.String() }),
		response: t.Object({ message: t.String() })
	});

export type TApi = typeof api;

io.on(SocketEvent.Connect, socket => {
	socket.on(SocketEvent.Hello, message => {
		console.log(message);
		socket.emit(SocketEvent.Hello, { message: "hello from bun!" });
	});
});
