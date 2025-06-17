import { Elysia } from "elysia";

import { api } from "@/server/helpers/api";
import { Config } from "@/server/helpers/config";
import { onError } from "@/server/helpers/elysia";
import { plugins } from "@/server/helpers/plugins";

const { PORT } = Config;

new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
  .onError(c => onError(c))
  .use(plugins)
  .use(api)
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
