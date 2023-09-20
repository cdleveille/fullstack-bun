import { IConfig } from "@types";

export const Config = {
	IS_PROD: Bun.env.BUN_ENV === "production",
	HOST: Bun.env.BUN_ENV === "production" ? "https://prod-url-goes-here.com" : "http://localhost",
	PORT: parseInt(Bun.env.PORT || "3000"),
	WS_PORT: parseInt(Bun.env.WS_PORT || "3001"),
	MONGO_URI: Bun.env.MONGO_URI || "mongodb://localhost:27017/fullstack-bun"
} as IConfig;
