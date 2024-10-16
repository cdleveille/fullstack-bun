import { BunPack, BunPackConfig } from "bun-bundle";
import path from "path";

const bunPackConfig: BunPackConfig = {
	srcDir: "./src/client",
	outDir: "./public",
	mainEntry: "main.tsx",
	swEntry: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"]
};

const isProd = await BunPack.build(bunPackConfig);

const indexHtml = path.join(bunPackConfig.outDir, "index.html");
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
