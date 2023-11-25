import { BuildConfig } from "bun";
import { minify } from "minify";
import { rimraf } from "rimraf";

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

try {
	const start = Date.now();

	const BUN_ENV = parseArg("BUN_ENV");
	const IS_PROD = BUN_ENV === "production" || Bun.env.BUN_ENV === "production";

	const ROOT_DIR = "src/client";
	const SRC_DIR = "src/client";
	const OUT_DIR = "public";

	await rimraf(OUT_DIR);

	const buildCommon = {
		root: ROOT_DIR,
		outdir: OUT_DIR,
		target: "browser",
		sourcemap: "none",
		minify: IS_PROD
	} as Partial<BuildConfig>;

	const buildMain = () =>
		Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/main.tsx`],
			naming: {
				entry: `${ROOT_DIR}/[dir]/[name]~[hash].[ext]`,
				asset: "[dir]/[name].[ext]"
			}
		});

	const buildSw = () =>
		Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/sw.ts`]
		});

	const copyFiles = () =>
		Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/copy.ts`],
			naming: {
				asset: "[dir]/[name].[ext]"
			},
			loader: {
				".json": "file"
			}
		});

	const [{ outputs: mainOutputs }, { outputs: copyOutputs }] = await Promise.all([
		buildMain(),
		copyFiles(),
		buildSw()
	]);

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
	const indexHtmlContentsReplacedFinal = IS_PROD
		? indexHtmlContentsReplaced.replace('<script type="text/javascript" src="/reload/reload.js"></script>', "")
		: indexHtmlContentsReplaced;

	await Promise.all([
		Bun.write(`${OUT_DIR}/index.html`, indexHtmlContentsReplacedFinal),
		Bun.write(`${OUT_DIR}/${jsFileName}`, Bun.file(jsFile.path)),
		rimraf([`${OUT_DIR}/src`, `${OUT_DIR}/copy.js`])
	]);

	if (IS_PROD) {
		const [minifiedHtml, minifiedCss] = await Promise.all([minify(`${OUT_DIR}/index.html`), minify(cssFile.path)]);
		await Promise.all([Bun.write(`${OUT_DIR}/index.html`, minifiedHtml), Bun.write(cssFile.path, minifiedCss)]);
	} else {
		// saving a server-side file restarts the server, which triggers a browser reload via the 'reload' package
		const index = await Bun.file("./src/server/index.ts").text();
		await Bun.write("./src/server/index.ts", index);
	}

	console.log(`Build complete in ${Date.now() - start}ms`);
} catch (error) {
	console.error(`Build error: ${error}`);
	throw error;
}
