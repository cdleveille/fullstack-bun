import { BunBundle, type BunBundleBuildConfig } from "bun-bundle";

import { Config } from "@helpers";

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");

const IS_PROD = Config.IS_PROD || BUN_ENV === "production";

const buildConfig: BunBundleBuildConfig = {
	root: "./src/client",
	outdir: "./public",
	entrypoints: ["main.tsx"],
	swEntrypoint: "sw.ts",
	jsStringTemplate: "<!-- {js} -->",
	cssStringTemplate: "<!-- {css} -->",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"],
	define: { "Bun.env.IS_PROD": `"${IS_PROD}"` },
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
	console.log(`Build completed in ${IS_PROD ? "production" : "development"} mode in ${output.buildTime}ms`);
	return output;
};
