import { Elysia } from "elysia";

import { WS_TIMEOUT } from "@/shared/constants";
import { schema } from "@/shared/schema";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { message } = c.query;
      const { method } = c.request;
      console.log(`${method} ${c.route}${message ? ` "${message}"` : ""}`);
      return { message: `${method}: hello from bun!` };
    },
    schema.api.hello.get,
  )
  .post(
    "/hello",
    c => {
      const { message } = c.body;
      const { method } = c.request;
      console.log(`${c.request.method} ${c.route} "${message}"`);
      return { message: `${method}: hello from bun!` };
    },
    schema.api.hello.post,
  )
  .ws("/hello", {
    message(ws, { message }) {
      const method = "WS";
      console.log(`${method} ${ws.data.path} "${message}"`);
      ws.send({ message: `${method}: hello from bun!` });
    },
    idleTimeout: WS_TIMEOUT,
    ...schema.api.hello.ws,
  });
