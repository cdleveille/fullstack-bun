import { Env } from "@constants";

const MONGO_URI = Bun.env.MONGO_URI || "mongodb://localhost:27017/fullstack-bun";

export const Config = {
	IS_PROD: Bun.env.BUN_ENV === Env.Production || Bun.env.NODE_ENV === Env.Production,
	PORT: parseInt(Bun.env.PORT || "3000"),
	MONGO_URI,
	SKIP_DB: Bun.env.SKIP_DB === "true" || !MONGO_URI
};
