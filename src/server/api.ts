import { Elysia } from "elysia";

import { WS_TIMEOUT } from "@/shared/constants";
import { schema } from "@/shared/schema";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { message } = c.query;
      console.log(`get /api/hello${message ? ` "${message}"` : ""}`);
      return { message: "get: hello from bun!" };
    },
    schema.api.hello.get,
  )
  .post(
    "/hello",
    c => {
      const { message } = c.body;
      console.log(`post /api/hello "${message}"`);
      return { message: "post: hello from bun!" };
    },
    schema.api.hello.post,
  )
  .ws("/hello", {
    message(ws, { message }) {
      console.log(`ws /api/hello "${message}"`);
      ws.send({ message: "ws: hello from bun!" });
    },
    idleTimeout: WS_TIMEOUT,
    ...schema.api.hello.ws,
  });
