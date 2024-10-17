import { BunBundle, BunBundleBuildConfig } from "bun-bundle";
import path from "path";

const buildConfig: BunBundleBuildConfig = {
	srcDir: "./src/client",
	outDir: "./public",
	mainEntry: "main.tsx",
	swEntry: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"]
};

const { isProd } = await BunBundle.build(buildConfig);

const indexHtml = path.join(buildConfig.outDir, "index.html");
const serverFile = path.resolve("./src/server/index.ts");
const reloadScriptTag = "<script src=/reload/reload.js></script>";

if (isProd) {
	// in production, remove unnecessary reload script tag from html
	const indexHtmlContents = (await Bun.file(indexHtml).text()).replace(reloadScriptTag, "");
	await Bun.write(indexHtml, indexHtmlContents);
} else {
	// in development, save server file to trigger browser refresh via reload package
	const serverFileContents = await Bun.file(path.resolve(serverFile)).text();
	await Bun.write(serverFile, serverFileContents);
}
