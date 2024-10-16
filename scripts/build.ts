import { BuildConfig } from "bun";
import copy from "bun-copy-plugin";
import { minify as Minify } from "minify";
import path from "path";
import { rimrafSync } from "rimraf";

type BunPackConfig = {
	srcDir: string;
	outDir: string;
	mainEntry: string;
	swEntry?: string;
	jsStringTemplate?: string;
	cssStringTemplate?: string;
	copyFolders?: string[];
	copyFiles?: string[];
	target?: BuildConfig["target"];
	sourcemap?: BuildConfig["sourcemap"];
	minify?: BuildConfig["minify"];
	naming?: BuildConfig["naming"];
	define?: BuildConfig["define"];
	plugins?: BuildConfig["plugins"];
	isProd?: boolean;
	suppressLog?: boolean;
};

const bunPack = async ({
	srcDir,
	outDir,
	mainEntry,
	swEntry,
	jsStringTemplate = "{js}",
	cssStringTemplate = "{css}",
	copyFolders = [],
	copyFiles = [],
	target = "browser",
	sourcemap,
	minify,
	naming,
	define,
	plugins = [],
	isProd,
	suppressLog
}: BunPackConfig) => {
	try {
		const start = Date.now();

		const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];

		const BUN_ENV = parseArg("BUN_ENV") ?? parseArg("NODE_ENV");
		const IS_PROD =
			isProd ??
			(BUN_ENV === "production" || Bun.env.BUN_ENV === "production" || Bun.env.NODE_ENV === "production");
		const SRC_DIR = srcDir;
		const OUT_DIR = outDir;

		// clear output folder
		rimrafSync(OUT_DIR);

		const buildCommon = {
			root: SRC_DIR,
			outdir: OUT_DIR,
			target,
			sourcemap: sourcemap ?? (IS_PROD ? "none" : "inline"),
			minify: minify ?? IS_PROD
		} as Partial<BuildConfig>;

		const buildMain = Bun.build({
			...buildCommon,
			entrypoints: [path.join(SRC_DIR, mainEntry)],
			naming: naming ?? {
				entry: `${SRC_DIR}/[dir]/[name]~[hash].[ext]`,
				asset: "[dir]/[name].[ext]"
			},
			define: define ?? {
				"Bun.env.IS_PROD": `"${IS_PROD}"`
			},
			plugins: [
				...copyFolders.map(folder => copy(`${path.join(SRC_DIR, folder)}/`, `${path.join(OUT_DIR, folder)}/`)),
				...copyFiles.map(file => copy(path.join(SRC_DIR, file), path.join(OUT_DIR, file))),
				...plugins
			]
		});

		const buildSw = swEntry
			? Bun.build({
					...buildCommon,
					entrypoints: [path.join(SRC_DIR, swEntry)]
				})
			: null;

		// await build results
		const results = await Promise.all([buildMain, ...(buildSw ? [buildSw] : [])]);

		// check for errors
		for (const result of results) {
			if (!result.success) throw result.logs;
		}

		// find filenames of .js file and .css file in output
		const { outputs } = results[0];
		const jsFile = outputs.find(output => output.path.endsWith(".js"));
		if (!jsFile) throw "No .js file found in build output";
		const jsFileName = path.parse(jsFile.path).base;
		const cssFile = outputs.find(output => output.path.endsWith(".css"));
		if (!cssFile) throw "No .css file found in build output";
		const cssFileName = path.parse(cssFile.path).base;
		const indexHtmlPath = path.join(OUT_DIR, "index.html");

		// inject .js and .css filenames into index.html
		const indexHtmlContents = (await Bun.file(indexHtmlPath).text())
			.replace(jsStringTemplate, jsFileName)
			.replace(cssStringTemplate, cssFileName);

		await Promise.all([
			Bun.write(indexHtmlPath, indexHtmlContents),
			Bun.write(path.join(OUT_DIR, jsFileName), Bun.file(jsFile.path))
		]);

		rimrafSync(path.join(OUT_DIR, "src"));

		if (IS_PROD) {
			// minify html and css files in production
			const [minifiedHtml, minifiedCss] = await Promise.all([Minify(indexHtmlPath), Minify(cssFile.path)]);
			await Promise.all([Bun.write(indexHtmlPath, minifiedHtml), Bun.write(cssFile.path, minifiedCss)]);
		}

		if (!suppressLog)
			console.log(`Build completed in ${IS_PROD ? "production" : "development"} mode (${Date.now() - start}ms)`);
		return IS_PROD;
	} catch (error) {
		throw new AggregateError(error instanceof Array ? error : [error]);
	}
};

const bunPackConfig = {
	srcDir: "./src/client",
	outDir: "./public",
	mainEntry: "main.tsx",
	swEntry: "sw.ts",
	copyFolders: ["assets"],
	copyFiles: ["browserconfig.xml", "favicon.ico", "index.html", "manifest.json"]
} as BunPackConfig;

const isProd = await bunPack(bunPackConfig);

const indexHtml = path.join(bunPackConfig.outDir, "index.html");
const serverFile = path.resolve("./src/server/index.ts");

if (isProd) {
	let indexHtmlContents = await Bun.file(indexHtml).text();
	indexHtmlContents = indexHtmlContents.replace(
		'<script type="text/javascript" src="/reload/reload.js"></script>',
		""
	);
	await Bun.write(path.join(indexHtml), indexHtmlContents);
} else {
	const serverFileContents = await Bun.file(path.resolve(serverFile)).text();
	await Bun.write(serverFile, serverFileContents);
}
