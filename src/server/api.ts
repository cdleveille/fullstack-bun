import { Elysia, t } from "elysia";

import { WS_TIMEOUT } from "@/shared/constants";
import { Schema } from "@/shared/schema";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { message } = c.query;
      console.log(`get /api/hello${message ? ` "${message}"` : ""}`);
      return { message: "get: hello from bun!" };
    },
    Schema.hello.get,
  )
  .post(
    "/hello",
    c => {
      const { message } = c.body;
      console.log(`post /api/hello "${message}"`);
      return { message: "post: hello from bun!" };
    },
    Schema.hello.post,
  )
  .ws("/hello", {
    message(ws, { message }) {
      console.log(`ws /api/hello "${message}"`);
      ws.send({ message: "ws: hello from bun!" });
    },
    idleTimeout: WS_TIMEOUT,
    ...Schema.hello.ws,
  });
