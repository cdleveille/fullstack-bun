import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { Env, Path, Route } from "@constants";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const PORT = env.VITE_PORT ?? "3000";

	const target = `http://localhost:${PORT}`;

	return {
		plugins: [react(), tsconfigPaths()],
		root: Path.ClientSrc,
		define: {
			"import.meta.env.VITE_ENV": JSON.stringify(Env.Development),
			"import.meta.env.VITE_PORT": JSON.stringify(PORT)
		},
		server: {
			open: true,
			hmr: true,
			port: Number.parseInt(env.VITE_DEV_PORT ?? "5173"),
			strictPort: false,
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
	};
});
