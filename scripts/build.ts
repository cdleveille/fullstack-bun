import { BuildConfig } from "bun";
import fs from "fs";
import { minify } from "minify";
import { rimraf } from "rimraf";

const BUN_ENV = Bun.argv.find(arg => arg.startsWith("BUN_ENV"))?.split("=")[1];
const IS_PROD = BUN_ENV === "production" || Bun.env.BUN_ENV === "production";

try {
	const ROOT_DIR = "src/client";
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";

	await rimraf(OUT_DIR);
	fs.mkdirSync(OUT_DIR);

	const buildCommon = {
		root: ROOT_DIR,
		outdir: OUT_DIR,
		minify: IS_PROD,
		target: "browser",
		sourcemap: IS_PROD ? "none" : "inline"
	} as Partial<BuildConfig>;

	const buildMain = Bun.build({
		...buildCommon,
		entrypoints: [`${SRC_DIR}/main.tsx`],
		naming: {
			entry: `${ROOT_DIR}/[dir]/[name]~[hash].[ext]`,
			asset: "[dir]/[name].[ext]"
		}
	});

	const buildSw = Bun.build({
		...buildCommon,
		entrypoints: [`${SRC_DIR}/sw.ts`]
	});

	const [{ outputs }] = await Promise.all([buildMain, buildSw]);

	const jsFile = outputs.find(output => output.path.endsWith(".js"));
	const jsFilePathSplit = jsFile.path.split("/");
	const jsFileName = jsFilePathSplit[jsFilePathSplit.length - 1];

	const cssFile = outputs.find(output => output.path.endsWith(".css"));
	const cssFilePathSplit = cssFile.path.split("/");
	const cssFileName = cssFilePathSplit[cssFilePathSplit.length - 1];

	const indexHtmlContents = await Bun.file(`${OUT_DIR}/index.html`).text();
	const indexHtmlContentsReplaced = indexHtmlContents.replace("{js}", jsFileName).replace("{css}", cssFileName);

	const writeIndexHtml = Bun.write(`${OUT_DIR}/index.html`, indexHtmlContentsReplaced);
	const copyJsFileToRootDir = Bun.write(`${OUT_DIR}/${jsFileName}`, Bun.file(jsFile.path));

	await Promise.all([writeIndexHtml, copyJsFileToRootDir]);
	await rimraf(`${OUT_DIR}/src`);

	if (IS_PROD) {
		const [minifiedHtml, minifiedCss] = await Promise.all([minify(`${OUT_DIR}/index.html`), minify(cssFile.path)]);
		await Promise.all([Bun.write(`${OUT_DIR}/index.html`, minifiedHtml), Bun.write(cssFile.path, minifiedCss)]);
	}
} catch (error) {
	console.error(error);
	throw error;
}
