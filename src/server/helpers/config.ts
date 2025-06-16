import { DefaultConfig, Env } from "@/shared/constants";
import type { TConfig } from "@/shared/types";

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : DefaultConfig.PORT;

const HOST = process.env.HOST ?? DefaultConfig.HOST;

const SERVE_STATIC = !Bun.argv.some(arg => arg === "--no-serve-static");

export const Config: TConfig = { PORT, HOST, SERVE_STATIC };

export const isCustomHost = HOST !== DefaultConfig.HOST;
