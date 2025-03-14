import copy from "bun-copy-plugin";
import path from "path";
import { rimrafSync } from "rimraf";

import { Env, Path } from "@constants";
import { Config, log } from "@helpers";

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");

const IS_PROD = Config.IS_PROD || BUN_ENV === Env.Production;

const copyFolders = ["assets"];
const copyFiles = ["browserconfig.xml", "favicon.ico", "manifest.json"];

const now = () => performance?.now?.() ?? Date.now();

const src = Path.ClientSrc;
const outdir = Path.Public;

export const buildClient = async () => {
	try {
		const start = now();

		rimrafSync(path.resolve(outdir));

		const results = await Promise.all([
			Bun.build({
				entrypoints: [path.join(src, "index.html")],
				outdir: outdir,
				define: { "Bun.env.IS_PROD": `"${IS_PROD}"`, "Bun.env.WS_PORT": `"${Config.WS_PORT}"` },
				sourcemap: IS_PROD ? "none" : "linked",
				naming: {
					entry: "[dir]/[name].[ext]",
					asset: "[dir]/[name]~[hash].[ext]"
				},
				plugins: [
					...copyFolders.map(folder => copy(`${path.join(src, folder)}/`, `${path.join(outdir, folder)}/`)),
					...copyFiles.map(file => copy(path.join(src, file), path.join(outdir, file)))
				],
				minify: IS_PROD
			}),
			Bun.build({ entrypoints: [path.join(src, "sw.ts")], outdir: outdir, minify: IS_PROD })
		]);

		for (const result of results) {
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			if (!result.success) throw result.logs;
		}

		const buildTime = parseFloat((now() - start).toFixed(2));

		log.info(`Build completed in ${IS_PROD ? Env.Production : Env.Development} mode in ${buildTime}ms`);
	} catch (error) {
		throw new AggregateError(error instanceof Array ? error : [error]);
	}
};
