import { DefaultConfig } from "@/shared/constants";
import type { TConfig } from "@/shared/types";

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : DefaultConfig.PORT;

export const Config: TConfig = { PORT };
