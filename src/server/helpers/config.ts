import { Env } from "@constants";

const IS_PROD = Bun.env.VITE_ENV === Env.Production;

const PORT = Number.parseInt(Bun.env.VITE_PORT ?? "3000");

const DEV_PORT = Number.parseInt(Bun.env.VITE_DEV_PORT ?? "5173");

const HOST = Bun.env.VITE_HOST ?? "http://localhost";

export const Config = {
	IS_PROD,
	PORT,
	DEV_PORT,
	HOST
};
