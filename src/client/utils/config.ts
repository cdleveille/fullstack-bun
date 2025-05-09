import { Env } from "@constants";

export const Config = {
	IS_PROD: import.meta.env.VITE_ENV === Env.Production
};
