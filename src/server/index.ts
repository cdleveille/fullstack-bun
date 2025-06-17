import { Elysia } from "elysia";

import { api } from "@/server/api";
import { Config } from "@/server/config";
import { onError } from "@/server/error";
import { plugins } from "@/server/plugins";

const { PORT } = Config;

new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
  .onError(c => onError(c))
  .use(plugins)
  .use(api)
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
