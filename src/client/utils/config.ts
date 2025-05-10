import { Env } from "@constants";

export const Config = {
	IS_PROD: import.meta.env.ENV === Env.Production,
	PORT: Number.parseInt(import.meta.env.PORT ?? "3000")
};
