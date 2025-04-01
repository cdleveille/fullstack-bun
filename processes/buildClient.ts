import { $ } from "bun";
import copy from "bun-copy-plugin";

import { Env, Path } from "@constants";
import { Config, log, now, parseArg } from "@helpers";

const env = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");
const isProd = Config.IS_PROD || env === Env.Production;

const src = Path.ClientSrc;
const outdir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "manifest.json"];

export const buildClient = async () => {
	const start = now();

	await $`rm -rf ${outdir}`;

	await Bun.build({
		entrypoints: [`${src}/index.html`, `${src}/sw.ts`],
		outdir,
		define: { "Bun.env.IS_PROD": `"${isProd}"`, "Bun.env.WS_PORT": `"${Config.WS_PORT}"` },
		sourcemap: isProd ? "none" : "linked",
		naming: {
			entry: "[dir]/[name].[ext]",
			asset: "[dir]/[name]-[hash].[ext]"
		},
		plugins: toCopy.map(path => copy(`${src}/${path}`, `${outdir}/${path}`)),
		minify: isProd
	});

	const buildTime = (now() - start).toFixed(2);

	log.info(
		`Build completed in ${isProd ? Env.Production : Env.Development} mode in ${buildTime}ms`
	);
};
