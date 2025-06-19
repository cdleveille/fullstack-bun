import { Elysia, t } from "elysia";

import { WS_TIMEOUT } from "@/shared/constants";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { name } = c.query;
      return { message: `hello ${name || "from bun"}!` };
    },
    {
      query: t.Object({ name: t.Optional(t.String()) }),
      response: {
        200: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
    },
  )
  .post(
    "/hello",
    c => {
      const { name } = c.body;
      return { message: `hello ${name}!` };
    },
    {
      body: t.Object({ name: t.String() }),
      response: {
        200: t.Object({ message: t.String() }),
        422: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
    },
  )
  .ws("/hello", {
    message(ws, { message }) {
      console.log(message);
      ws.send({ message: "hello from bun!" });
    },
    idleTimeout: WS_TIMEOUT,
    body: t.Object({ message: t.String() }),
    response: t.Object({ message: t.String() }),
  });
