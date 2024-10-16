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

if (isProd) {
	let indexHtmlContents = await Bun.file(indexHtml).text();
	indexHtmlContents = indexHtmlContents.replace("<script src=/reload/reload.js></script>", "");
	await Bun.write(indexHtml, indexHtmlContents);
} else {
	const serverFileContents = await Bun.file(path.resolve(serverFile)).text();
	await Bun.write(serverFile, serverFileContents);
}
