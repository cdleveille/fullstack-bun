import { DefaultConfig } from "@shared/constants";
import type { TConfig } from "@shared/types";

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : DefaultConfig.PORT;

const HOST = process.env.HOST ?? DefaultConfig.HOST;

export const Config: TConfig = { PORT, HOST };

export const isCustomHost = HOST !== DefaultConfig.HOST;
