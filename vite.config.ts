import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { Env, Path, Route } from "@constants";
import { Config } from "@helpers";

const target = `http://localhost:${Config.PORT}`;

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	root: Path.ClientSrc,
	define: {
		"import.meta.env.VITE_ENV": JSON.stringify(Env.Development),
		"import.meta.env.PORT": JSON.stringify(Config.PORT)
	},
	server: {
		open: true,
		hmr: true,
		port: Config.DEV_PORT,
		strictPort: true,
		proxy: {
			[Route.Api]: {
				target,
				changeOrigin: true
			}
		},
		fs: {
			deny: ["sw.*"]
		}
	}
});
