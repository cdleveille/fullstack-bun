import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { Env } from "@constants";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react(), tsconfigPaths()],
		root: "src/client",
		define: {
			"import.meta.env.VITE_ENV": JSON.stringify(env.VITE_ENV ?? Env.Development),
			"import.meta.env.VITE_WS_PORT": JSON.stringify(env.VITE_WS_PORT ?? "3001")
		},
		server: {
			open: true,
			hmr: true,
			port: Number.parseInt(env.VITE_PORT ?? "5173"),
			strictPort: false,
			proxy: {
				"/api": {
					target: `http://localhost:${env.VITE_HTTP_PORT ?? "3000"}`,
					changeOrigin: true
				}
			},
			fs: {
				deny: ["sw.*"]
			}
		}
	};
});
