import { BunBundle, BunBundleBuildConfig } from "bun-bundle";

import { Config } from "@helpers";

const buildConfig: BunBundleBuildConfig = {
	srcDir: "./src/client",
	outDir: "./public",
	mainEntry: "main.tsx",
	swEntry: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"],
	define: { "Bun.env.IS_PROD": `"${Config.IS_PROD}"` }
};

export const buildClient = () => BunBundle.build(buildConfig);
