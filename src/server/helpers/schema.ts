import { z } from "@hono/zod-openapi";

export const resMessageSchema = z.object({ message: z.string() });
