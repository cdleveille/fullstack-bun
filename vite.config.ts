import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

import { Config } from "@server/helpers/config";
import { Env, Path, Route } from "@shared/constants";

const root = Path.ClientSrc;
const outDir = Path.Public;

const toCopy = ["icons/", "favicon.ico"];

export default defineConfig(({ mode }) => ({
	root: resolve(root),
	define: {
		"import.meta.env.MODE": JSON.stringify(mode),
		"import.meta.env.PORT": JSON.stringify(Config.PORT)
	},
	server: {
		open: true,
		hmr: true,
		strictPort: false,
		proxy: {
			[Route.Api]: {
				target: `http://localhost:${Config.PORT}`,
				changeOrigin: true
			}
		},
		fs: { deny: ["sw.*"] }
	},
	build: {
		outDir: resolve(outDir),
		emptyOutDir: true,
		sourcemap: false,
		minify: true,
		rollupOptions: {
			input: {
				main: resolve(root, "index.html"),
				sw: resolve(root, "sw.ts")
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
		...[
			mode === Env.Production
				? viteStaticCopy({
						targets: toCopy.map(path => ({
							src: resolve(root, path),
							dest: "./"
						}))
					})
				: []
		]
	]
}));
