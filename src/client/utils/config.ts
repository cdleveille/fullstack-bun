import { Env } from "@constants";

export const Config = {
	IS_PROD: import.meta.env.VITE_ENV === Env.Production,
	WS_PORT: Number.parseInt(import.meta.env.VITE_WS_PORT ?? "3001")
};
