import { BunBundle, BunBundleBuildConfig } from "bun-bundle";

import { Config } from "@helpers";

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");

const IS_PROD = Config.IS_PROD || BUN_ENV === "production";

const buildConfig: BunBundleBuildConfig = {
	srcDir: "./src/client",
	outDir: "./public",
	mainEntry: "main.tsx",
	swEntry: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"],
	define: { "Bun.env.IS_PROD": `"${IS_PROD}"` },
	sourcemap: IS_PROD ? "none" : "linked"
};

export const buildClient = () => BunBundle.build(buildConfig);
