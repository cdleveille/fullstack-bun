import { DefaultConfig } from "@shared/constants";
import type { TConfig } from "@shared/types";

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : DefaultConfig.PORT;

const DEV_PORT = process.env.DEV_PORT
	? Number.parseInt(process.env.DEV_PORT)
	: DefaultConfig.DEV_PORT;

const HOST = process.env.HOST ?? DefaultConfig.HOST;

export const Config: TConfig = {
	PORT,
	DEV_PORT,
	HOST
};
