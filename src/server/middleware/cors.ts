import { Hono } from "hono";
import { cors } from "hono/cors";

export const useCors = (app: Hono) => app.use("*", cors());
