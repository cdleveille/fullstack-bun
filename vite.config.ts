import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { Env, Path } from "@constants";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const port = Number.parseInt(env.VITE_DEV_PORT ?? "5173");

	const target = `http://localhost:${env.VITE_PORT ?? "3000"}`;

	return {
		plugins: [react(), tsconfigPaths()],
		root: Path.ClientSrc,
		define: {
			"import.meta.env.VITE_ENV": JSON.stringify(env.VITE_ENV ?? Env.Development),
			"import.meta.env.VITE_PORT": JSON.stringify(env.VITE_PORT)
		},
		server: {
			open: true,
			hmr: true,
			port,
			strictPort: false,
			proxy: {
				"/api": {
					target,
					changeOrigin: true
				}
				// "/socket.io": {
				// 	target,
				// 	changeOrigin: true,
				// 	ws: true
				// }
			},
			fs: {
				deny: ["sw.*"]
			}
		}
	};
});
