import { BuildConfig } from "bun";
import copy from "bun-copy-plugin";
import { minify } from "minify";
import { rimrafSync } from "rimraf";

export const build = async () => {
	try {
		const start = Date.now();

		const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");
		const IS_PROD =
			BUN_ENV === "production" || Bun.env.BUN_ENV === "production" || Bun.env.NODE_ENV === "production";
		const SRC_DIR = "./src/client";
		const OUT_DIR = "./public";

		// clear output folder
		rimrafSync(OUT_DIR);

		const buildCommon = {
			root: SRC_DIR,
			outdir: OUT_DIR,
			target: "browser",
			sourcemap: IS_PROD ? "none" : "inline",
			minify: IS_PROD
		} as Partial<BuildConfig>;

		const buildMain = Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/main.tsx`],
			naming: {
				entry: `${SRC_DIR}/[dir]/[name]~[hash].[ext]`,
				asset: "[dir]/[name].[ext]"
			},
			define: {
				"Bun.env.IS_PROD": `"${IS_PROD}"`
			},
			plugins: [
				copy(`${SRC_DIR}/assets/`, `${OUT_DIR}/assets/`),
				copy(`${SRC_DIR}/browserconfig.xml`, `${OUT_DIR}/browserconfig.xml`),
				copy(`${SRC_DIR}/favicon.ico`, `${OUT_DIR}/favicon.ico`),
				copy(`${SRC_DIR}/index.html`, `${OUT_DIR}/index.html`),
				copy(`${SRC_DIR}/manifest.json`, `${OUT_DIR}/manifest.json`)
			]
		});

		const buildSw = Bun.build({
			...buildCommon,
			entrypoints: [`${SRC_DIR}/sw.ts`]
		});

		// await build results
		const results = await Promise.all([buildMain, buildSw]);

		// check for errors
		for (const result of results) {
			if (!result.success) throw result.logs;
		}

		// find filenames of .js file and .css file in output
		const { outputs: mainOutputs } = results[0];
		const jsFile = mainOutputs.find(output => output.path.endsWith(".js"));
		if (!jsFile) throw "No .js file found in build output";
		const jsFilePathSplit = jsFile.path.split("/");
		const jsFileName = jsFilePathSplit[jsFilePathSplit.length - 1];
		const cssFile = mainOutputs.find(output => output.path.endsWith(".css"));
		if (!cssFile) throw "No .css file found in build output";
		const cssFilePathSplit = cssFile.path.split("/");
		const cssFileName = cssFilePathSplit[cssFilePathSplit.length - 1];

		// inject .js and .css filenames into index.html
		const indexHtmlContents = await Bun.file(`${OUT_DIR}/index.html`).text();
		const indexHtmlContentsReplaced = indexHtmlContents.replace("{js}", jsFileName).replace("{css}", cssFileName);

		// remove script tag for 'reload' package in production
		const indexHtmlContentsReplacedFinal = IS_PROD
			? indexHtmlContentsReplaced.replace('<script type="text/javascript" src="/reload/reload.js"></script>', "")
			: indexHtmlContentsReplaced;

		await Promise.all([
			Bun.write(`${OUT_DIR}/index.html`, indexHtmlContentsReplacedFinal),
			Bun.write(`${OUT_DIR}/${jsFileName}`, Bun.file(jsFile.path))
		]);

		rimrafSync(`${OUT_DIR}/src`);

		if (IS_PROD) {
			// minify html and css files in production
			const [minifiedHtml, minifiedCss] = await Promise.all([
				minify(`${OUT_DIR}/index.html`),
				minify(cssFile.path)
			]);
			await Promise.all([Bun.write(`${OUT_DIR}/index.html`, minifiedHtml), Bun.write(cssFile.path, minifiedCss)]);
		} else {
			// saving a server-side file restarts the server, which triggers a browser reload via the 'reload' package
			const index = await Bun.file("./src/server/index.ts").text();
			await Bun.write("./src/server/index.ts", index);
		}

		console.log(`Build completed in ${IS_PROD ? "production" : "development"} mode (${Date.now() - start}ms)`);
	} catch (error) {
		console.error(error);
	}
};

const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];
