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
			"import.meta.env.VITE_ENV": JSON.stringify(env.VITE_ENV ?? Env.Development)
		},
		server: {
			open: true,
			hmr: true,
			port: Number.parseInt(env.VITE_DEV_PORT ?? "5173"),
			strictPort: false,
			proxy: {
				"/api": {
					target: `http://localhost:${env.VITE_PORT ?? "3000"}`,
					changeOrigin: true
				},
				"/socket.io": {
					target: `http://localhost:${env.VITE_PORT ?? "3000"}`,
					ws: true
				}
			},
			fs: {
				deny: ["sw.*"]
			}
		}
	};
});
