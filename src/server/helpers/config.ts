import { Env } from "@constants";

const IS_PROD = Bun.env.VITE_ENV === Env.Production;

const VITE_PORT = Number.parseInt(Bun.env.VITE_PORT ?? "5173");

const PORT = Number.parseInt(Bun.env.VITE_HTTP_PORT ?? "3000");

const WS_PORT = Number.parseInt(Bun.env.VITE_WS_PORT ?? "3001");

const HOST = Bun.env.VITE_HOST ?? "http://localhost";

export const Config = {
	IS_PROD,
	VITE_PORT,
	PORT,
	WS_PORT,
	HOST
};
