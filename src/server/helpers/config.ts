import type { IConfig } from "@types";

export const Config = {
	IS_PROD: Bun.env.BUN_ENV === "production" || Bun.env.NODE_ENV === "production",
	HOST: Bun.env.HOST || "http://localhost",
	PORT: parseInt(Bun.env.PORT || "3000"),
	RELOAD_PORT: 3001,
	MONGO_URI: Bun.env.MONGO_URI || "mongodb://localhost:27017/fullstack-bun"
} as IConfig;
