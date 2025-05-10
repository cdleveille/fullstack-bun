import { $ } from "bun";
import { copyPlugin } from "bun-copy-plugin";
import { injectManifest } from "workbox-build";

import { Env, HASH_REGEX, Path } from "@constants";
import { Config, log, now } from "@helpers";

const start = now();

const src = Path.ClientSrc;
const outdir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "manifest.json"];

log.info("Building client for production...");

await $`rm -rf ${outdir}`;

await Bun.build({
	entrypoints: [`${src}/index.html`, `${src}/sw.ts`],
	outdir,
	define: {
		"import.meta.env.ENV": JSON.stringify(Env.Production),
		"import.meta.env.PORT": JSON.stringify(Config.PORT)
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

log.info(`Build completed in ${buildTime} ms ✅`);

log.info("Precaching build manifest in sw.js...");

const { count } = await injectManifest({
	globDirectory: outdir,
	globPatterns: ["**/*.*"],
	swSrc: `${outdir}/sw.js`,
	swDest: `${outdir}/sw.js`,
	maximumFileSizeToCacheInBytes: 5000000,
	dontCacheBustURLsMatching: HASH_REGEX
});

log.info(`${count} URLs were precached ✅`);
