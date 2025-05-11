import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

import { Path, Route } from "@constants";
import { Config } from "@helpers";

const src = Path.ClientSrc;
const outDir = Path.Public;

const toCopy = ["icons/", "favicon.ico"];

const target = `http://localhost:${Config.PORT}`;

export default defineConfig(({ mode }) => {
	return {
		root: resolve(src),
		define: {
			"import.meta.env.ENV": JSON.stringify(mode),
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
		},
		build: {
			outDir: resolve(outDir),
			emptyOutDir: true,
			sourcemap: false,
			minify: true,
			rollupOptions: {
				input: {
					main: resolve(src, "index.html"),
					sw: resolve(src, "sw.ts")
				},
				output: {
					manualChunks: path => {
						if (path.includes("node_modules")) return "vendor";
						return null;
					},
					chunkFileNames: "assets/[name]~[hash].js",
					entryFileNames: entry => {
						if (entry.name === "sw") return "sw.js";
						return "assets/[name]~[hash].js";
					},
					assetFileNames: asset => {
						if (asset.names.includes("manifest.json")) return "manifest.json";
						return "assets/[name]~[hash][extname]";
					}
				}
			}
		},
		plugins: [
			react(),
			tsconfigPaths(),
			viteStaticCopy({
				targets: toCopy.map(path => ({
					src: resolve(src, path),
					dest: "./"
				}))
			})
		]
	};
});
