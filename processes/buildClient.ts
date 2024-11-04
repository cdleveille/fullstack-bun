import { BunBundle, type BunBundleBuildConfig } from "bun-bundle";

import { Env, Path } from "@constants";
import { Config } from "@helpers";

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");

const IS_PROD = Config.IS_PROD || BUN_ENV === Env.Production;

const buildConfig: BunBundleBuildConfig = {
	root: Path.ClientSrc,
	outdir: Path.Public,
	entrypoints: ["index.html"],
	swEntrypoint: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "manifest.json"],
	define: { "Bun.env.IS_PROD": `"${IS_PROD}"`, "Bun.env.WS_PORT": `"${Config.WS_PORT}"` },
	sourcemap: IS_PROD ? "none" : "linked",
	naming: {
		entry: "[dir]/[name]~[hash].[ext]",
		asset: "[dir]/[name]~[hash].[ext]"
	},
	minify: IS_PROD,
	suppressLog: true
};

export const buildClient = async () => {
	const output = await BunBundle.build(buildConfig);
	console.log(`Build completed in ${IS_PROD ? Env.Production : Env.Development} mode in ${output.buildTime}ms`);
	return output;
};
