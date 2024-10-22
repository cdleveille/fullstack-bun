import { Env } from "@constants";

const IS_PROD = Bun.env.BUN_ENV === Env.Production || Bun.env.NODE_ENV === Env.Production;

const PORT = parseInt(Bun.env.PORT || (IS_PROD ? "8080" : "3000"));

const MONGO_URI = IS_PROD ? Bun.env.MONGO_URI : Bun.env.MONGO_URI || "mongodb://localhost:27017/fullstack-bun";

const SKIP_DB = Bun.env.SKIP_DB === "true";

if (IS_PROD && !MONGO_URI && !SKIP_DB)
	throw new Error('MONGO_URI env var is required in production if SKIP_DB is not set to "true"');

export const Config = {
	IS_PROD,
	PORT,
	MONGO_URI,
	SKIP_DB
};
