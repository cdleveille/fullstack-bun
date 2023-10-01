import { BuildConfig } from "bun";
import { minify } from "minify";
import { rimraf } from "rimraf";

try {
	const start = Date.now();

	const BUN_ENV = Bun.argv.find(arg => arg.startsWith("BUN_ENV"))?.split("=")[1];
	const IS_PROD = BUN_ENV === "production" || Bun.env.BUN_ENV === "production";

	const ROOT_DIR = "src/client";
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";

	await rimraf(OUT_DIR);

	const buildCommon = {
		root: ROOT_DIR,
		outdir: OUT_DIR,
		target: "browser",
		sourcemap: IS_PROD ? "none" : "inline",
		minify: IS_PROD
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

	const copyFiles = Bun.build({
		...buildCommon,
		entrypoints: [`${SRC_DIR}/copy.ts`],
		naming: {
			asset: "[dir]/[name].[ext]"
		},
		loader: {
			".json": "file"
		}
	});

	const [{ outputs: mainOutputs }, { outputs: copyOutputs }] = await Promise.all([buildMain, copyFiles, buildSw]);

	const jsFile = mainOutputs.find(output => output.path.endsWith(".js"));
	if (!jsFile) throw "No .js file found in build output";
	const jsFilePathSplit = jsFile.path.split("/");
	const jsFileName = jsFilePathSplit[jsFilePathSplit.length - 1];

	const cssFile = copyOutputs.find(output => output.path.endsWith(".css"));
	if (!cssFile) throw "No .css file found in build output";
	const cssFilePathSplit = cssFile.path.split("/");
	const cssFileName = cssFilePathSplit[cssFilePathSplit.length - 1];

	const indexHtmlContents = await Bun.file(`${OUT_DIR}/index.html`).text();
	const indexHtmlContentsReplaced = indexHtmlContents.replace("{js}", jsFileName).replace("{css}", cssFileName);

	await Promise.all([
		Bun.write(`${OUT_DIR}/index.html`, indexHtmlContentsReplaced),
		Bun.write(`${OUT_DIR}/${jsFileName}`, Bun.file(jsFile.path)),
		rimraf([`${OUT_DIR}/src`, `${OUT_DIR}/copy.js`])
	]);

	if (IS_PROD) {
		const [minifiedHtml, minifiedCss] = await Promise.all([minify(`${OUT_DIR}/index.html`), minify(cssFile.path)]);
		await Promise.all([Bun.write(`${OUT_DIR}/index.html`, minifiedHtml), Bun.write(cssFile.path, minifiedCss)]);
	}

	console.log(`Build complete in ${Date.now() - start}ms`);
} catch (error) {
	console.error(`Build error: ${error}`);
	throw error;
}
