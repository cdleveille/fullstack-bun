import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

export const useSecureHeaders = (app: Hono) => app.use("*", secureHeaders());
