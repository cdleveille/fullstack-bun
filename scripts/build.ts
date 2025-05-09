import { $ } from "bun";
import { copyPlugin } from "bun-copy-plugin";

import { Env, Path } from "@constants";
import { Config, log, now } from "@helpers";

const start = now();

const src = Path.ClientSrc;
const outdir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "manifest.json"];

await $`rm -rf ${outdir}`;

await Bun.build({
	entrypoints: [`${src}/index.html`, `${src}/sw.ts`],
	outdir,
	define: {
		"import.meta.env.VITE_ENV": `"${Env.Production}"`,
		"import.meta.env.VITE_PORT": `"${Config.PORT}"`
	},
	sourcemap: "none",
	naming: {
		entry: "[dir]/[name].[ext]",
		asset: "[dir]/[name]~[hash].[ext]",
		chunk: "[dir]/chunk~[hash].[ext]"
	},
	plugins: toCopy.map(path => copyPlugin(`${src}/${path}`, `${outdir}/${path}`)),
	minify: true
});

const buildTime = (now() - start).toFixed(2);

log.info(`Build completed in ${buildTime}ms`);

process.exit(0);
